from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlalchemy.engine import create_engine
from marshmallow import Schema, fields, ValidationError
import os
import time
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder='../wedding/build', template_folder='../wedding/build')
CORS(app)

# Configurations for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

# Configurations for SQLAlchemy
database_url = os.getenv('DATABASE_URL')
if not database_url:
    raise ValueError("DATABASE_URL environment variable is not set.")
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_POOL_SIZE'] = 10
app.config['SQLALCHEMY_MAX_OVERFLOW'] = 20
app.config['SQLALCHEMY_POOL_TIMEOUT'] = 30

mail = Mail(app)
db = SQLAlchemy(app)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FormData(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    guests = db.Column(db.Integer, nullable=False)  # Ensure this is Integer

    def __repr__(self):
        return f'<FormData {self.name}>'

class FormDataSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    phone = fields.Str(required=True)
    guests = fields.Int(missing=0)

def create_database_if_not_exists():
    """Create the database if it does not exist."""
    engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
    db_name = engine.url.database

    # Create a separate engine for connecting to the postgres server (not a specific database)
    server_engine = create_engine(f"postgresql://{engine.url.username}:{engine.url.password}@{engine.url.host}:{engine.url.port}/postgres")

    # Check if the database exists
    try:
        with server_engine.connect() as conn:
            result = conn.execute(text("SELECT 1 FROM pg_database WHERE datname = :db_name"), {"db_name": db_name}).fetchone()
            if not result:
                logger.info("Database does not exist. Creating database...")
                conn.execute(text(f"CREATE DATABASE {db_name}"))
    except Exception as e:
        logger.error(f"Failed to create database: {e}")
        raise

def execute_with_retry(func, retries=5, delay=1):
    for attempt in range(retries):
        try:
            return func()
        except OperationalError as e:
            if 'database is locked' in str(e):
                logger.warning(f"Database is locked. Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                logger.error(f"OperationalError: {e}")
                raise
    raise Exception("Failed after several retries.")

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    logger.info(f"Received data: {data}")

    schema = FormDataSchema()

    # Validación de datos usando marshmallow
    try:
        validated_data = schema.load(data)
    except ValidationError as err:
        logger.error(f"Validation error: {err.messages}")
        return jsonify({'error': 'Invalid data format', 'details': err.messages}), 400

    logger.info(f"Validated data: {validated_data}")

    # Extraer valores del diccionario validado
    name = validated_data['name']
    email = validated_data['email']
    phone = validated_data['phone']
    guests = validated_data['guests']

    logger.info(f"Field 'name' value: {name}")
    logger.info(f"Field 'email' value: {email}")
    logger.info(f"Field 'phone' value: {phone}")
    logger.info(f"Field 'guests' value: {guests}")

    def save_to_db():
        logger.info("Saving data to the database...")
        new_data = FormData(
            name=name,
            email=email,
            phone=phone,
            guests=guests
        )
        db.session.add(new_data)
        db.session.commit()
        logger.info(f"Data saved: {new_data}, with ID: {new_data.id}")
        return new_data

    try:
        create_database_if_not_exists()  # Aseguramos que la base de datos existe
        new_entry = execute_with_retry(save_to_db)
    except ValueError as e:
        logger.error(f"ValueError in save_to_db: {e}")
        return jsonify({'error': 'Invalid data format. Please check your input.'}), 400
    except IntegrityError as e:
        db.session.rollback()
        logger.error(f"IntegrityError in save_to_db: {e}")
        return jsonify({'error': 'Data integrity error. This could be due to duplicate entries.'}), 409
    except OperationalError as e:
        db.session.rollback()
        logger.error(f"Database OperationalError: {e}")
        return jsonify({'error': 'Database operation failed. Please try again later.'}), 503
    except Exception as e:
        db.session.rollback()
        logger.error(f"Unexpected error in save_to_db: {e}")
        return jsonify({'error': 'An unexpected error occurred. Please contact support.'}), 500

    if new_entry is None:
        return jsonify({'error': 'Failed to save data'}), 500

    # Si llegamos aquí, los datos se guardaron exitosamente. Ahora enviamos el email.
    try:
        msg = Message('Wedding Registration',
            sender=app.config['MAIL_USERNAME'],
            recipients=[app.config['MAIL_USERNAME']])
        msg.body = f"Name: {name}\nEmail: {email}\nPhone: {phone}\nGuests: {guests}"
        mail.send(msg)
        logger.info(f"Email sent for: {name}")
    except Exception as e:
        logger.error(f"Error sending email: {e}")
        # Nota que no retornamos un error al cliente aquí, ya que los datos se guardaron correctamente
        # Podrías considerar agregar esto a una cola de tareas para reintento posterior

    return jsonify({'message': 'Form submitted successfully', 'id': new_entry.id}), 200

@app.route('/forms', methods=['GET'])
def get_all_forms():
    try:
        forms = FormData.query.all()
        if forms:
            result = [{
                'id': form.id,
                'name': form.name,
                'email': form.email,
                'phone': form.phone,
                'guests': form.guests,  
            } for form in forms]
            return jsonify(result)
        else:
            return jsonify({'message': 'No data found'}), 404
    except OperationalError as e:
        logger.error(f"OperationalError while retrieving forms: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/form/<int:id>', methods=['GET'])
def get_form_by_id(id):
    try:
        form = FormData.query.get(id)
        if form:
            return jsonify({
                'id': form.id,
                'name': form.name,
                'email': form.email,
                'phone': form.phone,
                'guests': form.guests
            })
        else:
            return jsonify({'message': 'Form data not found'}), 404
    except OperationalError as e:
        logger.error(f"OperationalError while retrieving form by ID: {e}")
        return jsonify({'error': str(e)}), 500

def create_all_with_retry(retries=5, delay=1):
    for attempt in range(retries):
        try:
            with app.app_context():
                db.create_all()
            logger.info("Tables created successfully.")
            return
        except OperationalError as e:
            if 'database is locked' in str(e):
                logger.warning(f"Database is locked. Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                logger.error(f"OperationalError during table creation: {e}")
                raise
    raise Exception("Failed to create database tables after several retries.")

# Ensure tables are created before starting the server
create_all_with_retry()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Run on the default Flask port (5000)

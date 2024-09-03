from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import time
import logging
from sqlalchemy.exc import OperationalError

app = Flask(__name__, static_folder='../wedding/build', template_folder='../wedding/build')
CORS(app)

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

# Configurations for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

# Configurations for SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
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
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    guests = db.Column(db.String(10))

    def __repr__(self):
        return f'<FormData {self.name}>'

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
    if not all([data.get('name'), data.get('email'), data.get('phone'), data.get('guests')]):
        return jsonify({'error': 'All fields are required'}), 400

    def save_to_db():
        new_data = FormData(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            guests=data['guests']
        )
        db.session.add(new_data)
        db.session.commit()
        logger.info(f"Data saved: {new_data}")

    try:
        execute_with_retry(save_to_db)
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error saving to database: {e}")
        return jsonify({'error': str(e)}), 500

    try:
        msg = Message('Wedding Registration',
                      sender=os.getenv('MAIL_USERNAME'),
                      recipients=[os.getenv('MAIL_USERNAME')])
        msg.body = f"Name: {data['name']}\nEmail: {data['email']}\nPhone: {data['phone']}\nGuests: {data['guests']}"
        mail.send(msg)
        return jsonify({'message': 'Form submitted successfully'}), 200
    except Exception as e:
        logger.error(f"Error sending email: {e}")
        return jsonify({'error': str(e)}), 500

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
                'guests': form.guests
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
            return
        except OperationalError as e:
            if 'database is locked' in str(e):
                logger.warning(f"Database is locked. Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                logger.error(f"OperationalError during table creation: {e}")
                raise
    raise Exception("Failed to create database tables after several retries.")

if __name__ == '__main__':
    # Remove this block if you're using `run_server.py` for running the application
    if not os.path.exists('formdata.db'):
        logger.info("Database does not exist. Creating tables...")
        create_all_with_retry()
    else:
        logger.info("Database already exists.")
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=8000)

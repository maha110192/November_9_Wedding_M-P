# app/__init__.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_cors import CORS
from dotenv import load_dotenv
import logging

load_dotenv()

db = SQLAlchemy()
mail = Mail()

def create_app():
    app = Flask(__name__)
    # Configurar CORS
    CORS(app, resources={r"/*": {"origins": ["https://november-9-wedding-m-p.onrender.com", "http://localhost:3000", "https://november-9-wedding-m-p-m9zg.onrender.com","https://weddingmyp1guest.calupohsolutions.com","https://weddingmyp2guests.calupohsolutions.com", "https://calupohsolutions.com"]}})  # Ajusta según las necesidades de seguridad


    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Mail configuration
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

    # Additional security settings
    app.config['SESSION_COOKIE_SECURE'] = True
    app.config['REMEMBER_COOKIE_SECURE'] = True
    app.config['SESSION_PROTECTION'] = 'strong'

     # Logging configuration
    logging.basicConfig(level=logging.DEBUG)
    app.logger.setLevel(logging.DEBUG)
    logger = logging.getLogger(__name__)

    db.init_app(app)
    mail.init_app(app)

    with app.app_context():
        from .models import RSVP
        from .routes import main
        app.register_blueprint(main)

        # Create database tables
        db.create_all()

    return app
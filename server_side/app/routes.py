# app/routes.py
from flask import Blueprint, request, jsonify, send_from_directory
from flask_mail import Message
from . import db, mail
from .models import RSVP
import os

main = Blueprint('main', __name__)

# Serve the React apps from specific routes
@main.route('/wedding_miguel_pao_1guest/<path:path>')
def serve_frontend_1guest(path):
    return send_from_directory('wedding_1_guest/build', path)

@main.route('/wedding_miguel_pao_2guests/<path:path>')
def serve_frontend_2guests(path):
    return send_from_directory('wedding/build', path)

@main.route('/wedding_miguel_pao_1guest')
@main.route('/wedding_miguel_pao_1guest/')
def index_1guest():
    return send_from_directory('wedding_1_guest/build', 'index.html')

@main.route('/wedding_miguel_pao_2guests')
@main.route('/wedding_miguel_pao_2guests/')
def index_2guests():
    return send_from_directory('wedding/build', 'index.html')


@main.route('/rsvp', methods=['POST'])
def rsvp():
    data = request.json
    new_rsvp = RSVP(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        guests=data['guests']
    )
    db.session.add(new_rsvp)
    db.session.commit()

    # Send email confirmation
    msg = Message("RSVP Confirmation",
                sender= os.getenv('MAIL_USERNAME'),  # Ensure sender is set
                recipients=[os.getenv('MAIL_USERNAME'), data['email']])  # Correct recipients
    msg.body = f"Thank you for your RSVP, {data['name']}! We have confirmed {data['guests']} guest(s)."
    mail.send(msg)

    return jsonify({"message": "RSVP received and confirmation email sent!"}), 201

@main.route('/reservedById/<int:id>', methods=['GET'])
def get_rsvp(id):
    rsvp = RSVP.query.get_or_404(id)
    return jsonify({
        'id': rsvp.id,
        'name': rsvp.name,
        'email': rsvp.email,
        'phone': rsvp.phone,
        'guests': rsvp.guests
    })

@main.route('/reservedAll', methods=['GET'])
def get_all_rsvps():
    rsvps = RSVP.query.all()
    return jsonify([{
        'id': rsvp.id,
        'name': rsvp.name,
        'email': rsvp.email,
        'phone': rsvp.phone,
        'guests': rsvp.guests
    } for rsvp in rsvps])

@main.route('/deleteById/<int:id>', methods=['DELETE'])
def delete_rsvp(id):
    rsvp = RSVP.query.get_or_404(id)
    db.session.delete(rsvp)
    db.session.commit()
    return jsonify({'message': 'RSVP deleted!'})


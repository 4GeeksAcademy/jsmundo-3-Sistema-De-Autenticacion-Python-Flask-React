"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "alexander"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def handle_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    #validad de email y password
    if not email or not password:
        return jsonify({"message": "El email y el password son requeridos"}), 400
    
    user = User.query.filter_by(email=email, password=password).first()

     # validad si el usuario existe en la base de datos
    if not user:
        return jsonify({"message": "El usuario no existe "}),404
    
    token = create_access_token(identity=user.email)

    return jsonify({"token": token})


@api.route('/protected', methods=['POST'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    

    return jsonify({'ok': current_user}), 200


@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    data = []
    for user in users:
        data.append(user.serialize())
    return jsonify(data)


@api.route('/registro', methods=['POST'])
def registro_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    #valido los datos presentes
    if not email or not password:
        return jsonify({"message": "El email y el password son requeridos"}), 400
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "El usuario ya existe"}), 409
    
    new_user = User(email=email, password=password)
    db.session.add(new_user)

    try:
        db.session.commit()
        return jsonify({"message": "Usuario creado exitosamente"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error al crear el usuario: {str(e)}"}), 500



    

           


    

    


from flask import current_app as app, jsonify, request, render_template
from flask_security import login_user, hash_password, verify_password, auth_required, logout_user, roles_required, current_user

datastore = app.security.datastore

@app.route('/', methods = ['GET'])
def home():
    return render_template('index.html')
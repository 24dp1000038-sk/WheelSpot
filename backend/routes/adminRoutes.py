from flask import current_app as app, jsonify, request, render_template
from flask_security import login_user, hash_password, verify_password, auth_required, logout_user, roles_required, current_user
from  ..extensions import db
from ..models import User, Role, ParkingLot, ParkingSpot, Bookings
from datetime import datetime

@app.route('/admin', methods=['GET'])
@auth_required('token')
@roles_required('admin')    
def admin_home():
    try:
        return jsonify("Admin login", current_user.email, current_user.password), 200
    except Exception as e:
        return jsonify({"message": "Problem in fetching users", "error": str(e)}), 500
    

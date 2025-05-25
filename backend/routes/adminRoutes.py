from flask import current_app as app, jsonify, request, render_template
from flask_security import login_user, hash_password, verify_password, auth_required, logout_user, roles_required, current_user
from  ..extensions import db
from ..models import User, Role, ParkingLot, ParkingSpot, Bookings
from datetime import datetime

@app.route('/api/adminHome', methods=['GET'])
# @auth_required('token')
@roles_required('admin')    
def admin_home():
    try:
        return jsonify({"message": "Admin login and this message is showing form the backend"}), 200
    except Exception as e:
        return jsonify({"message": "Problem in fetching users", "error": str(e)}), 500
    

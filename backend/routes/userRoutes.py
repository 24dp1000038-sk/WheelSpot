from flask import current_app as app, jsonify, request, render_template
from flask_security import login_user, hash_password, verify_password, auth_required, logout_user, roles_required, current_user
from  ..extensions import db
from ..models import User, Role, ParkingLot, ParkingSpot, Bookings
from datetime import datetime

@app.route("/api/userHome", methods=['GET'])
@auth_required('token')
@roles_required('user')
def user_home():
    try:
        user = current_user
        return jsonify({
            "Email": user.email, 
            "Pin Code": user.pincode,
            "message": "User login successfully",
            }), 200
    except Exception as e:
        return jsonify({"message": "Problem in fetching user", "error": str(e)}), 500
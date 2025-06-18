from flask import current_app as app, jsonify, request
from flask_security import auth_required, roles_required, current_user
from ..extensions import db
from ..models import ParkingLot, ParkingSpot, Bookings
from datetime import datetime

@app.route("/api/user/home", methods=['GET'])
@auth_required('token')
@roles_required('user')
def user_home():
    try:
        user = current_user
        parkingLots = ParkingLot.query.all()
        lots = [{
            "id": lot.id,
            "address": lot.address,
            "location": lot.location,
            "pincode": lot.pincode,
            "price": lot.price,
            "total_spots": lot.total_spots,
            "available_spots": lot.total_spots - ParkingSpot.query.filter_by(lot_id=lot.id, status='O').count()
        } for lot in parkingLots]
        
        return jsonify({
            "lots" : lots,
            "email": user.email,
            "pincode": user.pincode,
            "message": "User login successful"
        }), 200
    except Exception as e:
        return jsonify({"message": "Problem fetching user info", "error": str(e)}), 500


@app.route("/api/user/parkingLots", methods=["GET"])
@auth_required('token')
@roles_required('user')
def get_parking_lots():
    try:
        lots = ParkingLot.query.all()
        return jsonify([{
            "id": lot.id,
            "name": lot.name,
            "location": lot.location,
            "pincode": lot.pincode
        } for lot in lots]), 200
    except Exception as e:
        return jsonify({"message": "Error fetching parking lots", "error": str(e)}), 500


@app.route("/api/user/parkingSpots/<int:lot_id>", methods=["GET"])
@auth_required('token')
@roles_required('user')
def get_parking_spots(lot_id):
    try:
        spots = ParkingSpot.query.filter_by(lot_id=lot_id, status='available').all()
        return jsonify([{
            "id": spot.id,
            "spot_number": spot.spot_number,
            "status": spot.status
        } for spot in spots]), 200
    except Exception as e:
        return jsonify({"message": "Error fetching parking spots", "error": str(e)}), 500


@app.route("/api/user/bookSpot", methods=["POST"])
@auth_required('token')
@roles_required('user')
def book_parking_spot():
    try:
        data = request.get_json()
        spot_id = data.get("spot_id")
        start_time = datetime.strptime(data.get("start_time"), "%Y-%m-%d %H:%M")
        end_time = datetime.strptime(data.get("end_time"), "%Y-%m-%d %H:%M")

        spot = ParkingSpot.query.get(spot_id)
        if not spot or spot.status != 'available':
            return jsonify({"message": "Spot not available"}), 400

        # Create booking
        booking = Bookings(
            user_id=current_user.id,
            spot_id=spot_id,
            start_time=start_time,
            end_time=end_time,
            status="booked"
        )

        spot.status = "booked"

        db.session.add(booking)
        db.session.commit()

        return jsonify({"message": "Spot booked successfully"}), 201
    except Exception as e:
        return jsonify({"message": "Error booking spot", "error": str(e)}), 500


@app.route("/api/user/bookings", methods=["GET"])
@auth_required('token')
@roles_required('user')
def get_user_bookings():
    try:
        bookings = Bookings.query.filter_by(user_id=current_user.id).all()
        return jsonify([{
            "id": b.id,
            "spot_id": b.spot_id,
            "start_time": b.start_time.strftime("%Y-%m-%d %H:%M"),
            "end_time": b.end_time.strftime("%Y-%m-%d %H:%M"),
            "status": b.status
        } for b in bookings]), 200
    except Exception as e:
        return jsonify({"message": "Error fetching bookings", "error": str(e)}), 500


@app.route("/api/cancelBooking/<int:booking_id>", methods=["DELETE"])
@auth_required('token')
@roles_required('user')
def cancel_booking(booking_id):
    try:
        booking = Bookings.query.get(booking_id)
        if not booking or booking.user_id != current_user.id:
            return jsonify({"message": "Unauthorized or booking not found"}), 404

        spot = ParkingSpot.query.get(booking.spot_id)
        if spot:
            spot.status = "available"

        db.session.delete(booking)
        db.session.commit()
        return jsonify({"message": "Booking canceled"}), 200
    except Exception as e:
        return jsonify({"message": "Error canceling booking", "error": str(e)}), 500
    
@app.route("/api/user/summary", methods=["GET"])
@auth_required('token')
@roles_required('user')
def user_summary():
    try:
        user = current_user
        bookings = Bookings.query.filter_by(user_id=user.id).all()
        total_bookings = len(bookings)
        total_spots_booked = sum(1 for b in bookings if b.status == "booked")

        return jsonify({
            "email": user.email,
            "name": user.name,
            "total_bookings": total_bookings,
            "total_spots_booked": total_spots_booked
        }), 200
    except Exception as e:
        return jsonify({"message": "Error fetching user summary", "error": str(e)}), 500


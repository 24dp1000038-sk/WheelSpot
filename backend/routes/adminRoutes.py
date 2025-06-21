from flask import current_app as app, request, jsonify
from flask_security import auth_required, roles_required
from ..extensions import db
from ..models import User, ParkingLot, ParkingSpot, Bookings

#  ---- view all parking lots ----
@app.route("/api/admin/lot/view", methods=["GET"])
@auth_required('token')
@roles_required('admin')
def view_parking_lots():
    lots = ParkingLot.query.all()
    return jsonify([{
        "id": lot.id,
        "location": lot.location,
        "pincode": lot.pincode,
        "address": lot.address,
        "price": lot.price,
        "total_spots": lot.total_spots,
    } for lot in lots]), 200

#  ---- creating a parking lot ---
@app.route("/api/admin/lot/create", methods=["POST"])
@auth_required('token')
@roles_required('admin')
def create_parking_lot():
    data = request.get_json()
    try:
        new_parking_lot = ParkingLot(
            location=data['location'],
            address=data['address'],
            pincode=data['pincode'],
            price=data['price'],
            total_spots=data['total_spots'],
        )
        db.session.add(new_parking_lot)
        db.session.commit()
        
        lot_id = new_parking_lot.id

        no_of_spots = data['total_spots']
        for i in range(no_of_spots):
            spot = ParkingSpot(lot_id=lot_id, status='A') 
            db.session.add(spot)

        db.session.commit()
        
        return jsonify({"message": "Parking lot created"}), 201
    except Exception as e:
        return jsonify({"message": "Error creating parking lot", "error": str(e)}), 500
    
# --- updating parking lot details ---
@app.route("/api/admin/lot/update/<int:lot_id>", methods=["POST"])
@auth_required('token')
@roles_required('admin')
def update_parking_lot(lot_id):
    data = request.get_json()
    try:
        parking_lot = ParkingLot.query.get(lot_id)
        if not parking_lot:
            return jsonify({"message": "Parking lot not found"}), 404

        spots_occupied = ParkingSpot.query.filter_by(lot_id=lot_id, status='O').count()

        new_total_spots = data.get("total_spots", parking_lot.total_spots)

        if new_total_spots < spots_occupied:
            return jsonify({
                "message": "Cannot reduce total spots below currently occupied spots",
                "occupied_spots": spots_occupied,
            }), 400

        parking_lot.location = data.get("location", parking_lot.location)
        parking_lot.address = data.get("address", parking_lot.address)
        parking_lot.pincode = data.get("pincode", parking_lot.pincode)
        parking_lot.price = data.get("price", parking_lot.price)

        if new_total_spots < parking_lot.total_spots:
            remove_spots = parking_lot.total_spots - new_total_spots
            spots_to_remove = ParkingSpot.query.filter_by(lot_id=lot_id, status='A').limit(remove_spots).all()
            for spot in spots_to_remove:
                db.session.delete(spot)
        
        if new_total_spots > parking_lot.total_spots:
            additional_spots = new_total_spots - parking_lot.total_spots
            for i in range(additional_spots):
                spot = ParkingSpot(lot_id=lot_id, status='A')
                db.session.add(spot)

        parking_lot.total_spots = new_total_spots

        db.session.commit()
        return jsonify({"message": "Parking lot updated successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating parking lot", "error": str(e)}), 500

# --- Deleting a parking lot ----
@app.route("/api/admin/lot/delete/<int:lot_id>", methods=["DELETE"])
@auth_required('token')
@roles_required('admin')
def delete_parking_lot(lot_id):
    try:
        parking_lot = ParkingLot.query.get(lot_id)
        if not parking_lot:
            return jsonify({"message": "Parking lot not found"}), 404
        
        spots_occupied = ParkingSpot.query.filter_by(lot_id=lot_id, status='O').count()
        
        if spots_occupied != 0:
            return jsonify({
                "message": "Cannot delete parking lot with occupied spots",
                "occupied_spots": spots_occupied
            }), 400
        
        else:
            ParkingSpot.query.filter_by(lot_id=lot_id).delete()
            # Bookings.query.filter_by(lot_id=lot_id).delete()
            db.session.delete(parking_lot)
            db.session.commit()
            return jsonify({"message": "Parking lot deleted"}), 200
    except Exception as e:
        return jsonify({"message": "Error deleting parking lot", "error": str(e)}), 500
    
# ---- view or delete spot is not occupied ----
@app.route("/api/admin/spot/<int:spot_id>", methods=["GET", "DELETE"])
@auth_required('token')
@roles_required('admin')
def view_or_delete_parking_spot(spot_id):
    try:
        spot = ParkingSpot.query.get(spot_id)
        if not spot:
            return jsonify({"message": "Parking spot not found"}), 404

        if request.method == "GET":
            return jsonify({
                "id": spot.id,
                "lot_id": spot.lot_id,
                "status": spot.status,
            }), 200

        elif request.method == "DELETE":
            if spot.status == 'O':
                return jsonify({"message": "Can't delete an occupied spot"}), 400
            
            parking_lot = ParkingLot.query.get(spot.lot_id)
            if not parking_lot:
                return jsonify({"message": "parking lot not found which consists this spot"}), 404

            db.session.delete(spot)
            parking_lot.total_spots -= 1
            db.session.commit()

            return jsonify({"message": f"Spot ID {spot_id} deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

#  ----- getting all users details -----
@app.route("/api/admin/users", methods=["GET"])
@auth_required('token')
@roles_required('admin')
def get_all_users():
    try:
        users = User.query.all()
        users_list = []

        for user in users:
            role_names = [role.name for role in user.roles]
            if 'admin' not in role_names:
                users_list.append({
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "address": user.address,
                    "pincode": user.pincode,
                })

        return jsonify(users_list), 200
    except Exception as e:
        return jsonify({"message": "Error fetching users", "error": str(e)}), 500


# ---- search using user id, parking lot id, location, pincode ---
@app.route("/api/admin/search", methods=["GET"])
@auth_required('token')
@roles_required('admin')
def admin_search():
    search_by = request.args.get("search_by")
    search_value = request.args.get("query")

    try:
        results = []

        if not search_by or not search_value:
            return jsonify({"message": "Search type and query required"}), 400

        if search_by == "user_id":
            bookings = Bookings.query.filter_by(user_id=int(search_value)).all()
            results = [{
                "booking_id": b.id,
                "user_id": b.user_id,
                "lot_id": b.lot_id,
                "spot_id": b.spot_id,
                "vehicle_number": b.vehicle_number,
                "start_time": b.start_time,
                "end_time": b.end_time
            } for b in bookings]

        elif search_by == "location":
            lots = ParkingLot.query.filter(ParkingLot.location.ilike(f"%{search_value}%")).all()
            results = []
            for lot in lots:
                spots = ParkingSpot.query.filter_by(lot_id=lot.id).all()
                occupied = sum(1 for s in spots if s.status == 'O')
                available = sum(1 for s in spots if s.status == 'A')
                results.append({
                    "lot_id": lot.id,
                    "location": lot.location,
                    "address": lot.address,
                    "occupied": occupied,
                    "available": available,
                    "spots": [{"id": s.id, "status": s.status} for s in spots]
                })

        elif search_by == "spot_id":
            spot = ParkingSpot.query.get(int(search_value))
            if spot:
                results = {
                    "spot_id": spot.id,
                    "lot_id": spot.lot_id,
                    "status": spot.status
                }
            else:
                return jsonify({"message": "Spot not found"}), 404

        else:
            return jsonify({"message": "Invalid search filter"}), 400

        return jsonify(results), 200

    except Exception as e:
        return jsonify({"message": "Error processing search", "error": str(e)}), 500

#  ---- admin summary ------
@app.route("/api/admin/summary", methods=["GET"])
@auth_required('token')
@roles_required('admin')
def admin_summary():
    try:
        total_users = User.query.count()
        total_parking_lots = ParkingLot.query.count()
        total_bookings = Bookings.query.count()

        summary = {
            "total_users": total_users,
            "total_parking_lots": total_parking_lots,
            "total_bookings": total_bookings
        }

        return jsonify(summary), 200
    except Exception as e:
        return jsonify({"message": "Error fetching summary", "error": str(e)}), 500



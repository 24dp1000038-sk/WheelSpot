from flask import current_app as app, request, jsonify
from flask_security import auth_required, roles_required, current_user
from ..extensions import db
from ..models import User, Role, ParkingLot, ParkingSpot, Bookings

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
        parking_lot.location = data.get("location", parking_lot.location)
        parking_lot.address = data.get("address", parking_lot.address)
        parking_lot.pincode = data.get("pincode", parking_lot.pincode)
        parking_lot.price = data.get("price", parking_lot.price)
        parking_lot.total_spots = data.get("total_spots", parking_lot.total_spots)
        db.session.commit()
        return jsonify({"message": "Parking lot updated"}), 200
    except Exception as e:
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
        db.session.delete(parking_lot)
        db.session.commit()
        return jsonify({"message": "Parking lot deleted"}), 200
    except Exception as e:
        return jsonify({"message": "Error deleting parking lot", "error": str(e)}), 500
    
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
def search_admin():
    search_type = request.args.get('type')
    query = request.args.get('query')

    results = []

    if search_type == 'user':
        users = User.query.filter(User.email.ilike(f"%{query}%")).all()
        results = [{
            "type": "user",
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "pincode": user.pincode
        } for user in users]

    elif search_type == 'location':
        lots = ParkingLot.query.filter(ParkingLot.address.ilike(f"%{query}%")).all()
        results = []
        for lot in lots:
            spots = ParkingSpot.query.filter_by(lot_id=lot.id).all()
            occupied = sum(1 for s in spots if s.is_occupied)
            results.append({
                "type": "lot",
                "lot_id": lot.id,
                "address": lot.address,
                "capacity": lot.capacity,
                "occupied": occupied,
                "spots": [{"id": s.id, "is_occupied": s.is_occupied} for s in spots]
            })

    elif search_type == 'spot':
        spots = ParkingSpot.query.filter(ParkingSpot.id.ilike(f"%{query}%")).all()
        results = [{
            "type": "spot",
            "id": spot.id,
            "lot_id": spot.lot_id,
            "is_occupied": spot.is_occupied
        } for spot in spots]

    return jsonify(results), 200

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
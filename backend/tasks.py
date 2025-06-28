from celery import shared_task
import datetime, csv, json
from flask_security import current_user, auth_required, roles_required
from celery import shared_task
from .utils import format_report
# from .mail import send_email
from .models import Bookings 

@shared_task(ignore_results = False, name='csv_report')
def csv_report(user_id):
    bookings = Bookings.query.filter_by(user_id = user_id).all()
    
    csv_file_name = f"booking_{datetime.datetime.now().strftime("%f")}.csv"
    with open(f'static/{csv_file_name}', 'w', newline = "") as csvfile:
        sr_no = 1
        booking_csv = csv.writer(csvfile, delimiter = ',')
        booking_csv.writerow(['Sr No.','Lot ID', 'Spot ID','Vehicle Number', 'Parking In Time', 'Parking out Time', 'Amount'])
        for b in bookings:
            this_booking = [sr_no, b.lot_id, b.spot_id, b.vehicle_number, b.start_time, b.end_time, b.bill_amount]
            booking_csv.writerow(this_booking)
            sr_no += 1

    return csv_file_name

@shared_task(ignore_results = False, name='monthly_report')
def monthly_report():
    return "Monthly report downloaded"

@shared_task(ignore_results = False, name='daily_report')
def daily_report():
    return "Daily report"


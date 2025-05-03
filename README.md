# WheelSpot

A full-featured multi-user web application for managing 4-wheeler parking lots with real-time spot reservation, admin control, scheduled jobs, and user reports.

## ✨ Features

- 👨‍💼 Admin can manage parking lots and view parking activity
- 🙋 Users can book, release, and view their parking history
- ⏰ Scheduled reminders and monthly reports via email
- 📊 ChartJS dashboard for data visualization
- ⚙️ Async background jobs using Celery + Redis
- 💾 Uses SQLite (auto-generated, no manual creation)

## 🧰 Tech Stack

- **Backend**: Flask, Flask-Login, Celery, Redis, SQLite
- **Frontend**: VueJS, Bootstrap, Axios, ChartJS
- **Authentication**: Session or JWT-based (choose one)
- **Scheduler**: Celery + Redis
- **PDF/HTML Reports**: WeasyPrint or custom HTML

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js & npm
- Redis server
- Virtualenv (recommended)

### Backend Setup
```bash
git clone https://github.com/yourusername/vehicle-parking-app.git
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python create_db.py  # auto-creates DB and admin
flask run

## 📄 License

Distributed under the MIT License. See `LICENSE` for more info.



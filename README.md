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
- Python
- Redis server
- Virtualenv (recommended)

### Backend Setup
```bash
git clone https://github.com/yourusername/vehicle-parking-app.git
cd backend
python3 -m venv foldername
source foldername/bin/activate
pip3 install -r requirements.txt
```

First of all create three tabs of terminal
then activate the virtual environment in all the terminal tabs
then start these servers in each different terminal.

**for stop showing port is in already use in redis use command** :sudo systemctl stop redis

1. **start redis server**: redis-sever
2. **start celery worker**: celery -A app.celery worker --loglevel INFO
3. **start you application**: python app.py
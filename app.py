from flask import Flask
from backend.extensions import db
from backend.models import User, Role
from backend.config import LocalDevelopmentConfig
from flask_security import Security, SQLAlchemyUserDatastore
from flask_cors import CORS
from backend.celery_init import celery_init_app

app = None

def start():
    app = Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    CORS(app)
    db.init_app(app)
    datastore = SQLAlchemyUserDatastore(db, User, Role)
    app.security = Security(app, datastore)
    app.app_context().push()
    
    return app
    
app = start()
celery = celery_init_app(app)

from backend.create_data import *
from backend.routes.authRoutes import *   
from backend.routes.adminRoutes import *   
from backend.routes.userRoutes import *   
from backend.routes.taskRoutes import *   


if __name__ == '__main__':
    app.run()
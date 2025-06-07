from app.database.db import db
from datetime import datetime


class Order(db.Model):
    __tablename__="orders"
    
    id= db.Column(db.Integer, primary_key = True)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    created_at = db.Column(db.DateTime, default = datetime.now())
    estimated_delivery_date = db.Column(db.DateTime, nullable=False)
    real_delivery_date = db.Column(db.DateTime, nullable=False)
    state = db.Column(db.String(20), default= "recibido")
    total = db.Column(db.Integer, nullable= False)
    pagado = db.Column(db.Boolean, default=False)
    #Relacciones inversas pendientes
    #En realidad esta esta mal hubo un error en user.py porque escribi users y al llamarlo como la llave foranea le puse user. Esta inconsistencia esta presente en la linea 10 de order(user_id)  y linea 15 de user.py 6
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

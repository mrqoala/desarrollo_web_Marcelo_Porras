from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.models import Base, Ave, Avistamiento , Voluntario, Comuna, Region, Registro
from werkzeug.security import generate_password_hash

DB_NAME ="tarea2"
DB_USERNAME ="cc5002"
DB_PASSWORD="programacionweb"
DB_HOST="localhost"
DB_PORT=3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine=create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal=sessionmaker(bind=engine)

def get_user_by_email(email):
    session = SessionLocal()
    user = session.query(Voluntario).filter_by(email=email).first()
    session.close()
    return user

def get_user_by_phone_number(telefono):
    session= SessionLocal()
    user = session.query(Voluntario).filter_by(telefono=telefono).first()
    session.close()
    return user

def registrar_voluntario(nombre, email, telefono, comuna_id, password):
    email = email.strip().lower()
    telefono = telefono.strip()

    if get_user_by_email(email) is not None:
        return False, "El correo ya está registrado"

    if get_user_by_phone_number(telefono) is not None:
        return False, "El número telefónico ya está registrado"


    with SessionLocal() as session:
        voluntario = Voluntario(
            nombre=nombre,
            email=email,
            telefono=telefono,
            comuna_id=comuna_id,
            fecha_registro=datetime.now(),
            password=generate_password_hash(password)
        )
        session.add(voluntario)
        session.commit()
        session.close()    
    
def login_voluntario(email,password):
    emailuser= get_user_by_email(email)
    if emailuser is None:
        return False, "Usuario o contraseña incorrectos."
    if emailuser.password != password:
        return False, "Usuario o contraseña incorrectos" 
    
    return True, None
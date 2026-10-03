from datetime import datetime
from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker
from database.models import Base, Ave, Avistamiento , Voluntario, Comuna, Region, Registro
from werkzeug.security import generate_password_hash,check_password_hash

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

    return True, None

def login_voluntario(email,password):
   voluntario=get_user_by_email(email.strip().lower())
   if voluntario is None or not check_password_hash(voluntario.password,password):
        return None, "Correo o contraseña incorrectos"
   return voluntario,None

def get_regiones_y_comunas():
    session= SessionLocal()
    regiones = session.query(Region).order_by(Region.id).all()
    comunas = session.query(Comuna).order_by(Comuna.nombre).all()
    session.close()
    return (
        [{"id": r.id, "nombre": r.nombre} for r in regiones],
        [{"id": c.id, "nombre": c.nombre, "region_id": c.region_id} for c in comunas],
        )

def get_aves():
    session = SessionLocal()
    aves = session.query(Ave).order_by(Ave.nombre).all()
    session.close()
    return [{"id": a.id, "nombre": a.nombre} for a in aves]

def registrar_avistamiento(voluntario_id, ave_id, fecha_hora, lugar, descripcion, archivos):
    with SessionLocal() as session:
        avistamiento= Avistamiento(voluntario_id=voluntario_id, ave_id=ave_id, fecha_hora=fecha_hora, lugar=lugar, descripcion=descripcion)
        session.add(avistamiento)
        session.flush()

        for ruta,nombre in archivos:
            registro= Registro(ruta_archivo=ruta, nombre_archivo=nombre, avistamiento_id=avistamiento.id)
            session.add(registro)
        session.commit()

def datos_avistamiento(session, avistamiento):
    ave= session.get(Ave, avistamiento.ave_id)
    voluntario= session.get(Voluntario, avistamiento.voluntario_id)
    registros= session.query(Registro).filter_by(avistamiento_id=avistamiento.id).all()

    archivos=[]
    for r in registros:
        es_video= r.ruta_archivo.endswith(".mp4") or r.ruta_archivo.endswith(".webm")
        archivos.append({"ruta": r.ruta_archivo, "nombre": r.nombre_archivo, "es_video": es_video})

    return {
        "id": avistamiento.id,
        "ave": ave.nombre,
        "voluntario": voluntario.nombre,
        "fecha_hora": avistamiento.fecha_hora,
        "lugar": avistamiento.lugar,
        "descripcion": avistamiento.descripcion,
        "archivos": archivos,
    }

def get_ultimos_avistamientos(cantidad):
    session= SessionLocal()
    avistamientos= session.query(Avistamiento).order_by(Avistamiento.id.desc()).limit(cantidad).all()
    lista=[]
    for a in avistamientos:
        lista.append(datos_avistamiento(session,a))
    session.close()
    return lista

def contar_avistamientos():
    session= SessionLocal()
    total= session.query(Avistamiento).count()
    session.close()
    return total

def get_avistamientos_pagina(pagina, por_pagina):
    session= SessionLocal()
    avistamientos= session.query(Avistamiento).order_by(Avistamiento.fecha_hora.desc()).offset((pagina-1)*por_pagina).limit(por_pagina).all()
    lista=[]
    for a in avistamientos:
        lista.append(datos_avistamiento(session,a))
    session.close()
    return lista

def get_avistamientos_por_voluntario():
    session= SessionLocal()
    filas= session.query(Voluntario.nombre, func.count(Avistamiento.id)).join(Avistamiento, Avistamiento.voluntario_id == Voluntario.id).group_by(Voluntario.id).all()
    session.close()
    return [{"nombre": nombre, "cantidad": cantidad} for nombre,cantidad in filas]

def get_avistamiento(avistamiento_id):
    session= SessionLocal()
    avistamiento= session.get(Avistamiento, avistamiento_id)
    if avistamiento is None:
        session.close()
        return None
    datos= datos_avistamiento(session,avistamiento)
    session.close()
    return datos

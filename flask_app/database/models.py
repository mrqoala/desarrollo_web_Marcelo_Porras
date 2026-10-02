from sqlalchemy import Column, Integer, BigInteger, String, ForeignKey,DateTime,Text
from sqlalchemy.orm import declarative_base, relationship



Base= declarative_base()


class Ave(Base):
    __tablename__ = 'ave'

    id= Column(Integer,primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable= False)

class Avistamiento(Base):
    __tablename__ = 'avistamiento'

    id = Column(Integer, primary_key=True,autoincrement=True)
    voluntario_id = Column(Integer, ForeignKey("voluntario.id"), nullable=False)
    ave_id = Column(Integer, ForeignKey("ave.id"), nullable=False)
    fecha_hora = Column(DateTime, nullable=False)
    lugar = Column(String(200), nullable=False)
    descripcion = Column(Text)

    voluntario = relationship("Voluntario")

class Registro(Base):
    __tablename__ = 'registro'

    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    avistamiento_id = Column(Integer, ForeignKey("avistamiento.id"), nullable=False)

    avistamiento = relationship("Avistamiento")
class Comuna(Base):
    __tablename__ = 'comuna'

    id= Column(Integer,primary_key=True,autoincrement=True)
    nombre=Column(String(200),nullable=False)
    region_id=Column(Integer,ForeignKey('region.id'),nullable=False)


class Region(Base):
    __tablename__ = 'region'

    id= Column(Integer,primary_key=True,autoincrement=True)
    nombre=Column(String(200),nullable=False)

class Voluntario(Base):
    __tablename__ = 'voluntario'

    id= Column(Integer,primary_key=True,autoincrement=True)
    nombre=Column(String(255),nullable=False)
    email=Column(String(80),nullable=False)
    telefono=Column(String(15),nullable=False)
    fecha_registro=Column(DateTime,nullable=False)
    comuna_id=Column(Integer,ForeignKey('comuna.id'),nullable=False)
    password= Column(String(255),nullable=False)
import re
from datetime import datetime

EXTENSIONES_PERMITIDAS = ["jpg", "jpeg", "png", "gif", "webp", "mp4", "webm"]


def validar_voluntario(nombre, email, telefono, password, comuna_id):
    errores = {}
    if len(nombre.strip()) < 3:
        errores["nombre"] = "Debe ingresar un nombre (mínimo 3 caracteres)."
    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email.strip()):
        errores["correo"] = "Correo con formato inválido."
    if not re.fullmatch(r"(\+?56)?\s?(0?9)\s?[98765432]\d{7}", telefono.strip()):
        errores["telefono"] = "Teléfono con formato inválido."
    if len(password) < 6:
        errores["contrasenna"] = "La contraseña debe tener al menos 6 caracteres."
    if not str(comuna_id).isdigit():
        errores["comuna"] = "Debe seleccionar una comuna."
    return errores


def validar_avistamiento(ave_id, fecha, hora, comuna_id, descripcion, archivos, aves_validas, comunas_validas):
    errores={}

    if not ave_id.isdigit() or int(ave_id) not in aves_validas:
        errores["ave"]="Debe seleccionar un ave de la lista."

    fecha_hora=None
    try:
        fecha_hora=datetime.strptime(fecha+" "+hora,"%Y-%m-%d %H:%M")
        if fecha_hora>datetime.now():
            errores["fecha"]="La fecha y hora no pueden ser futuras."
    except ValueError:
        errores["fecha"]="Debe ingresar una fecha y una hora válidas."

    if not comuna_id.isdigit() or int(comuna_id) not in comunas_validas:
        errores["comuna"]="Debe seleccionar una comuna válida."

    if len(descripcion)>500:
        errores["descripcion"]="La descripción puede tener como máximo 500 caracteres."

    if len(archivos)==0 or len(archivos)>5:
        errores["archivos"]="Debe adjuntar entre 1 y 5 archivos."
    else:
        for archivo in archivos:
            extension=archivo.filename.rsplit(".",1)[-1].lower()
            if extension not in EXTENSIONES_PERMITIDAS:
                errores["archivos"]="Solo se permiten imágenes (jpg, png, gif, webp) o videos (mp4, webm)."

    return errores,fecha_hora

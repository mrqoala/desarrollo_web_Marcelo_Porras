from flask import Blueprint, render_template, request, redirect, url_for, flash,session
from database import db
from utils.validation import validar_voluntario
bp=Blueprint('auth',__name__,url_prefix='/auth')

@bp.route("/register", methods=["GET","POST"])
def register():
    regiones,comunas= db.get_regiones_y_comunas()
    errores={}

    if request.method =="POST":
        nombre = request.form.get("nombre", "")
        email = request.form.get("correo", "")
        telefono = request.form.get("telefono", "")
        password = request.form.get("contrasenna", "")
        comuna_id = request.form.get("comuna", "")

        errores=validar_voluntario(nombre,email,telefono,password,comuna_id)

        if "comuna" not in errores and int(comuna_id) not in {c["id"] for c in comunas}:
            errores["comuna"] = "La comuna seleccionada no existe."

        if not errores:
            valido,mensaje=db.registrar_voluntario(nombre.strip(),email,telefono,int(comuna_id),password)
            if valido:
                flash("Registro exitoso. Gracias por ser Voluntario!")
                return redirect(url_for("index"))
            errores["registro"] = mensaje

    return render_template("auth/register.html",regiones=regiones,comunas=comunas,errores=errores,valores=request.form)

@bp.route("/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        voluntario, error = db.login_voluntario(
            request.form.get("correo", ""), request.form.get("password", ""))
        if voluntario:
            session.clear()
            session["voluntario_id"] = voluntario.id
            session["voluntario_nombre"] = voluntario.nombre
            flash(f"Bienvenido, {voluntario.nombre}")
            return redirect(url_for("index"))
    return render_template("auth/login.html", error=error)

@bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

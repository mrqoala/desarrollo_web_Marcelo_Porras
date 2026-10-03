import uuid

from flask import Flask, request, render_template, redirect, url_for, session, flash, abort
from werkzeug.utils import secure_filename

from database import db
from utils.validation import validar_avistamiento

AVISTAMIENTOS_POR_PAGINA = 5
UPLOAD_FOLDER = "static/uploads"

app= Flask(__name__)
app.secret_key = "s3cr3t_k3y"
app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024

import auth
app.register_blueprint(auth.bp)


@app.route("/")
def index():
    ultimos= db.get_ultimos_avistamientos(2)
    return render_template("index.html",ultimos=ultimos)


@app.route("/agregar_avistamiento", methods=["GET","POST"])
def agregar_avistamiento():
    if "voluntario_id" not in session:
        flash("Debes iniciar sesión para agregar un avistamiento.")
        return redirect(url_for("auth.login"))

    regiones,comunas= db.get_regiones_y_comunas()
    aves= db.get_aves()
    errores={}

    if request.method =="POST":
        ave_id = request.form.get("ave", "")
        fecha = request.form.get("fecha", "")
        hora = request.form.get("hora", "")
        comuna_id = request.form.get("comuna", "")
        descripcion = request.form.get("descripcion", "").strip()
        archivos = []
        for archivo in request.files.getlist("archivos"):
            if archivo.filename != "":
                archivos.append(archivo)

        errores,fecha_hora= validar_avistamiento(ave_id,fecha,hora,comuna_id,descripcion,archivos,
                                                 [a["id"] for a in aves],[c["id"] for c in comunas])

        if not errores:
            lugar=""
            for comuna in comunas:
                if comuna["id"]==int(comuna_id):
                    for region in regiones:
                        if region["id"]==comuna["region_id"]:
                            lugar=comuna["nombre"]+", "+region["nombre"]

            guardados=[]
            for archivo in archivos:
                extension= archivo.filename.rsplit(".",1)[-1].lower()
                nombre_unico= uuid.uuid4().hex+"."+extension
                archivo.save(UPLOAD_FOLDER+"/"+nombre_unico)
                guardados.append(("uploads/"+nombre_unico, secure_filename(archivo.filename)))

            db.registrar_avistamiento(session["voluntario_id"],int(ave_id),fecha_hora,lugar,descripcion,guardados)
            flash("Avistamiento registrado correctamente.")
            return redirect(url_for("index"))

    return render_template("agregar_avistamiento.html",aves=aves,regiones=regiones,comunas=comunas,errores=errores,valores=request.form)


@app.route("/listado_avistamiento")
def listado_avistamiento():
    total= db.contar_avistamientos()
    paginas= max(1,(total+AVISTAMIENTOS_POR_PAGINA-1)//AVISTAMIENTOS_POR_PAGINA)

    pagina= request.args.get("pagina",1,type=int)
    pagina= max(1,min(pagina,paginas))

    items= db.get_avistamientos_pagina(pagina,AVISTAMIENTOS_POR_PAGINA)
    return render_template("listado_avistamiento.html",items=items,pagina=pagina,paginas=paginas,total=total)


@app.route("/avistamiento/<int:avistamiento_id>")
def detalle_avistamiento(avistamiento_id):
    avistamiento= db.get_avistamiento(avistamiento_id)
    if avistamiento is None:
        abort(404)
    return render_template("detalle_avistamiento.html",av=avistamiento)


@app.route("/estadisticas")
def estadisticas():
    voluntarios= db.get_avistamientos_por_voluntario()
    return render_template("estadisticas.html",voluntarios=voluntarios)

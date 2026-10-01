from flask import Flask, request, render_template, redirect, url_for, session



UPLOAD_FOLDER = 'static/uploads'


app= Flask(__name__)
app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER']=UPLOAD_FOLDER


import auth
app.register_blueprint(auth.bp)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/agregar_avistamiento")
def agregar_avistamiento():
    return render_template ('agregar_avistamiento.html')


@app.route("/listado_avistamiento")
def listado_avistamiento():
    return render_template('listado_avistamiento.html')

@app.route("/estadisticas")
def estadisticas():
    return render_template('estadisticas.html')

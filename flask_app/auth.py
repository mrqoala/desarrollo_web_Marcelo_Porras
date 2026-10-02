from flask import Blueprint, render_template,Flask

bp=Blueprint('auth',__name__,url_prefix='/auth')

@bp.route("/register", methods=["GET","POST"])
def register():
    if request.method == "POST":
        nombre= request.form.get("nombre")
        return render_template('auth/register.html')
        
@bp.route('/login')
def login():
    return render_template('auth/login.html')
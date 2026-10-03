Tarea 2


# Funcionalidades 
El sitio web de la Unión Ornitológica de Chile tiene las siguientes funcionalidades:
-Registro de usuario con contraseña ( autentificación con werkzeug)
-Se pueden registrar avistamientos de aves, en su respectivo formulario (Se necesita iniciar sesión, o por defecto registrarse si es que no tienes cuenta)
-Ver los últimos avistamientos en el inicio, y ver la lista de todos los avistamientos, con la posibilidad de ver en mayor detalle cada uno de las "tarjetas" de avistamiento.

# Archivos
Modifiqué el tarea2.sql agregandole el varchar de contraseña para poder realizar el sistema de login.





## Estructura 
Desarrollo_web_Marcelo_Porras/
├── .gitignore
├── .vscode/
│   └── settings.json
├── README.md
├── enunciado.pdf
└── flask_app/
    ├── app.py                      rutas de Flask
    ├── auth.py                     registro, login y logout
    ├── requirements.txt
    ├── database/
    │   ├── db.py                   conexión y funciones de acceso a datos
    │   ├── models.py               clases del modelo
    │   ├── tarea2.sql              estructura de la base de datos
    │   ├── region-comuna.sql
    │   └── aves.sql
    ├── utils/
    │   └── validation.py           validaciones del servidor
    ├── templates/
    │   ├── base.html               barra y estructura de la portada
    │   ├── form.html               base de los formularios
    │   ├── index.html              portada
    │   ├── agregar_avistamiento.html
    │   ├── listado_avistamiento.html
    │   ├── detalle_avistamiento.html
    │   ├── estadisticas.html
    │   └── auth/
    │       ├── login.html
    │       └── register.html
    └── static/
        ├── css/
        │   ├── base.css
        │   ├── form.css
        │   ├── listado_avistamiento.css
        │   └── estadisticas.css
        ├── js/
        │   ├── registro.js
        │   ├── agregar_avistamiento.js
        │   ├── estadisticas.js
        │   └── regiones.json
        └── uploads/
            ├── .gitkeep
            └── (3 fotos de prueba)
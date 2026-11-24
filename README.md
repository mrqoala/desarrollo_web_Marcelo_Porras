# Tarea 4


## Funcionalidades 
Esta tarea esta hecha con Spring Boot (Java) y JPA, el proyecto esta en la carpeta cuatro. Tiene dos cosas:

-Buscador de avistamientos: hay un solo input de texto y mientras se escribe va buscando solo (con fetch), por nombre de ave, nombre de voluntario o comuna. Muestra voluntario, día, ave, comuna y nota. El texto que calza se destaca con un fondo amarillo. Si no hay resultados sale un mensaje.

-Notas: cada resultado muestra la nota promedio (o "-" si no ha sido evaluado) y un botón "evaluar". Al apretarlo aparece un select del 1 al 7, al elegir una nota se guarda en la tabla nota y el promedio se actualiza en la misma pantalla, sin recargar.

## Decisiones
La comuna no la guardo aparte, la saco del campo lugar del avistamiento (que se guarda como "Comuna, Región"), tomando lo que va antes de la coma.

La nota se valida en el servidor, solo acepta enteros entre 1 y 7. Si llega otra cosa responde error y no guarda nada.

El texto que escribe el usuario se escapa antes de ponerlo en el HTML, para que no se pueda meter código.

El promedio lo calculo con una consulta en la base de datos (avg), no en el JS.

## Archivos
Usé la tabla nota que venía en tabla-nota.sql, no la modifiqué. En application.properties puse ddl-auto=none para que Hibernate no toque las tablas.

El CSS lo hice parecido al de la tarea 3.

## Cómo correrlo
Hay que tener MySQL con la base tarea2 (usuario cc5002, password programacionweb) y Java 17 o más. Dentro de la carpeta cuatro:

./mvnw spring-boot:run

y se abre localhost:8080

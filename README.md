<!-- @format -->

# angular-super-heroes

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 15.0.3.

[Angular heros-app](https://github.com/eliesser/angular-super-heroes) es una aplicación en angular configuranda con [docker](https://www.docker.io) usando como api mockup la librería [JSON Server](https://www.npmjs.com/package/json-server).

## Prueba técnica frontend

Enunciado:
Desarrollar, utilizando Angular y Typescript, una aplicación SPA que permita hacer un mantenimiento de súper héroes. La información de súper héroes se guardará dentro del servicio (No hace falta un backend). La prueba se debe presentar en un repositorio de Git. No hace falta que esté publicado. Se puede pasar comprimido en un único archivo.

Se deberá crear un Servicio que guarde la información y que permita:  
• Consultar todos los súper héroes.  
• Consultar un único súper héroe por id.  
• Consultar todos los súper héroes que contienen, en su nombre, el valor de un parámetro enviado en la petición... Por ejemplo, si enviamos “man” devolverá “Spiderman”, “Superman”, “Manolito el fuerte”, etc...  
• Modificar/Eliminar un súper héroe.
• Test unitario de este servicio (opcional).

Se deberá crear un Componente que, a partir del servicio anterior:  
• Mostrará una lista paginada de héroes donde aparecerán botones de añadir, editar y borrar…. Encima de esta lista paginada, se mostrará un input para filtrar por el héroe seleccionado.  
• Al pulsar el botón de añadir se generará un formulario vacío con las validaciones que se estimen oportunas. Después de dar de alta el nuevo héroe se volverá a la lista paginada.  
• Al pulsar el botón de edición se generará un formulario con los datos del héroe seleccionado y se permitirá modificar su información. Una vez editado se deberá volver a la lista paginada.  
• Al pulsar el botón de borrar, se preguntará si se está seguro que se desea borrar el héroe y, al confirmarlo, lo borrará.
• Test unitario de este componente (opcional).

Puntos opcionales de mejora:  
• Utilizar Angular Material como apoyo visual.
• Presentar la aplicación “Dockerizada”.  
• Interceptor para mostrar un elemento “loading” mientras se realiza alguna operación como “borrado” o “edición”.  
• Directiva para que al crear o editar en la caja de texto del nombre del héroe, siempre se muestre en mayúscula.  
• Comunicación entre componentes orientada a eventos.  
• Uso de programación reactiva.  
• Código legible usando lambdas.

## Desplegar aplicación

## 1.- Clonar el repositorio

```bash
$ git clone https://github.com/luisgaliciadev/angular-heros-app.git
```

Posteriormente moverse al la carpeta con esta instrucción:

```bash
$ cd angular-heros-app
```

## 2.- Levantar contenedor docker

Una vez descargado el repo, para levantar el contenedor de angular, debe tener agregado nginx:alpine a docker

Para poder agregarlo puede usar este comando:

```bash
$ sudo docker pull nginx:alpine
```

En la raíz del repo ejecutar este comando para levantar el contenedor:

```bash
$ sudo docker-compose up -d --build
```

Al finalizar de configurar el contenedor podrá ver la app en el siguiente enlace:

```
http://localhost:8080/
```

## 3.- Levantar servidor mockup

Debe instalar la librería [JSON Server](https://www.npmjs.com/package/json-server) de forma global, para poder realizarlo puede lanzar el siguiente comando:

```bash
$ sudo npm install -g json-server
```

En la misma carpeta raíz debe lanzar este contacto levantar servidor mockup:

```bash
$ json-server --watch db.json --port=3000
```

Estará online el api, para poder verificarla debe ir al siguiente enlace:

```
http://localhost:3000/
```

## Servidor de desarrollo

1.- Moverse al la carpeta con esta instrucción:

```bash
$ cd app
```

2.- Ejecute `npm install` para instalar las dependencias

```bash
$ npm install
```

2.- Ejecute `ng serve` para iniciar el servidor de desarrollo. Navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente al modificar cualquiera de los archivos de origen.

```bash
$ ng serve
```

## Ejecución de pruebas unitarias

Ejecute `ng test` para iniciar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

```bash
$ ng test
```

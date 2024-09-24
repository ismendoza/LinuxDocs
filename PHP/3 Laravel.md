# Laravel

### Crear un proyecto

```
composer create-project laravel/laravel laravel-app
```

### Mostrar una descripción general de la configuración de la aplicación

```
php artisan about
```

### Mostrar configuración de un archivo específico
Los archivos pueden ser app, mail, database, session, cache, services

```
php artisan config:show database
```

### Encriptar archivo .env: 
<p alignt="justify">El resultado del comando devuelve la clave de 32 caracteres que sirve para desencriptar</p>

```
php artisan env:encrypt
```

### Encryptar archivo .env utilizando clave generada externamente de laravel
<p align="justify">Se puede utilizar una clave propia generada con herramienta de preferencia</p>

```
php artisan env:encrypt --key=1d5d4s5f...
```

### Desencriptar archivo .env

```
php artisan env:decrypt --key=747sge8f5f...
```

### Desencriptar y obligar a reescribir el archivo .env

```
php artisan env:decrypt --force --key=4d1g5s...
```
### Activar modo de mantenimiento
Cuando la aplicación esta en modo de mantenimiento, una vista personalizada sera desplegada para todas ls solicitudes que se hagan en la aplicación
```
php artisan down
```

### Desactivar modo de mantenimiento

```
php artisan up
```
### Implementar funciones de autenticación
Agrega funciones de autenticación como login, registro, verificación de correo, confirmación de contraseña, reset de contraseña. En la instalación solicitará elegir interfaz favorita (blade es la predeterminada)

```
composer require laravel/breeze --dev
php artisan breeze:install
 
php artisan migrate
npm install
npm run dev
```

### Ejecutar proyecto

```
php artisan serve
```

## Controladores

Los archivos de controlador se crean en App/Http/Controller

### Crear un controlador

```
php artisan make:controller UsuarioController
```

## Migraciones

### Generar una migración-
Incluir la palabra create para generar el metodo create, después del guión bajo el nombre de la tabla, la migración se va crear en el directorio databases/migrations

```
php artisan make:migration create_nombreTabla_table

php artisan make:migration create_nombreTabla
```

### Ejecutar todas las migraciones

```
php artisan migrate
```

### Ver estado de las migraciones

```
php artisan migrate:status
```

### Ver sentencias sql que se encuentran dentro de las migraciones sin ejecutar

```
php artisan migrate --pretend
```

### Revertir la última migración

```
php artisan migrate:rollback
```

### Revertir las últimas 5 migraciones

```
php artisan migrate:rollback --step=5
```

### Ver sentencias sql que se van ejecutar por revertir migraciones

```
php artisan migrate:rollback --pretend
```

### Revertir todas las migraciones

```
php artisan migrate:reset
```

### Revertir y ejecutar todas las migraciones

```
php artisan migrate:refresh
```

### Revertir y ejecutar todas las migraciones y ejecutar todos los seeds

```
php artisan migrate:refresh --seed
```

## Eloquent Object-Relational Mapper (ORM)
Eloquent es un mapeador relacional de objetos que sirve para interactuar con la base de datos. Con eloquent cada tabla de la base de datos le corresponde un modelo que es usado para interactuar con la tabla, los modelos de eloquent permiten insertar, actualizar y eliminar registros de una tabla de la base de datos.

### Crear un modelo
Los modelos se crean en App/Models

```
php artisan make:model Flight
```

### Crear un modelo y generar seed

```
php artisan make:model Flight --seed
```

### Crear un modelo y generar controlador

```
php artisan make:model Flight --controller
```

### Crear un modelo y generar migración y controlador

```
php artisan make:model Flight --migration --controller
php artisan make:model Flight -m -c
```

## Desplegar aplicación con nginx

Requerimientos del servidor donde se va desplegar la aplicación https://laravel.com/docs/11.x/deployment#server-requirements

Configuración requerida para Nginx https://laravel.com/docs/11.x/deployment#nginx

Configuración de permisos de directorio https://laravel.com/docs/11.x/deployment#directory-permissions

### Colocar el directorio del proyecto en la ruta indicada

```
sudo mv laravel-app /usr/share/nginx/html
```
### Utilizando git

Clonar el proyecto en la ruta /usr/share/nginx/html

```
git clone https://github.com/username/laravel-app

composer install
```
Resultado:
> /usr/share/nginx/html/laravel-app

### Generar clave de aplicación

Si no se ha encriptado el archivo .env entonces generar la clave

```
php artisan key:generate
```

### Crear archivo de configuración de nginx

Crear archivo de configuración en la ruta /etc/nginx/conf.d

> /etc/nginx/conf.d/laravelApp.conf

* Un ejemplo básico de configuracion en el directorio de este documento laravelApp.conf

#### Verificar archivo de configuración de nginx

```
sudo nginx -t
```

### Generar caches de laravel

Cuando se despliega una aplicación se recomiendao almacenar en cache los siguientes archivos config, event, route, view

#### Almacenar todos los archivos en cache con un solo comando

```
php artisan optimize
```
#### Almacenar configuración en cache

```
php artisan config:cache
```

#### Almacenar eventos en cache

```
php artisan event:cache
```


#### Almacenar rutas en cache

```
php artisan route:cache

```

#### Almacenar vistas en cache
Este comando precompila todas las vistas de Blade para que no se compilen en la solicitud, lo que mejora el rendimiento de cada solicitud que devuelve una vista.

```
php artisan view:cache
```

#### Configurar permisos de directorios
Usuario y grupo nginx se crea cuando se instala nginx.

```
sudo chwon -R nginx:nginx /usr/share/nginx/html/laravel-app/storage
sudo chmod -R 775 /usr/share/nginx/html/laravel-app/storage

sudo chwon -R nginx:nginx /usr/share/nginx/html/laravel-app/bootstrap/cache
sudo chmod -R 775 /usr/share/nginx/html/laravel-app/bootstrap/cache
```
> Tener en cuenta si selinux esta activado

#### Reiniciar servidor de nginx

```
sudo systemctl restart nginx
```

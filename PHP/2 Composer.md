# Composer

<p align="justify">Composer es la herramienta para la gestión de dependencias en PHP.</p>

### Iniciar un proyecto

```
composer init
```

### Instalar una dependencia

```
composer require phpunit/php-timer
```

### Instalar una dependencia con versión específica

```
composer require guzzlehttp/guzzle:2.03
```

### Instalar dependencias definidas con install
<p align="justify">Si solo existe el archivo composer.json creara el archivo composer.lock e instalara las dependencias.

Si Solo existe el archivo composer.lock creara el archivo composer.json e instalara las dependencias.

Cuando existen los dos archivos composer.json y composer.lock, deben de tener definidas las mismas dependencias para utilizar el comando install, de lo contrario utilizar update.
</p>

```
composer install
```

### Actualizar todas las dependencias en composer.lock
<p align="justify">Update actualiza el archivo composer.lock, agrega las dependencias que se hayan definido en composer.json y las instala</p>


```
composer update
composer update vendor/package
```

### Eliminar un paquete del archivo composer.json

```
composer remove vendor/package
```

### Mostrar dependencias instaladas en un proyecto

```
composer show
composer show --self 
composer show --name-only
composer show --outdated
```

### Buscar un paquete en Packagist

```
composer search nombre_paquete
```

### Mostrar dependencias que tienen una versión más reciente disponible

```
composer outdated
```

### Crear proyectos

```
composer require zendframework/zend-mvc
```
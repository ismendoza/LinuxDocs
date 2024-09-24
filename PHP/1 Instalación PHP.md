# Instalación PHP

## Instalar php utilizando repsitorio base

```
sudo dnf install php
```

## Instalar el repositorio de remi
```
sudo dnf -y install https://rpms.remirepo.net/fedora/remi-release-40.rpm
```

### Mostrar lista de módulos de php disponibles

```
dnf module list php
```

### Habilitar la versión de módulo a instalar

```
sudo dnf module enable php:remi-8.3
```

### Instalación de una versión

```
sudo dnf module install php:remi-8.3
```

## Cambiar versión de módulo

### Dehabilitar la versión actual

```
sudo dnf module disable php:remi-7.4
```

### Habilitar otra versión

```
sudo dnf module enable php:remi-8.3
```

### Actualizar php

```
sudo dnf update php
```

### Verificar la versión de php

```
php -v
```

### Listar módulos instalados

```
php -m
```

### Probar php en la terminal

```
php -r 'echo "php esta instalado\n";'
```

### Instalar módulos de mysql

```
sudo dnf install php-mysqld
```
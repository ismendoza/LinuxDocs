# Instalación de Driver de SQL Server para PHP

Para instalar módulos de sql server para php microsoft recomienda utilizar pecl (PHP Extension Community Library), para utilizar pecl es necesario instalar php-pear que contiene pecl.

### 1. Instalar php-pear

```
sudo dnf install php-pear
```
### 2. Instalar módulos de Sql server

```
sudo pecl install sqlsrv-5.12.0
sudo pecl install pdo_sqlsrv-5.12.0
```

## Instalación manual sin instalar repositorios

1. Desargar los módulos para la versión que corresponde a php del repositorio de microsoft y colocarlos en /usr/lib64/php/modules
https://github.com/Microsoft/msphpsql/releases/v5.12.0
Utilizar los archivos que corresponde a php NTS o TS.
Por ejemplo: 
- PDO_SQLSRV_8.3_NTS.so 
- SQLSRV_8.3_NTS.so 

2. Crear archivos .ini para cada módulo en la ruta /etc/php.d y asignar la ruta del módulo en el contenido

- 20-pdo_sqlsrv.ini
    > extension=/usr/lib64/php/modules/PDO_SQLSRV_8.3_NTS.so
- 30-sqlsrv.ini
    > extension=/usr/lib64/php/modules/SQLSRV_8.3_NTS.so

3. Asignar los permisos que necesitan los módulos, verificar con ls -l

4. Reiniciar php-fpm (Manejador de procesos CGI)

```
sudo systemctl restart php-fpm 
```
5. Verificar 

```
php -m | grep sqlsrv
```

> Tambíen se puede verificar con phpinfo() en un archivo php o en la terminal php -r "phpinfo();" | grep sqlsrv











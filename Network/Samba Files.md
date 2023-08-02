# Configurar samba para compartir archivos

## Instalación de samba
```
$ sudo dnf install samba
```
## Configuración del servicio
```
$ sudo systemctl status smb
$ sudo systemctl start smb
$ sudo systemstl restart smb
$ sudo systemctl reload smb
$ sudo systemctl stop smb
```
## Agregar samba a firewalld
```
$ sudo firewall-cmd --zone=FedoraServer --add-service=samba --permanent
```
## Agregar usuario a samba
<p align="justify">El usuario debe ser un usuario del sistema operativo, y con este accederá al servidor desde un equipo cliente</p>

```
$ smbpasswd -a username
```
## Compartir un directorio del servidor
<p align="justify">La configuración del servidor se hace en el archivo /etc/samba/smb.conf agregando al final del archivo lo siguiente:</p>

```
[documentacion]
	comment = Documentos de linux
	path = /home/datos
	valid users = ismael
	guest ok = no
	browseable = yes
	writeable = yes
```
<p align="justify">Esta misma configuración se puede agregar en el archivo /etc/samba/usershares.conf, si este esta incluido en el archivo smb.conf en la sección [global] asi: include /etc/samba/usershares.conf</p>

#### Configurar SELinux para los sistemas que lo tienen activado
<p align="justify">Activar home_dirs para poder compartir carpetas dentro de home, utilizando el usuario root ejecutar el siguiente comando:</p>

```
$ setsebool -P samba_enable_home_dirs on
```
# Administración de usuarios

## Activar usuario
```
$ sudo smbpasswd -e ismael
```
## Desactivar usuario
```
$ sudo smbpasswd -d ismael
```
## Cambiar contraseña
```
$ sudo smbpasswd -a ismael
```
## Quitar contraseña
```
$ sudo smbpasswd -n ismael
```
## Eliminar usuarios
```
$ sudo smbpasswd -x ismael
```

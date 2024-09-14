# SSH

## Gestionar el servicio en el sistema

```
sudo systemctl status sshd.service
sudo systemctl start ssh.service
sudo systemctl stop ssh.service
```

## Conectarse a un servidor
<p align="justify">Conectarse a un servidor con el comando ssh indicando usuario y el nombre del host</p>

```
Hostname o Dirección IP
ssh usuario@hostname
```

### Crear par de claves SSH
<p align="justify">Para crear un acceso más seguro se recomienda autenticación basada en par de claves en vez de utilizar contraseñas de usuario.
El siguiente comando sirve para crear un par de claves, una pública y una privada, donde la pública se debe copiar hacia el servidor.</p>

- Después de ejecutar el comando, solicita ingresar ruta seguido de nombre de archivo de par de claves, por ejemplo: /home/user/.ssh/id_ecdsa_nombreServidor
- Como resultado creará dos archivos id_ecdsa_nombreServidor.pub y id_ecdsa_nombreServidor

```
ssh-keygen -t ecdsa -b 521
```


### Copiar clave pública al servidor
<p align="justify">Con el siguiente comando se copia la clave pública hacia el archivo authorized_keys que se encuentra en el servidor en la ruta ~/.ssh/authorized_keys, si el archivo no existe en el servidor entonces se crea automaticamente, si existe agregará la clave al final del archivo.
</p>

- La opción -p indica el puerto, si el puerto del ssh en el servidor es 22 se puede omitir la opción
- La opción -i indica la ruta donde se encuentra el archivo de la clave pública en el dispositivo cliente que se quiere copiar
- Por último se indica el nombre del usuario del servidor con el que se quiere acceder y el nombre del host o también puede ser la dirección IP 

```
ssh-copy-id -p22 -i ~/.ssh/id_ecdsa_nombreServidor.pub usuario@hostname
```

> Cómo resultado de la acción anterior, al ingresar con ssh usuario@hostname ya no solicita contraseña a usuario sino que hace la validación utilizando el par de claves.




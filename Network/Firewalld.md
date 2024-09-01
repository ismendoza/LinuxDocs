# Firewalld
<p align ="justify">Configuración básica de Firewalld.<p>

## Gestionar el servicio en el sistema

### 1. Iniciar el servicio del firewall
```
$ sudo systemctl start firewalld
```
### 2. Activar el firewall
```
$ sudo systemctl enable firewalld
```
### 3. Detener el servicio del firewall
```
$ sudo systemctl stop firewalld
```
### 4. Desactivar el firewall
```
$ sudo systemctl disable firewalld
```
### 5. Verificar el estado del servicio del firewall
```
$ sudo systemctl status firewalld
```

## Opciones de firewalld

### 1. Verificar el estado del firewall con su propio comando
```
$ sudo firewall-cmd --state
```
### 2. Verificar errores en la configuración
```
$ sudo firewall-cmd --check-config
```
### 3. Recargar firewalld despues de cambiar configuración
```
$ sudo firewall-cmd --reload
```
### 4. Ver la configuración de firewalld para la zona predeterminada
```
$ sudo firewall-cmd --list-all
```

## Verificar zonas
### 1. Verificar cual es la zona activa
```
sudo firewall-cmd --get-active-zone
```
```
sudo firewall-cmd --get-default-zone
```
### 2. Mostrar zonas existentes
```
$ sudo firewall-cmd --get-zones
```
### 3. Ver la configuración de una zona especifica
```
$ sudo firewall-cmd --list-all --zone=public
```

## Configuración de puertos
> Para modificar cualquier configuración es importante agregar la opción --permanent
al final de cada comando y después ejecutar $ sudo firewall-cmd --reload.

### 1. Mostrar los puertos abiertos
#### zona activa
```
$ sudo firewall-cmd --list-ports
```
#### zona específica
```
$ sudo firewall-cmd --zone=FedoraServer --list-ports
```
### 2. Abrir un puerto en la zona activa
#### forma 
```
$ sudo firewall-cmd --add-port=port-number/port-type
```
#### ejemplo
```
$ sudo firewall-cmd --add-port=22/tcp --permanent
```
### 3. Abrir un puerto de una zona especifica
#### forma
```
$ sudo firewall-cmd --zone=public --add-port=port-number/port-type
```
#### ejemplo
```
$ sudo firewall-cmd --zone=public --add-port=22/tcp --permanent
```
### 4. Cerrar un puerto en la zona activa
#### forma
```
$ sudo firewall-cmd --remove-port=port-number/port-type
```
#### ejemplo
```
$ sudo firewall-cmd --remove-port=22/tcp --permanent

```
### 5. Cerrar un puerto de una zona especifica
#### forma
```
$ sudo firewall-cmd --zone=public --add-port=port-number/port-type
```
#### ejemplo
```
$ sudo firewall-cmd --zone=public --add-port=22/tcp --permanent
```
## Configuración de servicios
### 1. Mostrar servicios activos de la zona activa
```
$ sudo firewall-cmd --list-services
```
### 2. Agregar servicios permitidos a una zona especifica
```
$ sudo firewall-cmd --zone=public --add-service=http --permanent
```
```
$ sudo firewall-cmd --zone=public --add-service=https --permanent
```
### 3. Eliminar servicios permitidos de una zona especifica
```
$ sudo firewall-cmd --zone=public --remove-service=http --permanent
```
## ICMP (Internet Control Message Protocol)
Firewalld permite bloquear solicitudes de ICMP para proteger la información
de la red. Las solicitudes de ICMP se describen en archivos xml individuales
que se encuentran en el directorio /usr/lib/firewalld/icmptypes.</p>

### Bloqueo o desbloqueo de las solicitudes de ICMP
<p align ="justify">Cuando su servidor bloquea las solicitudes de ICMP no proporciona la información que
normalmente proporcionaría. Sin embargo, eso no significa que no se proporcione
ninguna información. Los clientes reciben información de que la petición ICMP en
particular está siendo bloqueada (rechazada).</p>

### 1. Mostrar lista de tipos de solicitudes de ICMP
```
$ sudo firewall-cmd --get-icmptypes
```
### 2. Mostrar una lista de las solicitudes ICMP bloqueadas
```
$ sudo firewall-cmd --list-icmp-blocks
```
#### en una zona específica
```
$ sudo firewall-cmd --zone=FedoraServer --list-icmp-blocks
```
### 3. Verificar si una solicitud de ICMP esta bloqueada o no
```
$ sudo firewall-cmd --query-icmp-block=<icmptype>
```
#### ejemplo
```
$ sudo firewall-cmd --query-icmp-block=echo-request
```
#### en una zona específica
```
$ sudo firewall-cmd --zone=FedoraServer --query-icmp-block=echo-request
```
Esto devuelve como respuesta yes o no.
### 4. Para bloquear una solicitud de ICMP
```
$ sudo firewall-cmd --add-icmp-block=echo-request --permanent
```
#### en una zona específica
```
$ sudo firewall-cmd --zone=public --add-icmp-block=echo-request --permanent
```
```
sudo firewall-cmd --zone=public --add-icmp-block=timestamp-request --permanent
```
```
sudo firewall-cmd --zone=public --add-icmp-block=address-mask-request --permanent
```


### 5. Para eliminar el bloqueo de una solicitud de ICMP
```
$ sudo firewall-cmd --remove-icmp-block=echo-request --permanent
```
#### en una zona específica
```
$ sudo firewall-cmd --zone=public --remove-icmp-block=echo-request --permanent
```
## Targets
<p align ="justify">Cuando un paquete llega a una zona y no hay reglas definidas, la zona utiliza
su target para determinar que acción tomar.</p>
• ACCEPT: Una zona configurada con este target aceptara todos los
paquetes que no coincidan con ninguna regla.

• REJECT: Una zona configurada con este target rechazara todos los
paquetes que no coincidan con ninguna regla.

• DROP: Una zona configurada con este target, eliminara todos los
paquetes que no coincidan con una regla.

### REJECT vs DROP
<p align ="justify">Cuando se utiliza RE JECT, el sistema enviara un paquete notificando la fuente
del paquete que es rechazada. Si utiliza DROP, el sistema desechara el
paquete y no le notificara al emisor.</p>

### Asignar el target a la zona
```
$ sudo firewall-cmd --zone=public --set-target=DROP --permanent
```

## Otras acciones
### 1. Desactivar el trafico de la red inmediatamente
```
$ sudo firewall-cmd --panic-on
```
### 2. Activar de nuevo el tráfico de la red
```
$ sudo firewall-cmd --panic-off
```
### 3. Verificar el estado del modo panic
```
$ sudo firewall-cmd --query-panic
```

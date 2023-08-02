# Configurar una dirección IPv4 y convertir dhcp a manual
<p align="justify">Tomar en cuenta que primero se debe de configurar la dirección IP antes de cambiar de auto a manual la asignación de IP, debido que se produce un error porque no permite ipv4 sin datos. También se utilizó algunas opciones de este comando nmcli para especificar los campos que quiero mostrar en pantalla. </p>

## 1. Identificar la conexión y el dispositivo
<p align="justify">Para configurar una conexión se debe primero identificar con el nombre, para este ejemplo se trabajara con la conexión “cableada1”, la cual es una conexión ethernet.</p>

![nmcli1](https://github.com/ismendoza/LinuxDocs/assets/18213479/b030799b-c716-4d7f-acf0-01b98a7cdc6d)
```
$ nmcli --mode tabular --field name,type,state,device,active connection
```
La alternativa más simple es
```
$ nmcli connection
```
## 2. Asignar dirección de IP, dirección de gateway y dirección dns a la conexión identificada
<p align="justify">En este ejemplo se trabajará con la conexión con nombre cableada1</p>

![nmcli2](https://github.com/ismendoza/LinuxDocs/assets/18213479/c2fc7e35-22f1-4ca3-b319-df1c72d35aab)

```
$ nmcli connection modify cableada1 IPv4.address 192.168.1.112/24 IPv4.gateway 192.168.1.1 IPv4.dns "8.8.8.8 8.8.4.4"
```

## 3. Establecer método de asignación de dirección IP a Manual

![nmcli3](https://github.com/ismendoza/LinuxDocs/assets/18213479/9ba1be7b-ed06-44df-9612-0d93276e7bee)

```
$ nmcli connection modify cableada1 IPv4.method manual
```
## 4. Desactivar la conexión del dispositivo

![nmcli4](https://github.com/ismendoza/LinuxDocs/assets/18213479/5bca8ab1-a1a6-4941-82bc-473b3013f828)

```
$ nmcli connection down cableada1
```
## 5. Activar de nuevo la conexión del dispositivo

![nmcli5](https://github.com/ismendoza/LinuxDocs/assets/18213479/63d2b76e-32f5-4530-982e-e673eff18e8a)
```
$ nmcli connection up cableada1
```
## 6. Verificar la configuración y estado de la conexión (campos seleccionados)

![nmcli6](https://github.com/ismendoza/LinuxDocs/assets/18213479/d7c4df2b-d652-4a91-a90d-9650cd02ee4c)

```
$ nmcli --field connection.id,general.state,connection.interface-name,ipv4.method,ipv4.addresses,ipv4.gateway,ipv4.dns,general.default  connection show cableada1
```
<p align="justify">Este documento contiene la información del **uso básico** de la utilidad nmcli  (NetworkManager Command Line Interface) en linux, se ha extraido de la documentación de Red Hat Enterprise Linux, para hacer las configuraciones se utilizo el sistema operativo Fedora 38, en donde ya trae instalada la utilidad.</p>

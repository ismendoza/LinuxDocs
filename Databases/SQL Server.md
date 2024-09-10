## Inicio de sesión (Login)
<p align="justify">Un inicio de sesión es una entidad de seguridad o una entidad que puede ser autenticada por un sistema seguro. Los usuarios necesitan un nombre de usuario para conectarse a SQL Server. Puede crear un inicio de sesión basado en una entidad de seguridad de Windows (como un usuario de dominio o un grupo de dominio de Windows) o puede crear un inicio de sesión que no esté basado en una entidad de seguridad de Windows (como un inicio de sesión de SQL Server).
Como entidad de seguridad, se pueden conceder permisos a los inicios de sesión. El ámbito de un inicio de sesión es todo el motor de base de datos. Para conectarse a una base de datos específica en la instancia de SQL Server, se debe asignar un inicio de sesión a un usuario de base de datos. Los permisos dentro de la base de datos se conceden y deniegan al usuario de la base de datos, no al inicio de sesión.
</p>

## Crear un usuario con un inicio de sesión
<p align="justify">Los inicios de sesión en la base de datos master son comunes para las personas que administran SQL Server y para las personas que necesitan acceder a muchas o a todas las bases de datos de la instancia de SQL Server. En este caso, creará un usuario SQL con inicio de sesión. El usuario de la base de datos es la identidad del inicio de sesión cuando se conecta a una base de datos. El usuario de la base de datos puede utilizar el mismo nombre que el inicio de sesión, pero no es necesario.
<br><br>
Como entidad de seguridad
<p align="justify">Un usuario es una entidad de seguridad de la base de datos. Los inicios de sesión deben estar asignados a un usuario de base de datos para poder conectarse a una base de datos. Un inicio de sesión se puede asignar a bases de datos diferentes como usuarios diferentes pero solo se puede asignar como un usuario en cada base de datos.</p>

## ¿Cómo funciona?
1. Login: se necesita crear un login para tener acceso al servidor SQL Server. 
> Este login puede tener roles asignados a nivel de servidor o no tener ninguno, por ejemplo el rol sysadmin controla todo el servidor.

2. Usuarios: Es recomendable crear usuarios y asociarlo a un login específico, los usuarios se crean dentro de la base de datos a la cual se le quiere dar acceso al usuario.
Aunque también se pueden crear usuarios independientes (sin login)

> Antes de crear el usuario ejecutar > USE nombre_base_de_datos; para cambiar el entorno de base de datos.
> Cada usuario puede tener asignados roles o permisos específicos para la gestión de la base de datos (no el servidor)

3. Asociación única entre usuarios y logins <br><br>
>En cada base de datos se pueden crear varios usuarios, pero cada usuario está asociado a un único login. 


### Crear un login y asignarlo a un rol
```
-- Crea login
CREATE LOGIN administrador WITH PASSWORD = 'password', DEFAULT_DATABASE = master;
-- Hacer miembro de un rol a un login creado
ALTER SERVER ROLE sysadmin ADD MEMBER administrador;
```

### Eliminar el login de un rol al que pertenece
```
USE master;
ALTER SERVER ROLE dbcreator DROP MEMBER nombre_login;
```

### Deshabilitar login sa

```
ALTER LOGIN sa DISABLE;
```
### Habilitar login sa

```
ALTER LOGIN sa ENABLE;
```


### Crear un login sin hacerlo miembro de un rol de servidor y asignarle un usuario

```
-- Se crea el login
CREATE LOGIN webdev WITH PASSWORD = 'PASSWORD';
-- Crear una base de datos para el usuario
CREATE DATABASE bd_test;
-- Cambia la base de datos a la cual se quiere dar acceso al usuario
USE bd_test;
-- Se crea el usuario
CREATE USER webdev for Login webdev;
-- Se agrega el usuario al rol 
ALTER ROLE db_owner ADD MEMBER webdev;
-- Se elimina el usuario del rol 
ALTER ROLE db_owner DROP MEMBER webdev;
```

### Crear un login con contraseña que se debe cambiar en la primra conexión
```
CREATE LOGIN nombre_login WITH PASSOWRD = 'PASSWORD' MUST_CHANGE, CHECK_EXPIRATION = ON;
```


### Cambiar contraseña a un login
```
ALTER LOGIN administrador WITH PASSWORD = 'nueva contraseña'
```
### Asignar base de datos predeterminada a un login existente
```
ALTER LOGIN webdev with DEFAULT_DATABASE = bd_test;
```
### Crear esquemas
```
CREATE SCHEMA nombre_esquema;
-- Asignar un esquema predeterminado a un usuario
ALTER USER nombre_usuario WITH DEFAULT_SCHEMA = nombre_esquema;
```

## Roles fijos de nivel de servidor

#### sysadmin
<p align="justify">Los miembros del rol fijo de servidor sysadmin pueden realizar cualquier actividad en el servidor.</p>

#### serveradmin
<p align="justify">Los miembros del rol fijo de servidor serveradmin pueden cambiar opciones de configuración en el servidor y cerrar el servidor.</p>

#### securityadmin
<p align="justify">Los miembros del rol fijo de servidor securityadmin administran los inicios de sesión y sus propiedades. Pueden administrar los permisos de nivel de servidor GRANT, DENY, y REVOKE. securityadmin también puede administrar los permisos de GRANT, DENY y REVOKE si tiene acceso a una base de datos. Además, securityadmin puede restablecer las contraseñas de los inicios de sesión en SQL Server.
IMPORTANTE: La capacidad de conceder acceso al motor de base de datos y configurar los permisos de usuario permite que el administrador de seguridad asigne la mayoría de los permisos de servidor. El rol securityadmin se debe tratar como equivalente al rol sysadmin . Como alternativa, a partir de SQL Server 2022 (16.x), considere la posibilidad de usar el nuevo rol fijo de servidor ##MS_LoginManager##.</p> 

#### processadmin
<p align="justify">Los miembros del rol fijo de servidor processadmin pueden finalizar los procesos que se ejecutan en una instancia de SQL Server.</p>

#### setupadmin
<p align="justify">Los miembros del rol fijo de servidor setupadmin pueden agregar y quitar servidores vinculados mediante instrucciones Transact-SQL. (para usar Management Studio es necesario ser administrador del sistema).</p>

#### bulkadmin
<p align="justify">Los miembros del rol fijo de servidor bulkadmin pueden ejecutar la instrucción BULK INSERT.

El rol bulkadmin o los permisos ADMINISTER BULK OPERATIONS no son compatibles con SQL Server en Linux. Solo sysadmin puede realizar inserciones masivas para SQL Server en Linux.</p>

#### dsikadmin
<p align="justify">	El rol fijo de servidor diskadmin se usa para administrar archivos de disco.</p>

#### dbcreator
<p align="justify">	Los miembros del rol fijo de servidor dbcreator pueden crear, modificar, quitar y restaurar cualquier base de datos.</p> 

#### public 
<p align="justify">Cada inicio de sesión de SQL Server pertenece al rol del servidor público. Cuando a una entidad de seguridad de servidor no se le han concedido ni denegado permisos específicos para un objeto protegible, el usuario hereda los permisos concedidos al rol público en ese objeto. Solo asigne los permisos públicos en cualquier objeto cuando desee que el objeto esté disponible para todos los usuarios. No se puede cambiar de miembro en público.

Nota: public se implementa de manera diferente a otros roles, y los permisos se pueden conceder, denegar o revocar desde los roles fijos de servidor públicos.</p> 

## Roles de nivel de servidor de sql server 2022

#### \##MS_DatabaseConnector##
<p align="justify">Los miembros del rol fijo de servidor ##MS_DatabaseConnector## pueden conectarse a cualquier base de datos sin necesidad de que una cuenta de usuario de la base de datos se conecte.

Para denegar el permiso CONNECT a una base de datos específica, los usuarios pueden crear una cuenta de usuario coincidente para este inicio de sesión en la base de datos y, a continuación, DENY al permiso CONNECT al usuario de base de datos. Este permiso DENY anula el permiso GRANT CONNECT procedente de este rol.</p>

#### \##MS_LoginManager##
<p align="justify">Los miembros del rol fijo del servidor ##MS_LoginManager## pueden crear, eliminar y modificar inicios de sesión. A diferencia del antiguo rol fijo del servidor securityadmin, este rol no otorga privilegios GRANT a sus miembros. Es un rol más limitado que ayuda a cumplir con el Principio del privilegio mínimo.</p>

#### \##MS_DatabaseManager##
<p align="justify">Los miembros del rol fijo de servidor ##MS_DatabaseManager## pueden crear y eliminar bases de datos. Un miembro del rol ##MS_DatabaseManager## que crea una base de datos se convierte en el propietario de dicha base de datos, lo que permite que el usuario se conecte a ella como el usuario dbo. El usuario dbo tiene todos los permisos de base de datos en la base de datos. Los miembros del rol ##MS_DatabaseManager## no necesariamente tienen permiso para acceder a las bases de datos que no son de su propiedad. Este rol del servidor tiene los mismos privilegios que el rol dbcreator en SQL Server, pero recomendamos usar este nuevo rol en lugar del anterior, ya que este rol existe también en Azure SQL Database y por lo tanto ayuda a usar los mismos scripts en diferentes ambientes.</p>

#### \##MS_ServerStateManager##
<p align="justify">Los miembros del rol fijo de servidor ##MS_ServerStateManager## tienen los mismos permisos que el rol ##MS_ServerStateReader###. Además, contiene el permiso ALTER SERVER STATE, que permite el acceso a varias operaciones de administración, como DBCC FREEPROCCACHE, DBCC FREESYSTEMCACHE ('ALL') y DBCC SQLPERF()</p>

#### \##MS_ServerStateReader##	
<p align="justify">Los miembros del rol fijo de servidor ##MS_ServerStateReader## pueden leer todas las vistas de administración dinámica (DMV) y funciones que están incluidas en VIEW SERVER STATE, y respectivamente tiene permiso VIEW DATABASE STATE en cualquier base de datos en la que el miembro de este rol tenga una cuenta de usuario.</p>

#### \##MS_ServerPerformanceStateReader##	
<p align="justify">Los miembros del rol fijo de servidor ##MS_ServerPerformanceStateReader## pueden leer todas las vistas de administración dinámica (DMV) y las funciones cubiertas por VIEW SERVER PERFORMANCE STATE, respectivamente tiene permiso VIEW DATABASE PERFORMANCE STATE en cualquier base de datos en la que el miembro de este rol tenga una cuenta de usuario. Se trata de un subconjunto al que tiene acceso el rol del servidor ##MS_ServerStateReader##, lo que ayuda a cumplir con el Principio de privilegio mínimo.</p>

#### \##MS_ServerSecurityStateReader##	
<p align="justify">Los miembros del rol fijo de servidor ##MS_ServerSecurityStateReader## pueden leer todas las vistas de administración dinámica (DMV) y las funciones cubiertas por VIEW SERVER SECURITY STATE, y respectivamente tiene permiso VIEW DATABASE SECURITY STATE en cualquier base de datos en la que el miembro de este rol tenga una cuenta de usuario. Se trata de un subconjunto al que tiene acceso el rol del servidor ##MS_ServerStateReader##, lo que ayuda a cumplir con el Principio de privilegio mínimo.</p>

#### \##MS_DefinitionReader##	
<p align="justify">Los miembros del rol fijo del servidor ##MS_DefinitionReader## pueden leer todas las vistas de catálogo cubiertas por VIEW ANY DEFINITION, y respectivamente tienen permiso VIEW DEFINITION en cualquier base de datos en la que el miembro de este rol tenga una cuenta de usuario.</p>

#### \##MS_PerformanceDefinitionReader##
<p align="justify">Los miembros del rol fijo del servidor ##MS_PerformanceDefinitionReader## pueden leer todas las vistas de catálogo cubiertas por VIEW ANY PERFORMANCE DEFINITION, y respectivamente tienen permiso VIEW PERFORMANCE DEFINITION en cualquier base de datos en la que el miembro de este rol tenga una cuenta de usuario. Se trata de un subconjunto al que tiene acceso el rol del servidor ##MS_DefinitionReader##.</p>

#### \##MS_SecurityDefinitionReader##
<p align="justify">Los miembros del rol fijo de servidor ##MS_SecurityDefinitionReader## pueden leer todas las vistas de catálogo cubiertas por VIEW ANY SECURITY DEFINITION, y respectivamente tiene el permiso VIEW SECURITY DEFINITION en cualquier base de datos en la que el miembro de este rol tenga una cuenta de usuario. Este es un pequeño subconjunto de lo que el rol del servidor ##MS_DefinitionReader## tiene acceso, lo que ayuda a cumplir con el Principio de privilegio mínimo.</p>



## Roles a nivel de base de datos
**db_owner**<p align="justify">Los miembros del rol fijo de base de datos db_owner pueden realizar todas las actividades de configuración y mantenimiento en la base de datos, y también pueden DROP la base de datos en SQL Server. (En SQL Database y Azure Synapse, algunas actividades de mantenimiento requieren permisos a nivel de servidor y no se pueden realizar por db_owners).</p>
**db_securityadmin** <p align="justify">Los miembros del rol fijo de base de datos db_securityadmin pueden modificar la pertenencia a roles únicamente para roles personalizados y administrar permisos. Los miembros de este rol pueden elevar potencialmente sus privilegios y se deben supervisar sus acciones.</p>
**db_accessadmin** <p align="justify">	Los miembros del rol fijo de base de datos db_accessadmin pueden agregar o eliminar el acceso a la base de datos para inicios de sesión de Windows, grupos de Windows e inicios de sesión de SQL Server.</p>
**db_backupoperator:** <p align="justify">Los miembros del rol fijo de base de datos db_backupoperator pueden crear copias de seguridad de la base de datos.</p>
**db_ddladmin** <p align="justify">Los miembros del rol fijo de base de datos db_ddladmin pueden ejecutar cualquier comando del lenguaje de definición de datos (DDL) en una base de datos. Los miembros de este rol pueden potencialmente aumentar sus privilegios manipulando código que puede ser ejecutado bajo altos privilegios y sus acciones se deben supervisar.</p>
**db_datawriter** <p align="justify">Los miembros del rol fijo de base de datos db_datawriter pueden agregar, eliminar o cambiar datos en todas las tablas de usuario. En la mayoría de los casos de uso, este rol se combina con la membresía db_datareader para permitir la lectura de los datos que se van a modificar.</p>
**db_datareader** <p align="justify>Los miembros del rol fijo de base de datos db_datareader pueden leer todos los datos de todas las tablas y vistas de usuario. Los objetos de usuario pueden existir en cualquier esquema, excepto sys e INFORMATION_SCHEMA.</p>
**db_denydatawriter** <p align="justify">Los miembros del rol fijo de base de datos db_denydatawriter no pueden agregar, modificar ni eliminar datos de tablas de usuario de una base de datos.</p>
**db_denydatareader** <p align="justify">Los miembros del rol fijo de base de datos db_denydatareader no pueden leer datos de las tablas y vistas de usuario dentro de una base de datos.</p>


## Copias de seguridad

### 1. Copia de seguridad completa
```
sqlcmd -S localhost -U SA -C -Q "BACKUP DATABASE nombre_bd TO DISK = N'/var/opt/mssql/data/nombre_backup.bak' WITH NOFORMAT, NOINIT, NAME = 'nombre_bd-full', SKIP, NOREWIND, NOUNLOAD, STATS = 10"
```

### 2. Copia de seguridad diferencial
```
sqlcmd -S localhost -U SA -C -Q "BACKUP DATABASE nombre_bd TO DISK = N'/var/opt/mssql/data/nombre_bd_diff.bak' WITH DIFFERENTIAL, NOFORMAT, NOINIT, NAME = 'nombre_bd-diff', SKIP, NOREWIND, NOUNLOAD, STATS = 10"
```
### 3. Copia de seguridad del registro de transacciones
```
sqlcmd -S localhost -U SA -C -Q "BACKUP LOG nombre_bd TO DISK = N'/var/opt/mssql/data/nombre_bd_LogBackup.bak' WITH NOFORMAT, NOINIT, NAME = N'nombre_bd_LogBackup', NOSKIP, NOREWIND, NOUNLOAD, STATS = 5"
```


## Restaurar copia de seguridad

### 1. Restaurar una copia completa
```
-- Utilizar NORECOVERY si se va a restaurar una copia diferencial, de lo contrario utiliza RECOVERY
sqlcmd -S localhost -U SA -C -Q "RESTORE DATABASE nombre_bd FROM DISK = N'/var/opt/mssql/data/nombre_backup.bak' WITH NORECOVERY, FILE = 1, NOUNLOAD, REPLACE, STATS = 5"
```
### 2. Restaurar una copia diferencial
```
sqlcmd -S localhost -U SA -C -Q "RESTORE DATABASE nombre_bd FROM DISK = N'/var/opt/mssql/data/nombre_bd__diff.bak' WITH RECOVERY, STATS = 10"

```

### 3. Restaurar una copia del registro de transacciones
```
sqlcmd -S localhost -U SA -C -Q "RESTORE LOG nombre_bd FROM DISK = N'/var/opt/mssql/data/nombre_bd_LogBackup.bak'"
```

> ### Tener en cuenta la sencuencia con que se realizó la copia de seguridad para restaurar.


## Cambio de la ubicación predeterminada del directorio de copia de seguridad
<p align="justify">
La configuración filelocation.defaultbackupdir cambia la ubicación predeterminada en la que se generan los archivos de copia de seguridad. De forma predeterminada, estos archivos se generan en /var/opt/mssql/data.
<p/>

1. Crear un directorio diferente, por ejemplo 
```
sudo mkdir /tmp/backup
```
2. Cambie el propietario y el grupo del directorio al usuario mssql: 
```
sudo chown mssql /tmp/backup
sudo chgrp mssql /tmp/backup
```
3. Use mssql-conf para cambiar el directorio predeterminado de copia de seguridad con el comando set.

```
sudo /opt/mssql/bin/mssql-conf set filelocation.defaultbackupdir /tmp/backup
```

4. Reiniciar el servidor SQL Server
```
sudo systemctl restart mssql-server
```

## Log de errores

```
sudo cat /var/opt/mssql/log/errorlog  
```


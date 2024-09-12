## Crear una especificación de auditoría de base de datos
<p align="justify">Las especificaciones de auditoría de base de datos son objetos no protegibles que residen en una base de datos determinada. Cuando se crea una especificación de auditoría de servidor de base de datos, está en un estado deshabilitado.

Los usuarios con el permiso ALTER ANY DATABASE AUDIT pueden crear especificaciones de auditoría de base de datos y enlazarlas a cualquier auditoría.

Después de crear una especificación de auditoría de base de datos, podrán verla los usuarios con el permiso CONTROL SERVER, o bien la cuenta sysadmin.</p>

### Ejemplo


#### Crea una auditoría de servidor

```
USE master;
CREATE SERVER AUDIT auditoria_tabla TO FILE (FILEPATH = 'ruta_directorio');
```


#### Crea una especificación de auditoría de base de datos
<p align="justify">Crea una especificación que audita las instrucciones SELECT y INSERT por cualquier miembro del rol de base de datos db_owner, para la tabla libro de la base de datos biblioteca (la tabla se encuentra en un esquema con nombre bib).</p>

```
USE biblioteca;
CREATE DATABASE AUDIT SPECIFICATION auditoria_tabla_libro FOR SERVER AUDIT auditoria_tabla add (SELECT, INSERT ON biblioteca.bib.libro by db_owner);
```
#### Habilitar la auditoria y la especificación

```
USE master;
ALTER SERVER AUDIT auditoria_tabla WITH (STATE = ON);

USE biblioteca;
ALTER DATABASE AUDIT SPECIFICATION auditoria_tabla_libro WITH (STATE = ON);
```

#### Consultar en el servidor especificaciones de bases de datos existentes
```
USE biblioteca;
SELECT * FROM sys.database_audit_specifications;
```


>La auditoría creada anteriormente tiene como consecuencia que se auditen todos los usuarios que son miembros del rol db_owner.

#### Consultar información recolectada de la auditoría

>sys.fn_get_audit_file Devuelve información de un archivo de auditoría creado por una auditoría de servidor en SQL Server.
```
USE master;
select server_principal_name, database_name, schema_name, statement,  event_time, action_id, succeeded, session_id, client_ip, application_name, host_name 
from sys.fn_get_audit_file('/directorio/auditoria_CAC36CFD-40D6-4D73-8EA9-A17E16FC3B99_0_133705413075710000.sqlaudit',default, default);
```

#### Eliminar una especificación de auditoría de base de datos

``` 
USE biblioteca;
DROP DATABASE AUDIT SPECIFICATION nombre_especificación;
```

### Ejemplos de especificaciones de bases de datos

```
-- Este evento tiene lugar cuando se emite un comando de copia de seguridad o de restauración.
CREATE DATABASE AUDIT SPECIFICATION BackupRestore FOR SERVER AUDIT nombre_auditoría ADD (BACKUP_RESTORE_GROUP) WITH (STATE = ON);
```

```
-- Este evento se desencadena al crear, modificar o quitar una base de datos.
CREATE DATABASE AUDIT SPECIFICATION DatabaseChange FOR SERVER AUDIT nombre_auditoría ADD (DATABASE_CHANGE_GROUP) WITH (STATE = ON);
```

```
-- Auditoría de acciones específicas directamente en objetos de esquema y de esquema de la base de datos, como por ejemplo tablas, vistas, procedimientos almacenados, funciones, procedimientos almacenados extendidos, colas o sinónimos.
CREATE DATABASE AUDIT SPECIFICATION TableAccess FOR SERVER AUDIT nombre_auditoría ADD (SELECT, INSERT, UPDATE, DELETE ON esquema.nombre_tabla BY PUBLIC) WITH (STATE = ON);

```
## Crear una especificación de auditoría de servidor

<p align="justify">Para poder crear una especificación de auditoría de servidor, debe existir la auditoría. Cuando se crea una especificación de auditoría de servidor, está en estado deshabilitado.

Los usuarios con el permiso ALTER ANY SERVER AUDIT pueden crear especificaciones de auditoría de servidor y enlazarlas a cualquier auditoría.

Después de crearse una especificación de auditoría de servidor, la pueden ver los usuarios con el permiso CONTROL SERVER, la cuenta sysadmin o las entidades de seguridad que tengan acceso explícito a la auditoría.</p>

### Argumentos
#### nombre_especificación
Nombre de la especificación de auditoría de servidor.

#### nombre_auditoría
Nombre de la auditoría a la que se aplica esta especificación.

#### Nombre de grupo de acciones
Nombre de un grupo de acciones de auditoría de nivel de servidor. Para ver una lista de grupos de acciones de auditoría, https://learn.microsoft.com/es-es/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions?view=sql-server-ver16

#### WITH ( STATE =  ON | OFF )
Habilita o deshabilita la recopilación de registros por parte de la auditoría para esta especificación de auditoría.

### Ejemplos

#### Crear una especificación y la habilita
```
USE master;
CREATE SERVER AUDIT SPECIFICATION nombre_especificación FOR SERVER AUDIT nombre_auditoría ADD (FAILED_LOGIN_GROUP) WITH (STATE = ON);
```

#### Crear una especificación deshabilitada y habilitarla 
```
USE master;
-- Crea una especificación que registra
CREATE SERVER AUDIT SPECIFICATION nombre_especificación FOR SERVER AUDIT nombre_auditoría ADD (FAILED_LOGIN_GROUP);
-- Habilitar la especificación
ALTER SERVER AUDIT SPECIFICATION nombre_especificación WITH (STATE = ON);
-- Deshabilitar una especificación
ALTER SERVER AUDIT SPECIFICATION nombre_especificación WITH (STATE = OF);
```

#### Consultar información recolectada de la auditoría de servidor


#### Consultar en el servidor especificaciones existentes

```
SELECT * FROM sys.server_audit_specifications;
```

#### Eliminar una especificación de auditoría de servidor

```
USE master;
DROP SERVER AUDIT SPECIFICATION nombre_especificación;
```

### Ejemplos de especificaciones de servidor

```
-- Registra inicios de sesión exitosos
CREATE SERVER AUDIT SPECIFICATION SuccessfulLoginAudit FOR SERVER AUDIT nombre_auditoría ADD (SUCCESSFUL_LOGIN_GROUP) WITH (STATE = ON);
````

```
-- Este evento se genera al modificar el estado del servicio de SQL Server.
CREATE DATABASE AUDIT SPECIFICATION ServerChangeState FOR SERVER AUDIT nombre_auditoría ADD (SERVER_STATE_CHANGE_GROUP) WITH (STATE = ON);
````

```
-- Registra creación, modificación y eliminación de objetos del servidor
CREATE SERVER AUDIT SPECIFICATION ServerObjectChange FOR SERVER AUDIT nombre_auditoría ADD (SERVER_OBJECT_CHANGE_GROUP) WITH (STATE = ON);
````
```
-- Este evento se desencadena cuando se cambia una contraseña de inicio de sesión mediante la instrucción ALTER LOGIN o el procedimiento almacenado sp_password.
CREATE SERVER AUDIT SPECIFICATION LoginChangePassword FOR SERVER AUDIT nombre_auditoría ADD (LOGIN_CHANGE_PASSWORD_GROUP) WITH (STATE = ON);
````

```
-- Registra creación, modificación y eliminación de objetos de bases de datos
CREATE DATABASE AUDIT SPECIFICATION DatabaseChanges FOR SERVER AUDIT nombre_auditoría ADD (DATABASE_OBJECT_CHANGE_GROUP) WITH (STATE = ON);
````

```
-- Este evento se desencadena cuando se agrega o quita un inicio de sesión en un rol fijo de servidor.
CREATE DATABASE AUDIT SPECIFICATION ServerRoleMemberChange FOR SERVER AUDIT nombre_auditoría ADD (SERVER_ROLE_MEMBER_CHANGE_GROUP) WITH (STATE = ON);
````

```
-- Este evento se provoca al crear, modificar o quitar entidades de seguridad, como usuarios, en una base de datos.
CREATE DATABASE AUDIT SPECIFICATION DatabasePrincipalChange FOR SERVER AUDIT nombre_auditoría ADD (DATABASE_PRINCIPAL_CHANGE_GROUP) WITH (STATE = ON);
````



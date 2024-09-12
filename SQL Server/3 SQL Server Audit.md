# SQL Server Audit
<p align="justify">
La auditoría de una instancia de Motor de base de datos de SQL Server o de una base de datos individual implica el seguimiento y registro de los eventos que se producen en Motor de base de datos. La auditoría deSQL Server permite crear auditorías de servidor, que pueden contener especificaciones de auditoría de servidor para los eventos de servidor, y especificaciones de auditoría de base de datos para los eventos de base de datos. Los eventos auditados se pueden escribir en los registros de eventos o en los archivos de auditoría.</p>

<p align="justify">
Puede registrar grupos de acciones de auditoría en el servidor por instancia, así como grupos de acciones o acciones de auditoría en la base de datos por base de datos. El evento de auditoría se producirá cada vez que se encuentre la acción auditable.</p>

## Componentes de SQL Server Audit
<p align="justify">Una auditoría es la combinación de varios elementos en un único paquete para un grupo específico de acciones de servidor o de base de datos. Los componentes de SQL Server Audit se combinan para producir una salida denominada auditoría, de la misma manera que una definición de informe combinada con gráficos y elementos de datos da como resultado un informe.</p>

### SQL Server Audit
<p align="justify">El objeto SQL Server Audit recopila una única instancia de acciones y grupos de acciones de nivel de servidor o de base de datos para su supervisión. La auditoría se realiza en el nivel de instancia de SQL Server. Es posible tener varias auditorías por cada instancia de SQL Server.

Cuando se define una auditoría, se especifica la ubicación para los resultados generados. Éste es el destino de la auditoría. La auditoría se crea en un estado deshabilitado y no audita automáticamente ninguna acción. Una vez habilitada la auditoría, el destino de la auditoría recibe los datos de la misma.</p>

### Especificación de auditoría de servidor
<p align="justify">El objeto Especificación de auditoría de servidor pertenece a una auditoría. Puede crear una especificación de auditoría de servidor por cada auditoría, ya que ambos se crean en el ámbito de la instancia de SQL Server.

La especificación de auditoría de servidor recopila muchos grupos de acciones de nivel de servidor generados por la característica Extended Events. Puede incluir grupos de acciones de auditoría en una especificación de auditoría de servidor. Los grupos de acciones de auditoría son grupos predefinidos de acciones, que constituyen eventos atómicos que tienen lugar en el motor de base de datos. Estas acciones se envían a la auditoría, que las registra en el destino.</p>

> Los grupos de acciones de auditoría de nivel de servidor se describen en el artículo
> https://learn.microsoft.com/es-es/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions?view=sql-server-ver16

### Especificación de auditoría de base de datos
<p align="justify">El objeto Especificación de auditoría de base de datos también pertenece a una auditoría de SQL Server. Puede crear una única especificación de auditoría de base de datos para cada base de datos de SQL Server y cada auditoría.

La especificación de auditoría de base de datos recopila acciones de auditoría de nivel de base de datos generadas por la característica Extended Events. Puede agregar grupos de acciones de auditoría o eventos de auditoría a una especificación de auditoría de base de datos. Los eventos de auditoría son las acciones atómicas que puede auditar el motor de SQL Server. Losgrupos de acciones de auditoría son grupos predefinidos de acciones. Ambos están en el ámbito de la base de datos de SQL Server. Estas acciones se envían a la auditoría, que las registra en el destino. No incluyas objetos con ámbito en el servidor, como las vistas del sistema, en una especificación de auditoría de base de datos de usuario.</p>

> Los grupos de acciones de auditoría de base de datos y las acciones de auditoría se describen en el artículo 
> https://learn.microsoft.com/es-es/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions?view=sql-server-ver16

### Destino
<p align="justify">Los resultados de una auditoría se envían a un destino, que puede ser un archivo, el registro de eventos de seguridad de Windows o el registro de eventos de aplicación Windows. Los registros se deben revisar y archivar periódicamente para garantizar que el destino tiene espacio suficiente para escribir más registros.</p>
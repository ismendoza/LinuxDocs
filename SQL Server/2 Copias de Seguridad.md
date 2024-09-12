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
-- Utilizar NORECOVERY si después de hacer una restauración completa se va hacer una restauración de una copia diferencial y de copia de registros de transacciones, de lo contrario utiliza RECOVERY
sqlcmd -S localhost -U SA -C -Q "RESTORE DATABASE nombre_bd FROM DISK = N'/var/opt/mssql/data/nombre_backup.bak' WITH NORECOVERY, FILE = 1, NOUNLOAD, REPLACE, STATS = 5"
```
### 2. Restaurar una copia diferencial
```
sqlcmd -S localhost -U SA -C -Q "RESTORE DATABASE nombre_bd FROM DISK = N'/var/opt/mssql/data/nombre_bd__diff.bak' WITH NORECOVERY, STATS = 10"

```

### 3. Restaurar una copia del registro de transacciones
```
sqlcmd -S localhost -U SA -C -Q "RESTORE LOG nombre_bd FROM DISK = N'/var/opt/mssql/data/nombre_bd_LogBackup.bak' WITH RECOVERY"
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
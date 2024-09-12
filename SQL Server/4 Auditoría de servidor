## Crear una auditoría

### Argumentos

#### TO FILE | APPLICATION_LOG | SECURITY_LOG | URL | EXTERNAL_MONITOR 
Determina la ubicación del destino de la auditoría.

#### FILEPATH = 'os_file_path'
<p align="justify">La ruta de acceso del registro de auditoría. El nombre de archivo se genera en función del nombre de la auditoría y del GUID de la auditoría. Si esta ruta de acceso no es válida, no se crea la auditoría.</p>

#### MAXSIZE = 1GB
<p align="justify">Especifica el tamaño máximo que puede alcanzar el archivo de auditoría. El valor de max_size debe ser un entero seguido de MB, GB, TB o UNLIMITED. El tamaño mínimo que se puede especificar para max_size es 2 MB y el máximo, 2.147.483.647 TB. Si se especifica UNLIMITED, el archivo crecerá hasta que se llene el disco. (0 también indica UNLIMITED). Si se especifica un valor inferior a 2 MB, se produce el error MSG_MAXSIZE_TOO_SMALL. El valor predeterminado es UNLIMITED.</p>

#### MAX_FILES = integer
<p align="justify">Especifica el número máximo de archivos de auditoría que pueden crearse. No realiza la sustitución incremental al primer archivo cuando se alcanza el límite. Cuando se alcanza el límite de MAX_FILES, cualquier acción que ocasione la generación de eventos de auditoría adicionales producirá un error y se mostrará un mensaje.</p>

#### MAX_ROLLOVER_FILES = integer | UNLIMITED
<p align="justify">Especifica el número máximo de archivos que se deben conservar en el sistema de archivos además del archivo actual. El valor MAX_ROLLOVER_FILES debe ser un entero o UNLIMITED. El valor predeterminado es UNLIMITED. Este parámetro se evalúa siempre que se reinicia la auditoría (lo que puede suceder cuando se reinicia la instancia de Motor de base de datos o cuando se desactiva la auditoría y, a continuación, se activa de nuevo) o cuando se necesita un nuevo archivo porque se ha alcanzado el MAXSIZE. Cuando se evalúa MAX_ROLLOVER_FILES, si el número de archivos supera la configuración de MAX_ROLLOVER_FILES, se elimina el archivo más antiguo. Como resultado, cuando la configuración de MAX_ROLLOVER_FILES es 0, se crea un archivo cada vez que se evalúa la configuración de MAX_ROLLOVER_FILES. Se elimina solo un archivo automáticamente cuando se evalúa la configuración de MAX_ROLLOVER_FILES, de modo que cuando se disminuye el valor de MAX_ROLLOVER_FILES, el número de archivos no se reduce a menos que se eliminen manualmente los archivos antiguos. El número máximo de archivos que se pueden especificar es 2.147.483.647.</p>

#### RESERVE_DISK_SPACE =  ON | OFF 
<p align="justify">Esta opción preasigna el archivo en el disco al valor de MAXSIZE. Solo se aplica si MAXSIZE no es igual a UNLIMITED. El valor predeterminado es OFF.</p>

#### QUEUE_DELAY = integer
<p align="justify">Determina el tiempo, en milisegundos, que puede transcurrir antes de exigir que se procesen las acciones de auditoría. El valor 0 indica la entrega sincrónica. El valor mínimo que puede establecerse para la cola es 1000 (1 segundo), que es el valor predeterminado. El máximo es 2147483647 (2.147.483,647 segundos, o 24 días, 20 horas, 31 minutos y 23,647 segundos). Al especificar un número no válido, se produce el error MSG_INVALID_QUEUE_DELAY.</p>

#### ON_FAILURE =  CONTINUE | SHUTDOWN | FAIL_OPERATION 
<p align="justify">Indica si la escritura de la instancia en el objetivo debe suspender, continuar o detener SQL Server si el objetivo no puede escribir en el registro de auditoría. El valor predeterminado es CONTINUE.</p>

#### CONTINUE
<p align="justify">Las operaciones de SQL Server continúan. Los registros de auditoría no se conservan. La auditoría continúa intentando el registro de eventos y se reanuda si se resuelve la condición de error. La selección de la opción Continuar puede permitir que una actividad no se audite, con lo que se infringirían las directivas de seguridad. Utilice esta opción cuando la operación de continuación del Motor de base de datos sea más importante que el mantenimiento de una auditoría completa.</p>


#### SHUTDOWN
<p align="justify">Obliga a la instancia de SQL Server a apagarse si SQL Server no puede escribir datos en el destino de auditoría por algún motivo. El inicio de sesión que ejecuta la instrucción CREATE SERVER AUDIT debe tener el permiso SHUTDOWN en SQL Server. El comportamiento de apagado persiste aun cuando el permiso SHUTDOWN se revoque más adelante del inicio de sesión que ejecuta la instrucción. Si el usuario no tiene este permiso, la instrucción producirá un error y la auditoría no se creará. Utilice la opción si un error de auditoría puede poner en peligro la seguridad o la integridad del sistema.</p>


### Ejemplos

```
CREATE SERVER AUDIT nombre_auditoría TO FILE (FILEPATH = 'ruta_directorio', MAXSIZE = 1GB, MAX_FILES = 5);
```

```
CREATE SERVER AUDIT nombre_auditoría TO FILE (FILEPATH = 'ruta_directorio', MAXSIZE = UNLIMITED);
```

> Las opciones MAX_FILES y MAX_ROLLOVER_FILES no se pueden especificar a la vez.

```
CREATE SERVER AUDIT nombre_auditoría TO FILE (FILEPATH = 'ruta_directorio', MAXSIZE = 1GB, MAX_ROLLOVER_FILES = 5);
```

```
CREATE SERVER AUDIT nombre_auditoría TO FILE (FILEPATH = 'ruta_directorio', MAXSIZE = 1GB, MAX_ROLLOVER_FILES = UNLIMITED);
```

```
CREATE SERVER AUDIT nombre_auditoría TO FILE (FILEPATH = 'ruta_directorio') WITH (QUEUE_DELAY = 1000, ON_FAILURE = SHUTDOWN);
```

```
CREATE SERVER AUDIT nombre_auditoría TO FILE (FILEPATH = 'ruta_directorio') WITH (QUEUE_DELAY = 1000, ON_FAILURE = CONTINUE);
```

```
-- Utilizando RESERVE_DISK_SPACE asigna al archivo de auditoría 10MB al habilitar la auditoría
CREATE SERVER AUDIT nombre_auditoría TO FILE (FILEPATH = 'ruta_directorio', MAX_FILES = 2, MAXSIZE = 10MB, RESERVE_DISK_SPACE = ON); 

```

### Habilitar deshabilitar una auditoría

```
ALTER SERVER AUDIT nombre_auditoría WITH (STATE = ON);
ALTER SERVER AUDIT nombre_auditoría WITH (STATE = OFF);
```

### Eliminar una auditoría

```
DROP SERVER AUDIT auditoría;
```

### Consultar en el servidor auditorías habilitadas

```
USE master
SELECT * FROM sys.dm_server_audit_status;
```
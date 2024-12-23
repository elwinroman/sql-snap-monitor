--====================================
--INSERTAR TIPOS DE ACCION TipoAccion
--====================================
IF NOT EXISTS(SELECT 1 FROM dbo.TipoAccion WHERE cNombre = 'sqldefinition')
BEGIN
	INSERT INTO dbo.TipoAccion (cNombre, cDescripcion, lVigente) VALUES ('sqldefinition', 'Búsqueda y recuperación de la definición de un objeto SQL local', 1)
END

IF NOT EXISTS(SELECT 1 FROM dbo.TipoAccion WHERE cNombre = 'usertable')
BEGIN
	INSERT INTO dbo.TipoAccion (cNombre, cDescripcion, lVigente) VALUES ('usertable', 'Búsqueda y recuperación de una tabla de usuario local', 1)
END

IF NOT EXISTS(SELECT 1 FROM dbo.TipoAccion WHERE cNombre = 'forcompare')
BEGIN
	INSERT INTO dbo.TipoAccion (cNombre, cDescripcion, lVigente) VALUES ('forcompare', 'Recuperación de la definición de un objeto SQL de pre-producción mediante comparación', 1)
END

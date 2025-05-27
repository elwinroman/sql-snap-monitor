import { SysObject } from './sysobject'

/**
 * Representa una propiedad extendida asociada a una columna u objeto en la base de datos.
 * Estas propiedades suelen usarse para metadatos personalizados, como descripciones o etiquetas.
 */
export interface ExtendedProperty {
  /** Valor asignado a la propiedad extendida. */
  propertyValue: string

  /** Nombre de la propiedad. Es único en combinación con class, major_id y minor_id dentro del contexto de SQL Server. */
  propertyName: string
}

/**
 * Representa una columna dentro de una tabla de usuario en la base de datos.
 * Incluye información estructural, restricciones y metadatos extendidos asociados.
 */
export interface Column {
  /** Identificador único de la columna dentro del objeto. No necesariamente secuencial. */
  id: number

  /** Nombre de la columna. Es único dentro del objeto que la contiene. */
  name: string

  /** Tipo de dato de la columna, incluyendo información como longitud máxima, precisión y escala. */
  type: string

  /** Indica si la columna permite valores nulos (true: permite NULL, false: no permite NULL). */
  isNullable: boolean

  /** Indica si la columna es una columna de identidad (autonumérica). */
  isIdentity: boolean

  /** Expresión SQL que define el valor por defecto de la columna. Si no existe, es null. */
  defaultDefinition: string | null

  /** Lista de propiedades extendidas asociadas a la columna, como etiquetas o comentarios. */
  extendedProperties: ExtendedProperty[]
}

/**
 * Representa un índice definido sobre una columna de una tabla en la base de datos.
 * Los índices mejoran el rendimiento de las consultas y pueden tener restricciones como unicidad o claves primarias.
 */
export interface Index {
  /** Identificador de la columna a la que pertenece el índice. */
  columnId: number

  /** Nombre del índice. Es único solo dentro del objeto (tabla) al que pertenece. */
  name: string

  /** Descripción del tipo de índice (por ejemplo: CLUSTERED, NONCLUSTERED, COLUMNSTORE). */
  typeDesc: string

  /** Indica si el índice forma parte de una restricción PRIMARY KEY. En índices clúster de almacén de columnas, siempre es false. */
  isPrimaryKey: boolean

  /** Indica si el índice es exclusivo (único). true para índices únicos, false para no únicos. */
  isUnique: boolean
}

/**
 * Representa una clave foránea definida sobre una columna de una tabla.
 * Establece una relación entre la columna actual y una clave candidata en otra tabla.
 */
export interface ForeignKey {
  /** Identificador de la columna que actúa como clave foránea. */
  columnId: number

  /** Nombre del esquema del objeto (tabla) al que se hace referencia. */
  referencedSchema: string

  /** Identificador del objeto (tabla) al que se hace referencia. */
  referencedObjectId: number

  /** Nombre del objeto (tabla) que contiene la clave candidata. */
  referencedObject: string

  /** Identificador de la columna de la tabla referenciada (columna de clave candidata). */
  referencedColumnId: number

  /** Nombre de la columna referenciada que actúa como clave candidata. */
  referencedColumn: string
}

/**
 * Representa un objeto del sistema de tipo 'USER_TABLE' dentro de la base de datos.
 * Este tipo es una versión reducida de `SysObject`, excluyendo la propiedad `definition`
 * ya que las tablas no tienen una definición SQL directa como vistas o procedimientos.
 */
export type UsertableSysObject = Omit<SysObject, 'definition'>

/**
 * Tabla de usuario en la base de datos, con sus propiedades extendidas, columnas, índices y claves foráneas.
 */
export interface Usertable extends UsertableSysObject {
  extendedProperties: ExtendedProperty[]
  columns: Column[]
  indexes: Index[]
  foreignKeys: ForeignKey[]
}

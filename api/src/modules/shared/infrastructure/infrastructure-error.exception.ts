/**
 * Clase base abstracta para representar errores que ocurren
 * en la capa de infraestructura de una arquitectura hexagonal o DDD.
 *
 * @abstract
 */
export abstract class InfrastructureError extends Error {
  /**
   * Identificador técnico del error (puede ser usado para logs, Sentry, API)
   * TODO: Puede ser la dirección del error documentado (https://example.com/exceptions/application-error)
   * Por ahora, es this.constructor.name
   */
  abstract type: string

  /**
   * Título del error, orientado a mostrar al usuario o en UI
   * Ejemplo: "Parámetros inválidos", "Error de conexión a la BD"
   */
  abstract title: string

  /**
   * Descripción detallada del problema, orientado a mostrar al usuario o en UI
   */
  abstract detail: string

  constructor({ message }: { message: string }) {
    super(message)
    this.name = this.constructor.name
  }
}

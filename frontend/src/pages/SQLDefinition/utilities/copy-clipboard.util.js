/**
 * Copia el texto al portapapeles
 * Clipboard solo para SecureContext sino usa un Polyfill
 *
 * @param {Object} param - Parámetros
 * @param {string} param.text - Texto a copiar
 * @returns {void}
 */
export async function copyToClipboard({ text }) {
  if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text)
  else {
    // Polyfill
    const textArea = document.createElement('textarea')
    textArea.value = text

    // textArea no visible
    textArea.style.position = 'absolute'
    textArea.style.left = '-999px'

    document.body.prepend(textArea)
    textArea.select()

    try {
      document.execCommand('copy')
    } catch (error) {
      console.error(error)
    } finally {
      textArea.remove()
    }
  }
}

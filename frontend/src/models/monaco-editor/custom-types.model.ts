import * as monaco from 'monaco-editor'

import { MonacoThemes } from '@/constants'

/**
 * Tipo literal que representa todos los identificadores únicos (`tag`)
 * de los temas disponibles en `MonacoThemes`.
 *
 * Ejemplos de valores válidos:
 * `'dracula' | 'amy' | 'githubdark' | 'vibrantink' | ...`
 */
export type IMonacoTheme = keyof typeof MonacoThemes

/**
 * Tipo para la propiedad `fontSize` del editor Monaco,
 * garantiza que no sea `undefined`.
 */
export type IFontSize = NonNullable<monaco.editor.IEditorOptions['fontSize']>

/**
 * Tipo para la propiedad `renderWhitespace` del editor Monaco,
 * garantiza que no sea `undefined`.
 */
export type IRenderWhitespace = NonNullable<monaco.editor.IEditorOptions['renderWhitespace']>

/**
 * Tipo para la propiedad `renderSideBySide` del editor Monaco Diff Editor,
 * garantiza que no sea `undefined`.
 */
export type IRenderSideBySide = NonNullable<monaco.editor.IDiffEditorBaseOptions['renderSideBySide']>

declare module '*.theme.json' {
  import type * as monaco from 'monaco-editor'
  const value: monaco.editor.IStandaloneThemeData
  export default value
}

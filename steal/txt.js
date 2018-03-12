// steal js 'txt' plugin using translate hook
// triggered when a module imports/requires a file with !txt flag at the end of the module name.
// The plugin is a module exporting hook functions, in this case the translate hook.
// The loaded file and path info is passed into the translate hook as a 'load' object.
// The return value should be a string representation of another js module.
// The evaluation of that module is what the triggering import/require resolves to.
// In this case we just resolve with a default export of the file's plain text source.
export const translate = function (load) {
  const escapeTicks = load.source.replace(/`/g, '\\`')
  return 'export default `' + escapeTicks + '`'
}

import marked from "marked"

export const translate = function (load) {
  const html = marked(load.source)
  const escapeTicks = html.replace(/`/g, '\\`')
  return 'export default `' + escapeTicks + '`'
}

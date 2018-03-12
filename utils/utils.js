export const clonePOJO = obj => {
  const pojo = obj.serialize && obj.serialize() || obj
  return JSON.parse(JSON.stringify(pojo))
}

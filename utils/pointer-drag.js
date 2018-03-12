const defaultSettings = {
  drag: null,
  dragEnd: null,
  data: null,
  minX: 0,
  minY: 0,
  threshold: 0,
  afterThreshold: null,
  x: null,
  y: null
}

const oncePerFrame = (callOnFrame, context) => {
  let frameReq = null
  return function () {
    cancelAnimationFrame(frameReq)
    frameReq = requestAnimationFrame(() => callOnFrame.apply(context, arguments))
  }
}

export const dragSettings = Object.seal(Object.assign({}, defaultSettings))
export const pointerLastPos = Object.seal({ x: -1, y: -1 })
export const pointerCurrentPos = Object.seal({ x: -1, y: -1 })

const checkThreshold = function () {
  const threshold = dragSettings.threshold
  if (!threshold) {
    return true
  }

  var x = dragSettings.x
  if (!x && x !== 0) {
    x = dragSettings.x = pointerCurrentPos.x
  }
  var y = dragSettings.y
  if (!y && y !== 0) {
    y = dragSettings.y = pointerCurrentPos.y
  }

  if (Math.max(Math.abs(pointerCurrentPos.x - x), Math.abs(pointerCurrentPos.y - y)) > threshold) {
    dragSettings.threshold = 0
    dragSettings.afterThreshold && dragSettings.afterThreshold(dragSettings.data)
    return true
  }
  return false
}

document.addEventListener('pointerup', ev => {
  const { dragEnd, data } = dragSettings
  dragEnd && checkThreshold() && dragEnd(data)
  Object.assign(dragSettings, defaultSettings)
})

document.addEventListener('pointermove', oncePerFrame(ev => {
  const { drag, data, minX, minY } = dragSettings
  pointerLastPos.x = pointerCurrentPos.x
  pointerLastPos.y = pointerCurrentPos.y
  pointerCurrentPos.x = Math.max(ev.pageX, minX)
  pointerCurrentPos.y = Math.max(ev.pageY, minY)
  drag && ev.preventDefault()
  drag && checkThreshold() && drag(data)
}))

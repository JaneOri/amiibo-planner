import can from 'can'
import view from './wh-lt.stache!txt'
import './wh-lt.less!steal-less'
import { pointerLastPos, pointerCurrentPos, dragSettings } from 'utils/pointer-drag'

const pxPropDef = function (defaultValue, style) {
  return {
    type: "number",
    default: defaultValue,
    // using getter instead of setter because once connectedCallback
    // fires and sets element, get will re-compute and apply el.style
    get (lastSewVal) {
      const el = this.element
      if (el) {
        el.style[style] = lastSewVal + "px"
      }
      return lastSewVal
    }
  }
}

export const ViewModel = can.DefineMap.extend({
  element: "*",
  connectedCallback (el) {
    this.element = el
  },

  title: { type: "string", default: "Drag Me" },
  w: pxPropDef(500, 'width'),
  h: pxPropDef(500, 'height'),
  l: pxPropDef(50, 'left'),
  t: pxPropDef(50, 'top'),

  minw: { type: 'number', default: 40 },
  minh: { type: 'number', default: 40 },
  minl: { type: 'number', default: 20 },
  mint: { type: 'number', default: 20 },

  adjust (prop, axis, scalar = 1) {
    const min = this['min' + prop]
    const dif = pointerCurrentPos[axis] - pointerLastPos[axis]
    this[prop] = Math.max(this[prop] + dif * scalar, min)
  },

  move () {
    this.adjust('l', 'x')
    this.adjust('t', 'y')
  },

  topLeftResize () {
    this.topResize()
    this.leftResize()
  },

  topResize () {
    this.adjust('h', 'y', -1)
    this.adjust('t', 'y')
  },

  topRightResize () {
    this.topResize()
    this.rightResize()
  },

  leftResize () {
    this.adjust('w', 'x', -1)
    this.adjust('l', 'x')
  },

  rightResize () {
    this.adjust('w', 'x')
  },

  bottomLeftResize () {
    this.bottomResize()
    this.leftResize()
  },

  bottomResize () {
    this.adjust('h', 'y')
  },

  bottomRightResize () {
    this.bottomResize()
    this.rightResize()
  },

  dragInit (ev, fn) {
    if (ev && ev.button !== 0) { // if event, Left only
      return
    }
    ev && ev.preventDefault()
    Object.assign(dragSettings, { drag: fn, minX: this.minl, minY: this.mint })
  },

  // for testing/debugging, can call these like `pointerLastPos({x, y})` to set their coords
  pointerLastPos: Object.assign.bind(null, pointerLastPos),
  pointerCurrentPos: Object.assign.bind(null, pointerCurrentPos)
})

export default can.Component.extend({
  tag: 'wh-lt',
  ViewModel,
  view
})

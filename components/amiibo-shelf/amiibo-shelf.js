import can from 'can'
import view from './amiibo-shelf.stache!txt'
import './amiibo-shelf.less!steal-less'
import { pointerLastPos, pointerCurrentPos, dragSettings } from 'utils/pointer-drag'

export const ViewModel = can.DefineMap.extend({
  shelf: "*",
  amiibos: "*",
  amiibosById: {
    get () {
      const amiibosById = new can.DefineMap({})
      this.amiibos && this.amiibos.forEach(amiibo => {
        amiibosById.assign({ [amiibo.id]: amiibo })
      })
      return amiibosById
    }
  },

  gridSelectors (index) {
    const columns = this.shelf.x
    const rows = this.shelf.y
    const colIndex = index % columns
    const rowIndex = ~~(index / columns)

    const classes = {
      'first-column': colIndex === 0,
      'last-column': colIndex === (columns - 1),
      'first-row': rowIndex === 0,
      'last-row': rowIndex === (rows - 1),
      'even-row': ((rowIndex + 1) % 2) === 0, // css even/odd is based on count, not index
      'odd-row': ((rowIndex + 1) % 2) === 1, // css even/odd is based on count, not index
      ['col-' + (colIndex + 1)]: true,
      ['row-' + (rowIndex + 1)]: true
    }

    return Object.keys(classes).filter(k => !!classes[k]).join(" ")
  },

  slots: {
    value (prop) {
      const slots = this.shelf.slots
      // Load save data into shelf slots once
      // wait for amiibos list to be passed in
      prop.listenTo(this, 'amiibos', () => {
        // and read the save data into the slots using the amiibos list info
        slots.forEach((amiiboId, index) => {
          if (amiiboId && typeof amiiboId === 'string') {
            slots.assign({ [index]: this.amiibosById[amiiboId] || null })
          }
        })
        // and stop listening to changes (amiibos list should be static anyway)
        prop.stopListening(this, 'amiibos')
      })

      prop.resolve(slots)
    }
  },
  indexToPos (index) {
    const sizeX = this.shelf.x
    return {
      x: index % sizeX,
      y: ~~(index / sizeX)
    }
  },
  posToIndex (x, y) {
    return y * this.shelf.x + x
  },

  selectFn: "*",
  cancelFn: "*",
  selectedIndex: { type: "number", default: -1 },
  selectingAmiiboPromise: "*",
  setAmiibo (index) {
    this.selectedIndex = index
    this.selectingAmiiboPromise = new Promise((resolve, reject) => {
      this.cancelFn = reject
      this.selectFn = resolve
    }).then(selected => {
      if ('FFFFFFFF-FFFFFFFF' === selected.id) {
        selected = null
      }
      this.displayAmiibo(index, selected)
      this.cancelFn = null
      this.selectFn = null
      this.selectedIndex = -1
      return selected
    }).catch(err => {
      err && console.log(err)
      this.cancelFn = null
      this.selectFn = null
      this.selectedIndex = -1
    })
  },

  displayAmiibo (index, amiibo) {
    this.slots.assign({ [index]: amiibo || null })
  },

  drag (dragData) {
    if (!dragData || !dragData.amiibo) {
      return
    }
  },

  afterThreshold (dragData) {
    this.switchIndexA = dragData.index
  },

  switchIndexA: { type: "number", default: null },
  switchIndexB: { type: "number", default: null },
  switchClass (index) {
    let className = ''
    if (this.switchIndexA === index) {
      className = 'switch-a'
    } else if (this.switchIndexB === index) {
      className = 'switch-b'
    }
    return className
  },

  previewSwap (amiibo, index) {
    const dragData = dragSettings.data || {}
    if (dragData.amiibo) {
      this.switchIndexB = index
      // give shared reference to this instance's dragEnd.
      // Source's dragEnd will call this if we are separate instance
      dragData.destinationDragEnd = this.dragEnd.bind(this)
    }
  },

  unviewSwap (index) {
    const dragData = dragSettings.data || {}
    if (index === this.switchIndexB) {
      this.switchIndexB = null
      dragData.destinationDragEnd = null
    }
  },

  dragEnd (dragData) {
    if (!dragData || !dragData.amiibo) {
      return
    }
    if (this.switchIndexB !== null) {
      dragData.displayAmiibo(dragData.index, this.slots[this.switchIndexB])
      this.displayAmiibo(this.switchIndexB, dragData.amiibo)
    } else if (dragData.destinationDragEnd) {
      // actually ended in another shelf instance
      dragData.destinationDragEnd(dragData)
    }

    this.switchIndexA = null
    this.switchIndexB = null
  },

  dragInit (ev, amiibo, displayAmiibo, index) {
    if (ev && ev.button !== 0) { // if event, Left only
      return
    }
    ev && ev.preventDefault()
    if (!amiibo) {
      return
    }
    Object.assign(dragSettings, {
      drag: this.drag.bind(this),
      dragEnd: this.dragEnd.bind(this),
      data: { amiibo, displayAmiibo, index, destinationDragEnd: null },
      minX: 20,
      minY: 80,
      threshold: 20,
      afterThreshold: this.afterThreshold.bind(this)
    })
  }
})

export default can.Component.extend({
  tag: 'amiibo-shelf',
  ViewModel,
  view
})

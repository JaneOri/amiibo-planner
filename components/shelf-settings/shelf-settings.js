import can from 'can'
import view from './shelf-settings.stache!txt'
import './shelf-settings.less!steal-less'
import Shelf from "models/shelf"
import presets from './shelf-presets'

export const ViewModel = can.DefineMap.extend({
  shelfData: "*",
  amiibosById: "*",

  "-": { type: "string", default: "" }, // so stache {{---}} will remove whitespace

  formData: {
    get () {
      this.saveFn // bind to changes of saveFn so formData is rebuilt
      const shelfData = this.shelfData && this.shelfData.serialize()
      const formData = shelfData ? shelfData : presets["All Black"]()
      return new Shelf(formData)
    }
  },

  setValue (field, val) {
    const isNumber = field.type === 'number'
    this.formData[field.prop] = isNumber ? parseInt(val, 10) : val
  },

  fields: {
    default: [
      { type: 'number', label: 'Columns', placeholder: 'Number of slots on a row', prop: 'x' },
      { type: 'number', label: 'Rows', placeholder: 'Number of rows', prop: 'y' },
      { type: 'number', label: 'Horizontal Gap (px)', placeholder: 'Space between slots', prop: 'colGap' },
      { type: 'number', label: 'Vertical Gap (px)', placeholder: 'Space between rows', prop: 'rowGap' },
      { type: 'number', label: 'Left/Right Slot Padding (px)', placeholder: 'Space around the Amiibo base in the slot', prop: 'colPad' },
      { type: 'number', label: 'Bottom Slot Padding (px)', placeholder: 'Space below the Amiibo base in the slot', prop: 'rowPad' },
      { type: 'number', label: 'Left/Right Trim (px)', placeholder: 'Width of the outer left and right border', prop: 'colTrim' },
      { type: 'number', label: 'Top/Bottom Trim (px)', placeholder: 'Height of the outer top and bottom border', prop: 'rowTrim' },
      { type: 'color', label: 'Gap Color', placeholder: '#000000', prop: 'gapColor' },
      { type: 'color', label: 'Slot Pad Color', placeholder: 'transparent', prop: 'padColor' },
      { type: 'color', label: 'Slot BG Color', placeholder: '#FFFFFF', prop: 'slotColor' },
      { type: 'color', label: 'Trim Color', placeholder: '#000000', prop: 'trimColor' }
    ]
  },

  tab: {
    default: "presets"
  },

  saveFn: "*",
  save () {
    this.saveFn(this.formData)
  },

  cancelFn: "*",
  cancel () {
    this.cancelFn()
  }
})

export default can.Component.extend({
  tag: 'shelf-settings',
  ViewModel,
  view
})

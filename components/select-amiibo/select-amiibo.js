import can from 'can'
import view from './select-amiibo.stache!txt'
import './select-amiibo.less!steal-less'
import Amiibo from 'models/amiibo'
import $ from 'jquery'

export const ViewModel = can.DefineMap.extend({
  selectFn: "*",
  cancelFn: "*",

  filter: "string",
  clearFilter () {
    this.filter = ''
  },

  amiibos: {
    value (property) {
      Amiibo.find({}).then(amiibos => {
        amiibos.unshift(Amiibo.getPlaceholder())
        amiibos.unshift(Amiibo.getEmpty())
        property.resolve(amiibos)
      })
    }
  },

  adv: { type: 'boolean', default: false },
  toggleAdvanced () {
    this.adv = !this.adv
  },

  empty: { type: 'boolean', default: true },
  figure: { type: 'boolean', default: true },
  yarn: { type: 'boolean', default: true },
  card: { type: 'boolean', default: false },
  typeBinaryFilter: {
    get () {
      var filter = 0
      if (this.empty ) filter |= 0b0001
      if (this.figure) filter |= 0b0010
      if (this.yarn  ) filter |= 0b0100
      if (this.card  ) filter |= 0b1000
      return filter
    }
  },

  filteredAmiibos: {
    get () {
      var amiibos = this.amiibos
      if (!amiibos) {
        return amiibos
      }

      amiibos = amiibos.filter(amiibo => {
        return !!(amiibo.typeBinary & this.typeBinaryFilter)
      })

      const filter = (this.filter || '').toLowerCase()
      if (filter) {
        let terms = filter.split(' ')

        terms.forEach(term => {
          amiibos = amiibos.filter(amiibo => {
            return amiibo.searchKey.includes(term)
          })
        })
      }

      return amiibos
    }
  }
})

export default can.Component.extend({
  tag: 'select-amiibo',
  ViewModel,
  view
})

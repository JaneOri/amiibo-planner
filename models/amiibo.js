import can from 'can'
import $ from 'jquery'
import getScaleInfo from './amiibo-image-scale-info'

// Thanks to AmiiboAPI for the data and images!
// https://github.com/N3evin/AmiiboAPI

const Amiibo = can.DefineMap.extend('Amiibo', {
  getEmpty () {
    return new Amiibo({
      head: 'FFFFFFFF',
      tail: 'FFFFFFFF',
      amiiboSeries: '-none-',
      character: 'None',
      gameSeries: '-none-',
      type: 'Empty',
      image: '',
      name: 'None',
      release: {
        au: '1987-04-07',
        eu: '1987-04-07',
        jp: '1987-04-07',
        na: '1987-04-07'
      }
    })
  },
  getPlaceholder () {
    return new Amiibo({
      head: '00000000',
      tail: '00000000',
      amiiboSeries: '-any-',
      character: 'Placeholder',
      gameSeries: '-any-',
      type: 'Empty',
      image: '/icons/placeholder.png',
      name: 'Placeholder',
      release: {
        au: '1987-04-07',
        eu: '1987-04-07',
        jp: '1987-04-07',
        na: '1987-04-07'
      }
    })
  },
  find (params) {
    const url = 'https://amiiboapi.herokuapp.com/api/amiibo/'
    return Promise.resolve($.getJSON(url, params))
      .then(response => new Amiibo.List(response.amiibo))
  }
}, {
  head: 'string',
  tail: 'string',
  get id () {
    return this.head + '-' + this.tail
  },
  amiiboSeries: 'string',
  character: 'string',
  gameSeries: 'string',
  type: 'string',
  get typeBinary () {
    switch (this.type) {
      case 'Empty' : return 0b0001
      case 'Figure': return 0b0010
      case 'Yarn'  : return 0b0100
      case 'Card'  : return 0b1000
    }
    return 0
  },
  image: 'string',
  imageScale: {
    type: "number",
    get (lastSet) {
      if (lastSet) {
        return lastSet
      }
      return getScaleInfo(this.id) || { scale: 100, left: 50 }
    }
  },
  name: 'string',
  release: '*',
  get searchKey () {
    return (this.amiiboSeries + ' | ' + this.name).toLowerCase()
  }
})

Amiibo.List = can.DefineList.extend('AmiiboList', {
  '#': Amiibo
})

export default Amiibo

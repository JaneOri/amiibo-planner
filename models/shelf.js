import can from "can"

const freeze = arr => Object.freeze(arr.map(Object.freeze))
const getDate = () => (new Date()).toISOString().replace(/[^\d-].*$/, '')

const Shelf = can.DefineMap.extend("Shelf", {
  TYPES: freeze([
    { key: "grid", name: "Grid" },
    { key: "theater", name: "Theater" }, // even rows are offset, shorter
    { key: "stadium", name: "Stadium" }, // odd rows are offset, shorter
    { key: "theater-alt", name: "Theater Alt" }, // short rows have fake half slots to be flush with the trim
    { key: "stadium-alt", name: "Stadium Alt" }, // short rows have fake half slots to be flush with the trim
  ])
},
{
  "*": {
    serialize: true
  },
  title: { type: "string", default: getDate() },
  w: { type: "number", default: 400 },
  h: { type: "number", default: 400 },
  l: { type: "number", default: 100 },
  t: { type: "number", default: 100 },
  x: { type: "number", default: 5 }, // slots across (columns)
  y: { type: "number", default: 5 }, // number of rows
  // slots is a little bit smelly, it's an array of 3 different things: null, amiibo id (string), Amiibo instance
  // in save data (so also when it's first loaded), it's nulls or amiibo id strings
  // once it's displayed in amiibo-shelf, the slots containing amiibo ids are replaced with the corresponding instance
  slots: {
    get (lastSet) {
      const data = lastSet || Array(this.x * this.y).fill(null)
      return new can.DefineList(data)
    },
    serialize (slots) {
      return slots.reduce((acc, slotVal) => {
        if (!slotVal) {
          acc.push(null)
        } else if (typeof slotVal === "string") {
          acc.push(slotVal)
        } else {
          acc.push((slotVal && slotVal.id) || null)
        }
        return acc
      }, [])
    }
  },
  type: {
    value: function (prop) {
      const defaultVal = "grid"

      prop.resolveToValid = prop.resolveToValid || (newVal => {
        const isValid = Shelf.TYPES.some(type => newVal === type.key)
        prop.lastResolved = prop.resolve( isValid ? newVal : prop.lastResolved || defaultVal )
      })

      prop.listenTo( prop.lastSet, prop.resolveToValid )
      prop.resolveToValid( prop.lastSet.get() )
    }
  },
  colGap: { type: "number", default: 10 },
  rowGap: { type: "number", default: 10 },
  colPad: { type: "number", default: 0 },
  rowPad: { type: "number", default: 0 },
  colTrim: { type: "number", default: 5 },
  rowTrim: { type: "number", default: 5 },
  gapColor: { type: "string", default: "#AAAAEE" },
  padColor: { type: "string", default: "transparent" },
  slotColor: { type: "string", default: "#FFFFFF" },
  trimColor: { type: "string", default: "#000000" }
})

Shelf.List = can.DefineList.extend("ShelfList", {
  "#": Shelf
})

export default Shelf

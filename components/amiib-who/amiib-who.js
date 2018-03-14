import can from 'can'
import view from './amiib-who.stache!txt'
import './amiib-who.less!steal-less'
import normalizedEventKey from 'utils/normalized-event-key.js'

export const ViewModel = can.DefineMap.extend({
  show: { type: "boolean", default: false },

  amiibos: "*",
  amiibosNoCards: {
    get () {
      const amiibos = this.amiibos
      if (!amiibos || !amiibos.length) {
        return null
      }
      return amiibos.filter(a => a.typeBinary & 0b0110) // 0b0110 = yarn or figure
    }
  },

  correct: { type: "number", default: 0 },
  incorrect: { type: "number", default: 0 },
  count: {
    get () {
      return this.correct + this.incorrect
    }
  },

  randomAmiibo: {
    get () {
      this.count // bind state to the count so if count changes so does the randomAmiibo
      const amiibos = this.amiibosNoCards
      if (!amiibos || !amiibos.length) {
        return null
      }
      const randIndex = ~~(Math.random() * amiibos.length)
      return amiibos[randIndex]
    }
  },

  deg (index, length) {
    return 360 / length * index
  },

  seemsRandomButIsBasedOnIndex (x) {
    return ~~(Math.sin(((x + 13) * x) % 300) * 100) % 151
  },

  width (index, baseSize) {
    const offset = this.seemsRandomButIsBasedOnIndex(index)
    return offset + baseSize
  },

  splashColor1: {
    default () {
      return Array(180).fill(null)
    }
  },

  splashColor2: {
    default () {
      return Array(55).fill(null)
    }
  },

  filterStringCharacters (str) {
    return str.toLowerCase().replace(/[^a-z0-9- ]/g, "")
  },
  reveal: { type: "boolean", value: false },
  userEntry: { type: "string", default: "" },
  entryState: { type: "string", default: "playing" },
  correctFlow () {
    this.entryState = "correct"
    return new Promise(resolve => setTimeout(resolve, 5000))
      .then(() => {
        this.reveal = false
        this.entryState = "resetting"
        this.userEntry = ""
        return new Promise(resolve => setTimeout(resolve, 1000))
      })
      .then(() => {
        this.correct++
      })
  },
  incorrectFlow () {
    this.entryState = "incorrect"
    return new Promise(resolve => setTimeout(resolve, 5000))
      .then(() => {
        this.reveal = false
        this.entryState = "resetting"
        this.userEntry = ""
        return new Promise(resolve => setTimeout(resolve, 1000))
      })
      .then(() => {
        this.incorrect++
      })
  },
  revealAndCheck () {
    this.reveal = true
    const amiiboKey = this.filterStringCharacters(this.randomAmiibo.character)
    const userKey = this.filterStringCharacters(this.userEntry)
    const playPromise = (amiiboKey === userKey) ? this.correctFlow() : this.incorrectFlow()
    playPromise.then(() => {
      this.entryState = "playing"
    })
  },
  handleKeyPress (key) {
    if (this.entryState !== "playing") {
      return
    }
    const userEntry = this.userEntry
    if (key.length === 1) {
      key = key.toLowerCase().replace(/[^a-z0-9- ]/, "")
      this.userEntry += key
    } else if (key === "Backspace") {
      this.userEntry = userEntry.substr(0, userEntry.length - 1)
    } else if (key === "Enter") {
      this.revealAndCheck()
    }
  }
})

const kk = " ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a"
let buffer = ""

export default can.Component.extend({
  tag: 'amiib-who',
  ViewModel,
  view,
  events: {
    "{document} keydown" (doc, ev) {
      const vm = this.viewModel
      const key = normalizedEventKey(ev)
      
      if (!vm.show) {
        buffer += " " + key
        buffer = buffer.substr(-kk.length)
        if (buffer === kk) {
          vm.show = true
        }
      } else {
        ev.preventDefault()
        vm.handleKeyPress(key)
      }
    }
  }
})

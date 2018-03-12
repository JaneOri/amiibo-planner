const getDate = () => (new Date()).toISOString().replace(/[^\d-].*$/, '')

const presets = {
  "All Black" () {
    return {
      type: "grid",
      colGap: 10,
      rowGap: 10,
      colPad: 0,
      rowPad: 0,
      colTrim: 5,
      rowTrim: 5,
      gapColor: "#AAAAEE",
      padColor: "transparent",
      slotColor: "#FFFFFF",
      trimColor: "#000000"
    }
  },

  "Black and White" () {
    return {
      type: "grid",
      colGap: 10,
      rowGap: 10,
      colPad: 0,
      rowPad: 0,
      colTrim: 5,
      rowTrim: 5,
      gapColor: "#AAAAEE",
      padColor: "transparent",
      slotColor: "#FFFFFF",
      trimColor: "#000000"
    }
  },

  "Brick" () {
    return {
      type: "theater-alt",
      colGap: 10,
      rowGap: 10,
      colPad: 0,
      rowPad: 0,
      colTrim: 5,
      rowTrim: 5,
      gapColor: "#AAAAEE",
      padColor: "transparent",
      slotColor: "#FFFFFF",
      trimColor: "#000000"
    }
  }
}

export default presets

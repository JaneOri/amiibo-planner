import can from "can"
import Shelf from "./shelf"

const GlobalSaveData = can.DefineMap.extend("GlobalSaveData", {
  allPlans: {
    default () {
      var plan, saveIndex = -1
      const allPlans = new Plan.List([])

      do {
        plan = Plan.load("amiiboPlanner" + (++saveIndex))
        plan && allPlans.push(plan)
      } while (plan)

      return allPlans
    }
  },

  currentPlan: {
    value (prop) {
      const allSaves = this.allPlans
      // default to the last save in the list
      prop.resolve(allSaves.length ? allSaves[ allSaves.length - 1 ] : null)
      // if a new save is added, switch to that
      prop.listenTo(allSaves, "length", () => { prop.resolve(allSaves[ allSaves.length - 1 ] : null) })
      // if a save is specifically set, allow it
      prop.listenTo(prop.lastSet, prop.resolve)
    }
  }
})

const Plan = can.DefineMap.extend("Plan", {
  global: new GlobalSaveData({}),

  load (saveName, jsonString) {
    let data = jsonString || localStorage.getItem(saveName)
    if (!data) {
      return
    }
    try { data = JSON.parse(data) } catch (e) { data = e }
    if (data.shelves && data.shelves.length) {
      // tie the plan to its localStorage item:
      data.storageItem = saveName
      return new Plan(data)
    } else {
      console.log("Bad data:", saveName, data)
    }
  }
},
{
  storageItem: { // amiiboPlanner0, etc - the localStorage item name for this plan
    type: "string",
    default: "",
    serialize: false
  },
  shelves: Shelf.List,

  reload () {
    const storageItem = this.storageItem
    const planFromStorage = storageItem && Plan.load(storageItem)
    if (planFromStorage) {
      this.shelves.replace(planFromStorage.shelves)
      return true
    }
    return false
  },

  save () {
    let storageItem = this.storageItem
    if (!storageItem) {
      let newIndex = 0
      let data = localStorage.getItem("amiiboPlanner" + newIndex)
      while (data) {
        data = localStorage.getItem("amiiboPlanner" + (++newIndex))
      }
      storageItem = "amiiboPlanner" + newIndex
      this.storageItem = storageItem
    }
    const currentData = JSON.stringify(this.serialize())
    localStorage.setItem(storageItem, currentData)
  }
})

Plan.List = can.DefineList.extend("PlanList", {
  "#": Plan
})

window.Plan = Plan

export default Plan

import can from "can"
import view from "./nav-menu.stache!txt"
import "./nav-menu.less!steal-less"
import readme from "README.md!md"
import Plan from "models/plan"

// show loading screen
//   Amiibo status
//   data fetch if that's happening
// if starting with id in #url, fetch that shared remote data
// else if numberSaves > 0, load last in list
// else show new shelf-settings menu

// show new/edit form if:
// no saveData -> export a functin that creates save data
// 

export const ViewModel = can.DefineMap.extend({
  amiibos: "*", // list source is in select-amiibo currently. TODO: move source here?

  amiibosLoading: {
    type: "boolean",
    get () {
      const amiibos = this.amiibos
      if (!amiibos || !amiibos.length) {
        return true
      }
      return false
    }
  },

  sharedDataLoading: {
    type: "boolean",
    get () {
      return false
    }
  },

  showLoadingInfo: {
    type: "boolean",
    get () {
      return this.amiibosLoading || this.sharedDataLoading
    }
  },

  aboutPageHTML: {
    default: readme
  },

  createNewPlan (shelf) {
    const newPlan = new Plan({
      shelves: [shelf]
    })
    Plan.global.allPlans.push(newPlan)
  },

  newPlanSaveFn: {
    get () {
      if (!Plan.global.currentPlan) {
        return this.createNewPlan
      }
      return null
    }
  },

  abandondCurrentAndCreateNew () {
    const currentPlan = Plan.global.currentPlan
    Plan.global.currentPlan = null

    if (currentPlan.storageItem) {
      // throw out current state of shelves and load them back up from storage
      currentPlan.reload()
    } else {
      // no saved data is tied, throw it away
      const allPlans = Plan.global.allPlans
      const index = allPlans.indexOf(currentPlan)
      (index >= 0) && allPlans.splice(index, 1)
    }
  },

  savePlan () {
    Plan.global.currentPlan.save()
  },

  addShelf: { type: "boolean", default: false },
  addShelfToCurrent (shelf) {
    Plan.global.currentPlan.shelves.push(shelf)
    this.addShelf = false
  },
  newShelfSaveFn: {
    get () {
      if (this.addShelf) {
        return this.addShelfToCurrent
      }
      return null
    }
  },
  cancelAddShelf () {
    this.addShelf = false
  },
  newShelfCancelFn: {
    get () {
      if (this.addShelf) {
        return this.cancelAddShelf
      }
      return null
    }
  },

  jsonSaveData: "string",
  viewJSON () {
    const data = Plan.global.currentPlan.serialize()
    const jsonString = JSON.stringify(data, null, 2)
    this.jsonSaveData = jsonString
  }
})

export default can.Component.extend({
  tag: "nav-menu",
  ViewModel,
  view
})

import can from 'can'
import view from './amiibo-planner.stache!txt'
import './amiibo-planner.less!steal-less'
import 'components/nav-menu/'
import 'components/wh-lt/'
import 'components/amiibo-shelf/'
import 'components/select-amiibo/'
import 'components/shelf-settings/'
import 'components/amiib-who/'
import Plan from 'models/plan'

export const ViewModel = can.DefineMap.extend({
  amiibos: "*",

  currentPlan: {
    get () {
      return Plan.global.currentPlan
    }
  },

  // from nav-menu for shelf-settings
  newPlanSaveFn: "*",
  newShelfSaveFn: "*",
  newShelfCancelFn: "*",

  shelfSettingsSaveFn: {
    get () {
      const newPlanSaveFn = this.newPlanSaveFn
      const newShelfSaveFn = this.newShelfSaveFn

      return newPlanSaveFn || newShelfSaveFn
    }
  },

  showShelfSettings: {
    get () {
      return !!this.shelfSettingsSaveFn
    }
  },

  shelfSettingsCancelFn: {
    get () {
      const newShelfCancelFn = this.newShelfCancelFn

      return newShelfCancelFn
    }
  },

  // for communications between amiibo-shelf and select-amiibo:
  selectFn: "*",
  cancelFn: "*",

  minw (shelf) {
    return shelf.x * 10 + shelf.colGap * (shelf.x - 1)
  },
  minh (shelf) {
    return shelf.y * 10 + shelf.rowGap * (shelf.y - 1)
  }
})

export default can.Component.extend({
  tag: 'amiibo-planner',
  ViewModel,
  view
})

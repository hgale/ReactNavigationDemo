/**
 * Screen push reducer
 */

import t from '../actions/actionTypes'

import { miscColors } from '../colors'

const defaultState = {
  screens: [{
    // name: 1,
    colors: [miscColors[0], miscColors[1], miscColors[2]]
  }]
}

const pushReducer = (state = defaultState, action) => {
  switch (action.type) {

    case t.UPDATE_SCREEN:
      {
        // 1) Pull out the list of existing screens
        let screens = state.screens
        // 2) Verify screen is in range
        let screenNumber = action.screen
        if (!screenNumber || screenNumber >= screens.length || screenNumber < 0) {
          console.log('Invalid screen number');
          return
        }
        // 3) Pull object from screens array
        let screen = state.screens[action.screen]
        // 4) Generate new values for it
        // TODO: write function to assign a new value
        return Object.assign({}, state, {
          screens: screens
        })
      }
    case t.PUSH_SCREEN:
      {
        // 1) Pull out the list of existing screens
        let screens = state.screens
        // Generate a new screen
        // screate new values for screen, i.e new colors or something like that
        // TODO: write new colors generating function
        // name = screens.length+1
        // let randomValue = (0, miscColors.length) => (Math.random() * (maxVal - minVal) + minVal)

        let randomColors = []
        let maxVal = miscColors.length-1
        let minVal = 0
        Array(3).fill().map((item, index) => {
          let randomValue = Math.round((Math.random() * (maxVal - minVal) + minVal))
          randomColors.push(miscColors[randomValue])
        })

        let screen = {
          // name: name,
          colors: randomColors
        }
        screens.push(screen)
        console.log('After push screens is ', screens);
        return Object.assign({}, state, {
          screens: screens
        })
      }
    default:
      return state
  }
}

export default pushReducer

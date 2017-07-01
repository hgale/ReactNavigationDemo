/**
 * Screen actions
 */
import t from './actionTypes'

/**
 * Update screen with new data
 */
export function updateScreen (screen) {
  if (!screen) return
  return (dispatch) => {
    dispatch({
      type: t.UPDATE_SCREEN,
      screen
    })
  }
}

/**
 * Push a new screen
 */
export function pushScreen () {
  return (dispatch) => {
    dispatch({
      type: t.PUSH_SCREEN
    })
  }
}

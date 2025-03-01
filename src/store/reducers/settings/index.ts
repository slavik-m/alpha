import { SET_SETTINGS, GET_SETTINGS } from './types'
import generateTheme from 'src/config/theme'
import * as userSettings from 'src/utils/userSettings'

const userLocalSettings = userSettings.get()
const theme = generateTheme(userLocalSettings.themeType)

const initialState = {
  theme,
  ...userLocalSettings,
}

export default (
  state = initialState,
  { type, payload }
): typeof initialState => {
  switch (type) {
    case SET_SETTINGS: {
      const newSettings = userSettings.set(payload)
      const shouldUpdateTheme = !!payload.themeType
      state = {
        ...newSettings,
        theme: shouldUpdateTheme
          ? generateTheme(newSettings.themeType)
          : state.theme,
      }
      return state
    }

    case GET_SETTINGS:
      return { theme: state.theme, ...userSettings.get() }

    default:
      return state
  }
}

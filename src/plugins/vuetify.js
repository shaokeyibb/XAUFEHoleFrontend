// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import {createVuetify} from 'vuetify'
import {background, error, primary, secondary} from "../themes/color.js";

const xaufeHoleLight = {
    dark: false,
    colors: {
        background: background,
        surface: '#FFFFFF',
        primary: primary,
        secondary: secondary,
        error: error,
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
    }
}

export default createVuetify(
    // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
    {
        theme: {
            defaultTheme: 'xaufeHoleLight',
            themes: {
                xaufeHoleLight,
            }
        }
    }
)

import { App } from 'vue'
import TButton from './Button.vue'

TButton.install = (app: App) => app.component(TButton.name, TButton)

export default TButton

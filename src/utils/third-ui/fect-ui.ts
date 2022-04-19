import { Drawer, Toast } from '@fect-ui/vue'

import '@fect-ui/vue/lib/main.css'
import '@fect-ui/themes'
const UI = [Drawer, Toast]

export const FectUIRegister = (instance: any) => UI.map((_) => instance.use(_))

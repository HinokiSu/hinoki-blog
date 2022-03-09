import { GridGroup, Grid, User, Badge, Link, Avatar, Card, Image, Tag, Drawer } from '@fect-ui/vue'

Image.name = 'feImg'

import '@fect-ui/vue/lib/main.css'
import '@fect-ui/themes'
const UI = [GridGroup, Grid, User, Badge, Link, Avatar, Card, Image, Tag, Drawer]

export const FectUIRegister = (instance: any) => UI.map((_) => instance.use(_))

import { GridGroup, Grid, User, Badge, Link, Avatar, Card, Image, Tag } from '@fect-ui/vue'

Image.name = 'feImg'

import '@fect-ui/vue/lib/main.css'

const UI = [GridGroup, Grid, User, Badge, Link, Avatar, Card, Image, Tag]

export const FectUIRegister = (instance: any) => UI.map((_) => instance.use(_))

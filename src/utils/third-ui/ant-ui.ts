import { Comment, Avatar, Modal, Form, FormItem, Button, Input, InputPassword, Empty, Carousel } from 'ant-design-vue'

const AntUI = [Comment, Avatar, Modal, Form, FormItem, Button, Input, InputPassword, Empty, Carousel]

export const AntUIRegister = (instance: any) => AntUI.map((_) => instance.use(_))

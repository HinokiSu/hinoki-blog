import { Comment, Avatar } from 'ant-design-vue'

const AntUI = [Comment, Avatar]

export const AntUIRegister = (instance: any) => AntUI.map((_) => instance.use(_))

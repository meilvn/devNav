export interface User {
  id: string | number
  email: string
  nickname: string
  role: 'user' | 'admin'
//   avatar?: string
}
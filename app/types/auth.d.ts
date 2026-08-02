import type { User } from 'better-auth'

declare module 'better-auth' {
  interface User {
    signature?: string
    gender?: string
    birthDate?: string // 根据实际类型
  }
}
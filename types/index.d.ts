export type Credentials = {
  email: string
  password: string
  remember?: boolean
}

export type UserType = {
  id: number // User ID
  name: string // User's name
  email: string // User's email
  email_verified_at: string | null // ISO 8601 string or null
  created_at: string // ISO 8601 string for creation timestamp
  updated_at: string // ISO 8601 string for update timestamp
}

export type LoginResponse = {
  token_type: string // "Bearer"
  token: string // JWT Token
  expires_at: string // Expiry date in "YYYY-MM-DD HH:mm:ss" format
  user: UserType
}

export type NotificationVariantType = 'success' | 'error' | 'info' | 'warning'

export type CustomerFormType = {
  isModalActive: boolean
  title: string
  form: CustomerForm
  notificationTitle: string
  notificationMessage: string
  notificationVariant: NotificationVariantType
  isNotificationVisible: boolean
  loading?: boolean
}

export type CustomerForm = {
  first_name: string
  last_name: string
  email: string
  dob: string
  age: number | null
}

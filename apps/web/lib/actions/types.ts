export type ApiResponse<T = any> = {
  success: boolean
  message: string
  data?: T
  status?: number
}

export interface LinkData {
  id: string
  key: string
  url: string
  shortLink: string
  expired_url: string
  domain: string
  expires_at: Date
  created_at: Date
  updated_at: Date
  expired: true
}
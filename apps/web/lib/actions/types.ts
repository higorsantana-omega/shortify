export interface ApiResponse<T = any> {
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

export interface LinkReport {
  mostAccessedUrls: { shortlinkKey: string, url: string, accessedDate: string, count: number }[]
  mostActivePeriod: { date: string, count: number }[]
}

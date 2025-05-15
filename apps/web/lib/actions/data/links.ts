'use server'

import type { ApiResponse, LinkData, LinkReport } from '../types'
import { config } from '../../config'

export async function getLinks(): Promise<ApiResponse<LinkData[]>> {
  try {
    const response = await fetch(`${config.apiUrl}/links`, {
      next: {
        tags: ['links'],
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Error when retrieve links',
        status: response.status,
      }
    }

    return {
      success: true,
      message: 'Retrieve links with success!',
      data: data as LinkData[],
    }
  }
  catch (error) {
    console.error('Error request:', error)
    return {
      success: false,
      message: 'Server connection error',
      status: 500,
    }
  }
}

export async function getClicksLinks(): Promise<ApiResponse<LinkReport>> {
  try {
    const response = await fetch(`${config.apiUrl}/links/analytics/report`, {
      next: {
        tags: ['analytics'],
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Error when retrieve analytics',
        status: response.status,
      }
    }

    return {
      success: true,
      message: 'Retrieve analytics with success!',
      data: data as LinkReport,
    }
  }
  catch (error) {
    console.error('Error request:', error)
    return {
      success: false,
      message: 'Server connection error',
      status: 500,
    }
  }
}

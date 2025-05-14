'use server'

import { config } from '../../config'
import { ApiResponse, LinkData } from '../types'

export async function getLinks (): Promise<ApiResponse<LinkData[]>> {
  try {
    const response = await fetch(`${config.apiUrl}/links`, {
      next: {
        tags: ['links']
      }
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Error when retrieve links',
        status: response.status
      }
    }

    return {
      success: true,
      message: 'Retrieve links with success!',
      data: data as LinkData[]
    }
  } catch (error) {
    console.error('Error request:', error)
    return {
      success: false,
      message: 'Server connection error',
      status: 500
    }
  }
}
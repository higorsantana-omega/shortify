'use server'

import type { ApiResponse, LinkData } from './types'

import { revalidateTag } from 'next/cache'
import { config } from '../config'

export interface CreateLinkParams {
  url: string
  key?: string
}

export async function createLink(params: CreateLinkParams): Promise<ApiResponse<LinkData>> {
  try {
    const response = await fetch(`${config.apiUrl}/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Error when create link',
        status: response.status,
      }
    }

    revalidateTag('links')

    return {
      success: true,
      message: 'Link create with success!',
      data: data as LinkData,
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

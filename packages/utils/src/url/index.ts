/* eslint-disable no-new */

export function validateUrlFormat(url: string): boolean {
  if (!url || typeof url !== 'string')
    return false

  url = url.trim()

  try {
    new URL(url)
    return true
  }
  catch {
    return false
  }
}

export function isHttpsUrl(url: string): boolean {
  if (!validateUrlFormat(url))
    return false
  return new URL(url).protocol === 'https:'
}

export function formatUrlString(str: string, defaultProtocol = 'https'): string {
  if (!str || typeof str !== 'string')
    return ''

  str = str.trim()

  if (validateUrlFormat(str))
    return str

  const hasProtocol = /^\w+:\/\//.test(str)

  try {
    if (!hasProtocol && str.includes('.') && !str.includes(' ')) {
      return new URL(`${defaultProtocol}://${str}`).toString()
    }

    if (!hasProtocol) {
      const urlWithProtocol = `${defaultProtocol}://${str}`
      if (validateUrlFormat(urlWithProtocol)) {
        return urlWithProtocol
      }
    }
  }
  catch {}

  return str
}

export function buildLink({
  domain,
  key,
}: {
  domain: string
  key: string
}) {
  if (isHttpsUrl(domain)) {
    return `${domain}/${key}`
  }

  return `https://${domain}${`/${key}`}`
}

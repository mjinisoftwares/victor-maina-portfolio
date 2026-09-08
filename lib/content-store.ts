import fs from 'fs'
import path from 'path'
import { WebsiteContent } from './types/content'
import { defaultContent } from './default-content'

export { defaultContent }

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'website-content.json')

export function getWebsiteContent(): WebsiteContent {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8')
      const parsed = JSON.parse(fileData)
      return {
        ...defaultContent,
        ...parsed,
        general: { ...defaultContent.general, ...parsed?.general },
        navigation: { ...defaultContent.navigation, ...parsed?.navigation },
        hero: { ...defaultContent.hero, ...parsed?.hero },
        techStack: { ...defaultContent.techStack, ...parsed?.techStack },
        logos: { ...defaultContent.logos, ...parsed?.logos },
        projects: { ...defaultContent.projects, ...parsed?.projects },
        process: { ...defaultContent.process, ...parsed?.process },
        services: { ...defaultContent.services, ...parsed?.services },
        blog: { ...defaultContent.blog, ...parsed?.blog },
        contact: { ...defaultContent.contact, ...parsed?.contact },
        seo: { ...defaultContent.seo, ...parsed?.seo },
        footer: { ...defaultContent.footer, ...parsed?.footer },
      }
    }
  } catch (error) {
    console.error('Error reading website content:', error)
  }
  return defaultContent
}

export function saveWebsiteContent(newContent: Partial<WebsiteContent>): WebsiteContent {
  try {
    const current = getWebsiteContent()
    const updated: WebsiteContent = {
      ...current,
      ...newContent,
      lastUpdated: new Date().toISOString(),
    }

    const dir = path.dirname(DATA_FILE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8')
    return updated
  } catch (error) {
    console.error('Error saving website content:', error)
    throw error
  }
}

export function resetWebsiteContent(): WebsiteContent {
  try {
    const dir = path.dirname(DATA_FILE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(defaultContent, null, 2), 'utf-8')
    return defaultContent
  } catch (error) {
    console.error('Error resetting website content:', error)
    throw error
  }
}

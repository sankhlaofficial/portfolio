// ─── Medium RSS Feed Parser ──────────────────────────────────────────────────

const MEDIUM_RSS_URL = 'https://medium.com/feed/@adityasankhla_39073'

export interface MediumPost {
  title: string
  link: string
  date: string
  excerpt: string
  readTime: string
}

/**
 * Strip HTML tags from a string.
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim()
}

/**
 * Extract text between XML/HTML tags.
 * Returns the first match or fallback.
 */
function extractTag(xml: string, tag: string, fallback = ''): string {
  const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)</${tag}>`)
  const match = xml.match(regex)
  if (!match) return fallback
  return match[1] ?? match[2] ?? fallback
}

/**
 * Estimate reading time from word count (~200 words per minute).
 */
function estimateReadTime(text: string): string {
  const wordCount = text.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(wordCount / 200))
  return `${minutes} min read`
}

/**
 * Format a date string into a readable format (e.g. "Mar 30, 2026").
 */
function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

/**
 * Parse a single <item> block from the RSS feed into a MediumPost.
 */
function parseItem(itemXml: string): MediumPost {
  const title = extractTag(itemXml, 'title', 'Untitled')
  const link = extractTag(itemXml, 'link')
  const pubDate = extractTag(itemXml, 'pubDate')
  const contentEncoded = extractTag(itemXml, 'content:encoded')
  const description = extractTag(itemXml, 'description')

  const rawContent = contentEncoded || description
  const plainText = stripHtml(rawContent)
  const excerpt = plainText.length > 150
    ? plainText.slice(0, 150).trimEnd() + '...'
    : plainText

  return {
    title: stripHtml(title),
    link,
    date: formatDate(pubDate),
    excerpt,
    readTime: estimateReadTime(plainText),
  }
}

/**
 * Fetch and parse Medium RSS feed.
 * Returns an array of posts sorted by date (newest first).
 * Returns an empty array if the fetch or parse fails.
 */
export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const response = await fetch(MEDIUM_RSS_URL)

    if (!response.ok) {
      console.warn(`Medium RSS fetch failed: ${response.status}`)
      return []
    }

    const xml = await response.text()

    // Split XML into individual <item> blocks
    const itemBlocks = xml.match(/<item[\s>][\s\S]*?<\/item>/g)
    if (!itemBlocks || itemBlocks.length === 0) {
      return []
    }

    return itemBlocks.map(parseItem)
  } catch (error) {
    console.warn('Failed to fetch Medium posts:', error)
    return []
  }
}

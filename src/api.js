// Pixabay API — free stock photos. Needs a free API key.
// Docs: https://pixabay.com/api/docs/
const API_URL = 'https://pixabay.com/api/'
const API_KEY = import.meta.env.VITE_PIXABAY_KEY

export const PER_PAGE = 20

// Pixabay asks apps to cache results, so we keep them in memory
const cache = {}

async function callApi(params) {
  if (!API_KEY) {
    throw new Error('MISSING_KEY')
  }

  const url = `${API_URL}?key=${API_KEY}&${params}`
  if (cache[url]) return cache[url]

  const response = await fetch(url)

  if (response.status === 400) {
    throw new Error('Invalid request. Check that your Pixabay API key is correct.')
  }
  if (response.status === 429) {
    throw new Error('Too many requests. Wait a minute and try again.')
  }
  if (!response.ok) {
    throw new Error(`Could not load images (error ${response.status}). Please try again.`)
  }

  const data = await response.json()
  cache[url] = data
  return data
}

// Turns Pixabay's data into a simpler object for our components
function toImage(hit) {
  const tags = hit.tags.split(',').map((tag) => tag.trim())
  return {
    id: hit.id,
    title: tags.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(', '),
    tags: tags,
    thumbnail: hit.webformatURL,
    image: hit.largeImageURL,
    creator: hit.user,
    likes: hit.likes,
    downloads: hit.downloads,
    views: hit.views,
    width: hit.imageWidth,
    height: hit.imageHeight,
    pageUrl: hit.pageURL,
  }
}

// Search motorcycle part photos. Returns { images, totalPages }
export async function searchImages(searchTerm, page) {
  const params =
    `q=${encodeURIComponent(searchTerm)}&image_type=photo&safesearch=true` +
    `&page=${page}&per_page=${PER_PAGE}`
  const data = await callApi(params)

  return {
    images: data.hits.map(toImage),
    // Pixabay gives at most 500 results per search
    totalPages: Math.ceil(Math.min(data.totalHits, 500) / PER_PAGE),
  }
}

// Get one image by its id (for the details page)
export async function getImage(id) {
  const data = await callApi(`id=${id}`)

  if (data.hits.length === 0) {
    throw new Error('Image not found.')
  }
  return toImage(data.hits[0])
}

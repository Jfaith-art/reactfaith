import { useEffect, useState } from 'react'
import { searchImages } from '../api'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'
import ImageCard from '../components/ImageCard'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function Home({ isFavorite, toggleFavorite }) {
  const [images, setImages] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retry, setRetry] = useState(0)

  const [category, setCategory] = useState('motorcycle parts')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  // Fetch images from the API when the category, page or retry changes
  useEffect(() => {
    let ignore = false // stops old requests from overwriting new ones

    async function loadImages() {
      try {
        const data = await searchImages(category, page)
        if (!ignore) {
          setImages(data.images)
          setTotalPages(data.totalPages)
          setError(null)
        }
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadImages()
    return () => {
      ignore = true
    }
  }, [category, page, retry])

  function changeCategory(newCategory) {
    setLoading(true)
    setCategory(newCategory)
    setPage(1)
  }

  function changePage(newPage) {
    setLoading(true)
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  function tryAgain() {
    setLoading(true)
    setError(null)
    setRetry(retry + 1)
  }

  // 1. Filter by the search text   2. Sort
  const shownImages = images
    .filter((image) => {
      const text = `${image.title} ${image.creator}`.toLowerCase()
      return text.includes(search.toLowerCase())
    })
    .sort((a, b) => {
      if (sort === 'likes') return b.likes - a.likes
      if (sort === 'downloads') return b.downloads - a.downloads
      if (sort === 'views') return b.views - a.views
      return 0 // "Best match" keeps the API's order
    })

  return (
    <div>
      <section className="hero">
        <h2>Motorcycle Parts Image Gallery</h2>
        <p>Browse free photos of engines, brakes, tires, exhausts and more from Pixabay.</p>
      </section>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <Filters category={category} onCategoryChange={changeCategory} sort={sort} onSortChange={setSort} />
      </div>

      {loading && <Loader />}

      {!loading && error && <ErrorMessage message={error} onRetry={tryAgain} />}

      {!loading && !error && shownImages.length === 0 && (
        <p className="message">No images found. Try another search or category.</p>
      )}

      {!loading && !error && shownImages.length > 0 && (
        <>
          <div className="grid">
            {shownImages.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                isFavorite={isFavorite(image.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={changePage} />
        </>
      )}
    </div>
  )
}

export default Home

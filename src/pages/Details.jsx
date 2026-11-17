import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getImage } from '../api'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function Details({ isFavorite, toggleFavorite }) {
  const { id } = useParams() // the :id from the URL
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let ignore = false

    async function loadImage() {
      try {
        const data = await getImage(id)
        if (!ignore) {
          setImage(data)
          setError(null)
        }
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadImage()
    return () => {
      ignore = true
    }
  }, [id, retry])

  function tryAgain() {
    setLoading(true)
    setError(null)
    setRetry(retry + 1)
  }

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} onRetry={tryAgain} />

  return (
    <div className="details">
      <Link to="/" className="back">← Back to gallery</Link>

      <img src={image.image} alt={image.title} className="details-img" />

      <div className="details-info">
        <h2>{image.title}</h2>
        <p><b>Photographer:</b> {image.creator}</p>
        <p><b>Size:</b> {image.width} × {image.height} px</p>
        <p>
          <b>♥ Likes:</b> {image.likes.toLocaleString()} &nbsp;
          <b>⬇ Downloads:</b> {image.downloads.toLocaleString()} &nbsp;
          <b>👁 Views:</b> {image.views.toLocaleString()}
        </p>

        <div className="tags">
          {image.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="details-buttons">
          <button className="fav-btn" onClick={() => toggleFavorite(image)}>
            {isFavorite(image.id) ? '★ Remove from Favorites' : '☆ Add to Favorites'}
          </button>
          <a href={image.pageUrl} target="_blank" rel="noreferrer" className="link-btn">
            View on Pixabay ↗
          </a>
        </div>
      </div>
    </div>
  )
}

export default Details

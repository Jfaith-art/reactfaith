import { Link } from 'react-router-dom'

function ImageCard({ image, isFavorite, toggleFavorite }) {
  return (
    <div className="card">
      <Link to={`/image/${image.id}`}>
        <img
          src={image.thumbnail}
          alt={image.title}
          loading="lazy"
          // If an old saved image link no longer works, show a placeholder
          onError={(e) => {
            e.currentTarget.src = '/no-image.svg'
          }}
        />
      </Link>
      <div className="card-info">
        <Link to={`/image/${image.id}`} className="card-title">
          {image.title}
        </Link>
        <p className="creator">
          by {image.creator}
          {image.likes !== undefined && <> · ♥ {image.likes}</>}
        </p>
        <button className="fav-btn" onClick={() => toggleFavorite(image)}>
          {isFavorite ? '★ Saved' : '☆ Save'}
        </button>
      </div>
    </div>
  )
}

export default ImageCard

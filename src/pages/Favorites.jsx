import { Link } from 'react-router-dom'
import ImageCard from '../components/ImageCard'

function Favorites({ favorites, toggleFavorite }) {
  if (favorites.length === 0) {
    return (
      <p className="message">
        You have no favorites yet. <Link to="/">Go find some parts!</Link>
      </p>
    )
  }

  return (
    <div>
      <h2 className="page-title">My Favorites ({favorites.length})</h2>
      <div className="grid">
        {favorites.map((image) => (
          <ImageCard key={image.id} image={image} isFavorite={true} toggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  )
}

export default Favorites

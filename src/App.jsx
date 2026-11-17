import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Details from './pages/Details'
import Favorites from './pages/Favorites'

function App() {
  // Favorites are loaded from localStorage so they stay after a page reload
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  // Save favorites to localStorage every time they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  function isFavorite(id) {
    return favorites.some((item) => item.id === id)
  }

  function toggleFavorite(image) {
    if (isFavorite(image.id)) {
      setFavorites(favorites.filter((item) => item.id !== image.id))
    } else {
      const { id, title, thumbnail, creator, likes } = image
      setFavorites([...favorites, { id, title, thumbnail, creator, likes }])
    }
  }

  return (
    <>
      <Header favoriteCount={favorites.length} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home isFavorite={isFavorite} toggleFavorite={toggleFavorite} />} />
          <Route path="/image/:id" element={<Details isFavorite={isFavorite} toggleFavorite={toggleFavorite} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="*" element={<h2 className="message">Page not found</h2>} />
        </Routes>
      </main>
    </>
  )
}

export default App

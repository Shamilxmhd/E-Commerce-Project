import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Cart from './pages/Cart'
import View from './pages/View'
import Footer from './components/Footer'
import Wishlist from './Pages/Wishlist'
import Home from './Pages/Home'
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

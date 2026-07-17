import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'

function App() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

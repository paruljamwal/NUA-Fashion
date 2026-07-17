import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const Product = lazy(() => import('./pages/Product'))

function App() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main">
        <Suspense
          fallback={
            <div className="page-status">
              <span className="spinner" aria-label="Loading" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App

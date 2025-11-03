import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './components/homepage'
import { Navbar } from './components/navbar'
import { TranslatorPage } from './components/translator'
import AboutPage from './components/aboutpage'
import ContactPage from './components/contactus'
import { Footer } from './components/footer'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/themeprovider'
import Search from './components/Search'

function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/translator" element={<TranslatorPage />} />
              <Route path="http://localhost:3000/"/>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SearchBar from './components/SearchBar'
import ViewDetail from './components/ViewDetail'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchBar/>} />
        <Route path="/user/:id" element={<ViewDetail />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AllWrestlers from './pages/allwrestlers'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<AllWrestlers/>}/>
      </Routes>
      
    </>
  )
}

export default App

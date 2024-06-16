import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AllWrestlers from './pages/allwrestlers'
import SingleWrestler from './pages/singleWrestler'
import Login from './pages/Login'
import AllBrands from './pages/AllBrands'
import SingleBrand from './pages/SingleBrand'
import SignUp from './pages/SignUp'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<AllWrestlers/>}/>
        <Route path='/api/wrestlers/:wrestlerId' element={<SingleWrestler/>} ></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/brands' element={<AllBrands/>}></Route>
        <Route path='/api/brands/:brandId' element={<SingleBrand/>} ></Route>
        <Route path='/Signup' element={<SignUp/>}></Route>
      </Routes>
      
    </>
  )
}

export default App

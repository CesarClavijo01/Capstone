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
import CreateWrestler from './components/CreateWrestler'
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './Context/AuhtContext'

function App() {
  const [token, setToken] = useState(null)
  const [wrestler, setWrestler] = useState(null)
  

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<AllWrestlers/>}/>
        <Route path='/api/wrestlers/:wrestlerId' element={<SingleWrestler/>} ></Route>
        <Route path='/login' element={<Login setToken={setToken} token={token} />}></Route>
        <Route path='/brands' element={<PrivateRoute/>} ></Route>
        <Route path='/brands' element={<AllBrands/>}></Route>
        <Route path='/api/brands/:brandId' element={<SingleBrand/>} ></Route>
        <Route path='/Signup' element={<SignUp/>}></Route>
        <Route path='/create' element={<PrivateRoute/>}></Route>
        <Route path='/create' element={<CreateWrestler setWrestler={setWrestler} werstler={wrestler} token={token}/>}></Route>
      </Routes>
      
    </>
  )
}

export default App

import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import AllWrestlers from './pages/allwrestlers';
import SingleWrestler from './pages/singleWrestler';
import Login from './pages/Login';
import AllBrands from './pages/AllBrands';
import SingleBrand from './pages/SingleBrand';
import SignUp from './pages/SignUp';
import CreateWrestler from './components/CreateWrestler';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import DraftWrestler from './pages/DraftWrestler';


function App() {
  const [token, setToken] = useState(null)
  const [wrestler, setWrestler] = useState(null)
  

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<AllWrestlers/>}/>
        <Route path='/wrestlers/:wrestlerId' element={<SingleWrestler/>} ></Route>
        <Route path='/login' element={<Login setToken={setToken} token={token} />}></Route>
        <Route path='/brands' element={<AllBrands/>}></Route>
        <Route path='/brands/:brandId' element={<SingleBrand/>} ></Route>
        <Route path='/Signup' element={<SignUp/>}></Route>
        <Route path='/dashboard' element={<PrivateRoute/>}><Route path='/dashboard' element={<Dashboard/>}/></Route>
        <Route path='/create' element={<CreateWrestler setWrestler={setWrestler} werstler={wrestler} token={token}/>}></Route>
        <Route path='/draftWrestler/:wrestlerId' element={<PrivateRoute/>}><Route path='/draftWrestler/:wrestlerId' element={<DraftWrestler/>}/></Route>
      </Routes>
      
    </>
  )
}

export default App

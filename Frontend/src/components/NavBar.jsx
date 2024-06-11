import { Link } from 'react-router-dom'; 
import './nav.css'
import WWE_Logo  from '../assets/WWE_Logo.svg.png'


export default function NavBar() {
    return (
        <nav className='navigation'>
            <div className='imgdiv'><img className='imglogo' src={WWE_Logo} alt="logo" /></div>
            <div><p >Brands</p></div>
            <div><p >Sign-up</p></div>
            <div><p >Login</p></div> 
        </nav>
    )
}
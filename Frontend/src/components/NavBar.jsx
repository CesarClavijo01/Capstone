import { Link } from 'react-router-dom'; 
import './nav.css'
import WWE_Logo  from '../assets/WWE_Logo.svg.png'


export default function NavBar() {
    return (
        <nav className='navigation'>
            <div className='imgdiv'>
                <Link to='/'><img className='imglogo' src={WWE_Logo} alt="logo" /></Link>
            </div>
            <Link
                     to='/brands'
                     className="navlink"
                    >
                    Brands
                    </Link> 
                    <Link
                     to='/Signup'
                     className="navlink"
                    >
                    Sign-up
                    </Link> 
            <Link
                     to='/login'
                     className="navlink"
                    >
                    Log-in
                    </Link> 
        </nav>
    )
}
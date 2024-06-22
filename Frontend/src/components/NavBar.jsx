import { Link } from 'react-router-dom'; 
import './nav.css'
import WWE_Logo  from '../assets/WWE_Logo.svg.png'
import {useContext} from 'react';
import { useAuthStatus } from '../hooks/useAuthStatus';
import AuthContext from '../Context/AuhtContext';


export default function NavBar() {
    const { setToken } = useContext(AuthContext);
    const { loggedIn } = useAuthStatus();

    async function handleClick() {
        await localStorage.removeItem('token');
        setToken(null);
      }

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
                    {loggedIn ? (
                        <Link onClick={handleClick} className='navlink'>Log-out</Link>
                    ) : (<>
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
                    </>)
                    }
                     

        </nav>
    )
}
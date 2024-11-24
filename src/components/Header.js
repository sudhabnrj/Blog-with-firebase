import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';


const Header = ({isAuth, setIsAuth}) => {
    const navigate = useNavigate();

    const handleSignout = () => {
        signOut(auth).then(()=> {
            localStorage.clear();
            setIsAuth(false);
            navigate('/');
        }).catch((error)=> {
            console.error(error);
        });
    }
    
    return (
        <header>
            <nav className='bg-black py-2 px-10'>
                <div className='container mx-auto'>
                    <ul className='flex justify-center items-center'>
                        <li><Link to='/' className='text-white text-md px-6 '>Home</Link></li>
                        {isAuth ?<li>
                            <Link to='/createpost' className='text-white text-md px-6 '>CreatePost</Link>
                        </li> : ''}
                        {isAuth ? <Link onClick={handleSignout} className='text-white text-md rounded-md px-6 py-1 bg-red-700 '>Logout</Link> : <li>
                            <Link to='/login' className='text-white text-md px-6 py-1 bg-blue-700 rounded-md'>Login</Link>
                        </li>}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header
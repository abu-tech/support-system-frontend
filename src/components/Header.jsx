import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import {toast} from 'react-toastify'
import Spinner from './Spinner'


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading} = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
        toast.success("Tata!")
    }

  return (
    isLoading ? <Spinner /> : 
    <header className='header'>
        <div className="logo">
            <Link to='/'>Support Desk</Link>
        </div>
        <ul>
            {user ? (
                <li>
                    <button className="btn" onClick={onLogout}><FaSignOutAlt />Logout</button>
                </li>
            ) : (
             <>
             <li>
                 <Link to='/login'><FaSignInAlt />Login</Link>
             </li>
             <li>
                 <Link to='/register'><FaUser />Register</Link>
             </li>
             </>
            )}
        </ul>
    </header>
  )
}

export default Header
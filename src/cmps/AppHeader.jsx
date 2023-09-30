import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import logoToyUrl from '../assets/img/toy-logo.png'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { UserMsg } from './UserMsg.jsx'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    const navigate = useNavigate();

    async function onLogout() {
        try {
            await logout();
            showSuccessMsg('Logout successfully')
            navigate('/');
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }
        // logout()
        //     .then(() => {
        //         showSuccessMsg('Logout successfully')
        //         navigate('/');
        //     })
        //     .catch(err => {
        //         console.log('err:', err)
        //         showErrorMsg('Cannot logout')
        //     })
    }

    return (
        <header className="app-header main-layout full">
            <nav className='main-nav-container grid space-between align-center flow-column'>
            <div>
                <img src={logoToyUrl} alt="toy-logo"/>
            </div>
            <ul className='main-nav clean-list grid flow-column'>
            <li><NavLink to="/">Home</NavLink> </li>
            <li> <NavLink to="/toy">Toys</NavLink> </li>
            <li> <NavLink to="/about">About</NavLink> </li>
            <li> <NavLink to="/dashboard">DashBoard</NavLink> </li>
            </ul>
               
            {user && <section className="user-info">
                <p>
                    {user.fullname} <span>${user.balance}</span>
                </p>
                <button onClick={onLogout}>Logout</button>
            </section>}
            {!user && <section className="user-info">
                <LoginSignup />
            </section>}
            <UserMsg/>
            </nav>
        </header>
    )
}


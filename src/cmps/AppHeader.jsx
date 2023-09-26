
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header main-layout full">
            <nav className='main-nav-container grid space-between align-center flow-column'>
            <div>LOGO</div>
            <ul className='main-nav clean-list grid flow-column'>
            <li><NavLink to="/">Home</NavLink> </li>
            <li> <NavLink to="/toy">Toys</NavLink> </li>
            <li> <NavLink to="/about">About</NavLink> </li>
            </ul>
               
            </nav>
        </header>
    )
}


import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { BsPerson } from 'react-icons/bs'

const Navbar = () => {
    const [isMenuOpen, setMenu] = useState(false)
return (
    <nav id="navbar">
        <article className="login-menu" onClick={() => setMenu(!isMenuOpen)}>
            <BsPerson/>
            <div className={isMenuOpen ? 'open' : 'closed'}>
                <Link to="Insert login path" onClick={() => setMenu(!isMenuOpen)}>Login</Link>
            </div>
        </article>
    </nav>
)
}

export default Navbar;
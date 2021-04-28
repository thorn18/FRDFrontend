import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { IconContext } from "react-icons"
import { BsPerson } from 'react-icons/bs'

const Navbar = () => {
    const [isMenuOpen, setMenu] = useState(false)
return (
    <nav data-testid="navbar" id="navbar">
        <IconContext.Provider value={{ size: '2em' }}>
            <article className="login-menu" onClick={() => setMenu(!isMenuOpen)}>
                <BsPerson/>
                <div className={isMenuOpen ? 'open' : 'closed'}>
                    <a href="Insert login path" onClick={() => setMenu(!isMenuOpen)}>Login</a>
                </div>
            </article>
        </IconContext.Provider>
    </nav>
)
}

export default Navbar;
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className="navbar">
        <ul>
          <li className='ab1'><Link className='vbn' to='/'>
            <img className='pokeball' src='./star.png' />
            <div>Home</div>
            </Link>
          </li>
          <li className='ab2'><Link className='vbn'  to='/pokedex'>
            <img className='pokeball' src='./star.png' />
            <div>Pokedex</div>
            </Link>
          </li>
          <li className='ab3'><Link className='vbn'  to='/animations' >
            <img className='pokeball' src='./star.png' />
            <div>Fight</div>
            </Link>
          </li>
          <li className='ab4'><Link className='vbn'  to='/events'>
            <img className='pokeball' src='./star.png' />
            <div>Bookmarks</div>
            </Link>
          </li>
         
        </ul>
      </div>
      <div className="dark"></div>
      </>
  )
}

export default Navbar

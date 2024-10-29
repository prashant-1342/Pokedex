import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
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
            <div>Animations</div>
            </Link>
          </li>
          <li className='ab4'><Link className='vbn'  to='/events'>
            <img className='pokeball' src='./star.png' />
            <div>Events</div>
            </Link>
          </li>
          <li className='ab5'><Link className='vbn'  to='/news'>
            <img className='pokeball' src='./star.png' />
            <div>News</div>
            </Link>
          </li>
        </ul>
      </div>
  )
}

export default Navbar

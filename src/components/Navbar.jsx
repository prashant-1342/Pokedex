import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
     <div className="navbar">
            <ul>
              <li className='ab1'><Link className='vbn' to='/'>
                <img className='pokeball' src='home.png' />
                <div>Home</div>
              </Link>
              </li>
              <li className='ab2'><Link className='vbn' to='/pokedex'>
                <img className='pokeball' src='game.png' />
                <div>Pokedex</div>
              </Link>
              </li>
              {/* <li className='ab2'><Link className='vbn'  to='/compare'>
                          <img className='pokeball' src='./star.png' />
                          <div>Compare</div>
                          </Link>
                </li> */}
              
              
             
            </ul>
            
          </div>
          <img
      className="darkmode-toggle"
      src='night.png'
      onClick={() => document.body.classList.toggle('dark-mode')}
    ></img>
     
   
    </>
  )
}

export default Navbar

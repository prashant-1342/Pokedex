import { useState } from 'react'
import './App.css'
import Home from './pages/Home'

import Pokedex from './pages/Pokedex'


import { RouterProvider,createBrowserRouter } from 'react-router-dom'

function App() {
  const[findDetails,setfindDetails] = useState('');
 
   const router = createBrowserRouter([
      {
        path:'/',
        element:(
          <>
          <Home findDetails={findDetails} setfindDetails={setfindDetails}/>
          </>
        )
      },
      {
        path:'/pokedex',
        element:(
          <>
         
           <Pokedex findDetails={findDetails} setfindDetails={setfindDetails}/>
          </>
        )
      }
   ])

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App

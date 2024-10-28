import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Animations from './pages/Animations'
import Events from './pages/Events'
import Pokedex from './pages/Pokedex'
import News from './pages/News'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'

function App() {
 
   const router = createBrowserRouter([
      {
        path:'/',
        element:(
          <>
          <Home/>
          </>
        )
      },
      {
        path:'/pokedex',
        element:(
          <>
           <Pokedex/>
          </>
        )
      },
      {
        path:'/animations',
        element:(
          <>
           <Animations/>
          </>
        )
      },
      {
        path:'/events',
        element:(
          <>
             <Events/>
          </>
        )
      },
      {
        path:'/news',
        element:(
          <>
            <News/>
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

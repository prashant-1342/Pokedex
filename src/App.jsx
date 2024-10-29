import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Animations from './pages/Animations'
import Events from './pages/Events'
import Pokedex from './pages/Pokedex'
import News from './pages/News'
import Navbar from './components/Navbar'
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
          <Navbar/>
           <Pokedex findDetails={findDetails} setfindDetails={setfindDetails}/>
          </>
        )
      },
      {
        path:'/animations',
        element:(
          <>
            <Navbar/>
           <Animations/>
          </>
        )
      },
      {
        path:'/events',
        element:(
          <>
            <Navbar/>
             <Events/>
          </>
        )
      },
      {
        path:'/news',
        element:(
          <>
            <Navbar/>
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

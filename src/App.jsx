import { useState, useEffect, createContext } from 'react'
import './App.css'
import Home from './pages/Home'
import Compare from './pages/Compare'
import Pokedex from './pages/Pokedex'
import Navbar from './components/Navbar'


import { RouterProvider,createBrowserRouter } from 'react-router-dom'


export const DarkModeContext = createContext();

function App() {
  const [findDetails, setfindDetails] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <Navbar />
          <Home findDetails={findDetails} setfindDetails={setfindDetails} />
        </DarkModeContext.Provider>
      ),
    },
    {
      path: '/pokedex',
      element: (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <Navbar />
          <Pokedex findDetails={findDetails} setfindDetails={setfindDetails} />
        </DarkModeContext.Provider>
      ),
    },
    {
      path: '/compare',
      element: (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <Navbar />
          <Compare />
        </DarkModeContext.Provider>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App

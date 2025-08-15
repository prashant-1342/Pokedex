import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Pokedex from './Pokedex';



const Home = ({ findDetails, setfindDetails }) => {
  const [inputValue, setinputValue] = useState("");
  const [pokename, setpokename] = useState("");
  const [pokeimage, setpokeimage] = useState("");
  const [poketype, setpoketype] = useState("");
  const [pokelist, setpokelist] = useState([]);
  const [filteredPokelist, setFilteredPokelist] = useState([]);
  const [poketype2, setpoketype2] = useState("");
  const [show, setshow] = useState(false);
  const [upperlimit, setupperlimit] = useState(100);
  const [lowerlimit, setlowerlimit] = useState(0);

  function handleinput(e) {
    const value = e.target.value;
    setinputValue(value);
    if (value === "") {
      setFilteredPokelist(pokelist);
    } else {
      setFilteredPokelist(
        pokelist.filter(pokemon =>
          pokemon.name.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    }
  }


  useEffect(() => {
    setTimeout(() => {
      fetchApi2();
    }, 500);
  }, [lowerlimit, upperlimit]);

  useEffect(() => {
    setFilteredPokelist(pokelist);
  }, [pokelist]);

  const fetchApi2 = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${upperlimit}&offset=${lowerlimit}`
      const response = await fetch(url);
      const data2 = await response.json();
      if (response.ok) {
        const detailedlist = await Promise.all(
          data2.results.map(async (pokemon) => {
            const details = await fetchpokemondetails(pokemon.url);
            return details;
          })
        )

        setpokelist(detailedlist)

      }
    }


    catch (err) {
      console.log('Some Error Found', err);
    }
  }

  const fetchpokemondetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const name = capitalizeFirstLetter(data.name);
      const image = data.sprites.other['official-artwork'].front_default;
      const type = capitalizeFirstLetter(data.types[0].type.name);
      const type2 = data.types[1] ? capitalizeFirstLetter(data.types[1].type.name) : null

      return {
        name,
        image,
        type,
        type2
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const fetchApi = async (inputValue) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;
      const response = await fetch(url);
      const data = await response.json();
      const name = capitalizeFirstLetter(data.name);
      const image = data.sprites.other['official-artwork'].front_default;
      const type = capitalizeFirstLetter(data.types[0].type.name);
      const type2 = data.types[1] ? capitalizeFirstLetter(data.types[1].type.name) : null
      if (response.ok) {
        setpokename(name);
        setpoketype(type);
        setpokeimage(image);
        setpoketype2(type2);

        setshow(true);
        console.log(data.sprites);
      }
    }
    catch (error) {
      console.log('Error found:', error);
    }
  }

  function handleSearch() {
    if (inputValue !== "") {
      fetchApi(inputValue);

    }
    else {
      alert("Enter a valid value");
    }
  }

  const nextpage = () => {
    setlowerlimit(upperlimit + 1);
    setupperlimit(upperlimit + 20)

    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  function handleimageclick(val) {
    setfindDetails(val);
  }

  if (!document.body.classList.contains('dark-mode')) {
    document.body.classList.add('dark-mode');
  }


  return (
    <div>
   
      
    
      <div className='cvf'>Pokédex</div>
      <div className="container">
        <div className='qas'>Name or Number</div>
        <div className="ghj">
          <input
            className='sed'
            value={inputValue}
            onChange={handleinput}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <img onClick={() => handleSearch()} className='searchicon' src='./loupe.png' />
        </div>

        {show ?
          <div className="cards">
            <div className="card">
              <Link to='/pokedex' onClick={() => handleimageclick(pokename)} >
                <img className='pokeimage' src={`${pokeimage}`} />
                <div className="pokename">
                  {pokename}
                </div>

                <div className="poketype">
                  <div className={`iop type-${poketype.toLowerCase()}`} >
                    {poketype}
                  </div>
                  {poketype2 ?
                    <div className={`iop type-${poketype2.toLowerCase()}`} >
                      {poketype2}
                    </div>
                    :
                    ""
                  }

                </div>'</Link>'
            </div>
          </div>
          :
          <>
            <a className='bnm' onClick={nextpage}>
              <img className='renewable' src='./reload.png' />
              Surpise Me
            </a>
            <div className="lists">
              {filteredPokelist.map((pokemon, index) => (
                <div className="card" key={index}>
                  <Link to='/pokedex' onClick={() => handleimageclick(pokemon.name)}>
                    <img className='pokeimage' src={pokemon.image} /></Link>

                  <div className="pokename">
                    {pokemon.name}
                  </div>

                  <div className="poketype">
                    <div className={`iop type-${pokemon.type.toLowerCase()}`} >
                      {pokemon.type}
                    </div>
                    {pokemon.type2 ?
                      <div className={`iop type-${pokemon.type2.toLowerCase()}`} >
                        {pokemon.type2}
                      </div>
                      :
                      ""
                    }

                  </div>
                </div>

              ))}
            </div>
             <div className='bnm2'>
             <a  onClick={nextpage}>
              <img className='renewable' src='./reload.png' />
              Next Page
            </a>
             </div>
           
          </>
        }
      </div>
    </div>
  )
}

export default Home

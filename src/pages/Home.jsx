import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import News from './News';
import Pokedex from './Pokedex';
import Animations from './Animations';
import Events from './Events';

const Home = ({findDetails  ,setfindDetails}) => {
  const [inputValue, setinputValue] = useState("");
  const [pokename, setpokename] = useState("");
  const [pokeimage, setpokeimage] = useState("");
  const [poketype, setpoketype] = useState("");
  const [pokelist, setpokelist] = useState([]);
  const [poketype2, setpoketype2] = useState("");
  const [show, setshow] = useState(false);
  const [upperlimit, setupperlimit] = useState(100);
  const [lowerlimit, setlowerlimit] = useState(0);

  function handleinput(e) {
    setinputValue(e.target.value);
  }


  useEffect(() => {
   
    setTimeout(() => {
      fetchApi2();
    }, 500);

  }, [lowerlimit, upperlimit])

  const fetchApi2 = async () => {
    try {
      // const url = `https://pokeapi.co/api/v2/pokemon`
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${upperlimit}&offset=${lowerlimit}`
      const response = await fetch(url);
      const data2 = await response.json();
      if (response.ok) {
        const detailedlist = await Promise.all(
          data2.results.map(async (pokemon) => {
            const details = await fetchpokemondetails(pokemon.url);
            // console.log(details);
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
  }

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

 function handleimageclick(val){
  setfindDetails(val);
 }

  
  return (
    <div>
      <div className="navbar">
        <ul>
          <li className='ab1'><Link className='vbn' to='/'>
            <img className='pokeball' src='./star.png' />
            <div>Home</div>
          </Link>
          </li>
          <li className='ab2'><Link className='vbn' to='/pokedex'>
            <img className='pokeball' src='./star.png' />
            <div>Pokedex</div>
          </Link>
          </li>
          <li className='ab3'><Link className='vbn' to='/animations' >
            <img className='pokeball' src='./star.png' />
            <div>Fight</div>
          </Link>
          </li>
          <li className='ab4'><Link className='vbn' to='/events'>
            <img className='pokeball' src='./star.png' />
            <div>Events</div>
          </Link>
          </li>
          <li className='ab5'><Link className='vbn' to='/news'>
            <img className='pokeball' src='./star.png' />
            <div>News</div>
          </Link>
          </li>
        </ul>
      </div>
      <div className='cvf'>Pokédex</div>
      <div className="container">
        <div className='qas'>Name or Number</div>
        <div className="ghj">
          <input className='sed' value={inputValue} onChange={handleinput} />
          <img onClick={() => handleSearch()} className='searchicon' src='./loupe.png' />
        </div>

        {show ?
          <div className="cards">
            <div className="card">
              <img className='pokeimage' src={`${pokeimage}`} />

              <div className="pokename">
                {pokename}
              </div>

              <div className="poketype">
                <div className="iop">
                  {poketype}
                </div>
                {poketype2 ?
                  <div className="iop">
                    {poketype2}
                  </div>
                  :
                  ""
                }

              </div>
            </div>
          </div>
          :
          <>
            <a className='bnm' onClick={nextpage}>
              <img className='renewable' src='./reload.png' />
              Surpise Me
            </a>
            <div className="lists">
              {pokelist.map((pokemon, index) => (
                <div className="card" key={index}>
                  <Link to='/pokedex' onClick={()=>handleimageclick(pokemon.name)}>
                    <img className='pokeimage' src={pokemon.image} /></Link>

                  <div className="pokename">
                    {pokemon.name}
                  </div>

                  <div className="poketype">
                    <div className="iop">
                      {pokemon.type}
                    </div>
                    {pokemon.type2 ?
                      <div className="iop">
                        {pokemon.type2}
                      </div>
                      :
                      ""
                    }

                  </div>
                </div>

              ))}

            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Home

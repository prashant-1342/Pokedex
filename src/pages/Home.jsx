import React, { useState, useEffect } from 'react'

const Home = () => {

  const [inputValue, setinputValue] = useState("");
  const [pokename, setpokename] = useState("");
  const [pokeimage, setpokeimage] = useState("");
  const [poketype, setpoketype] = useState("");
  const [pokelist, setpokelist] = useState([]);
  const [pokename2, setpokename2] = useState("");
  const [pokeimage2, setpokeimage2] = useState("");
  const [poketype2, setpoketype2] = useState("");
  
  function handleinput(e) {
    setinputValue(e.target.value);
  }

  useEffect(() => {
    fetchApi2();
  }, [])

  const fetchApi2 = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon`
      const response = await fetch(url);
      const data2 = await response.json();
      if (response.ok) {
        const detailedlist = await Promise.all(
          data2.results.map(async(pokemon)=>{
            const details = await fetchpokemondetails(pokemon.url);
            console.log(details);
            return details;
          })
        )
        setpokelist(detailedlist)  
        console.log(detailedlist)
      }
    }

    
    catch (err) {
      console.log('Some Error Found', err);
    }
  }

  const fetchpokemondetails = async(url)=>{
     try{
       const response = await fetch(url);
       const data = await response.json();
       return {
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        type: data.types[0].type.name, 
       }
     }
     catch(err){
      console.log(err);

     }
  }

  const fetchApi = async (inputValue) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setpokename(data.name);
        setpoketype(data.types[0].type.name);
        setpokeimage(data.sprites.other['official-artwork'].front_default);


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
      setinputValue("");
    }
    else {
      alert("Enter a valid value");
    }
  }


  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <img className='pokeball' src='./star.png' />
            <div>Home</div>
          </li>
          <li>
            <img className='pokeball' src='./star.png' />
            <div>Pokedex</div>
          </li>
          <li>
            <img className='pokeball' src='./star.png' />
            <div>Animations</div>
          </li>
          <li>
            <img className='pokeball' src='./star.png' />
            <div>Events</div>
          </li>
          <li>
            <img className='pokeball' src='./star.png' />
            <div>News</div>
          </li>
        </ul>
      </div>
      <div>Pokedex</div>
      <div className="container">
        <button>Surprise Me</button>
        {/* <div>Name or Number</div>
        <div className="ghj">
          <input value={inputValue} onChange={handleinput} />
          <img onClick={() => handleSearch()} className='searchicon' src='./loupe.png' />
        </div> */}

        {/* <div className="cards">
           <div className="card">
               <img className='pokeimage' src={`${pokeimage}`}/>
              
           <div className="pokename">
             {pokename}
           </div>

           <div className="poketype">
            {poketype}
           </div>
           </div>
        </div> */}

        <div className="lists">
         {pokelist.map((pokemon,index)=>(
          <div className="card" key={index}>
            <img className='pokeimage' src={pokemon.image} />

            <div className="pokename">
              {pokemon.name}
            </div>

            <div className="poketype">
               {pokemon.type}
            </div>
          </div>

         ))}
          
        </div>

      </div>
    </div>
  )
}

export default Home

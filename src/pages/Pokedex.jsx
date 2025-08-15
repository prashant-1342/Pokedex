import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Pokedex = ({ findDetails, setfindDetails }) => {
  const [aboutpokemon, setAboutPokemon] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [type2, setType2] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [chainUrl, setChainUrl] = useState('');
  const [base1, setBase1] = useState('');
  const [base2, setBase2] = useState('');
  const [base3, setBase3] = useState('');
  const [abc1, setAbc1] = useState('');
  const [abc2, setAbc2] = useState('');
  const [abc3, setAbc3] = useState('');
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('');
  const [t3, setT3] = useState('');
  const [t4, setT4] = useState('');
  const [t5, setT5] = useState('');
  const [t6, setT6] = useState('');
  const [category, setcategory] = useState('')
  const [ability,setability] = useState('')

  const fallbackImg = './pokeball.png';

  useEffect(() => {
    let nameToShow = findDetails;
    if (!findDetails) {
      const randomId = Math.floor(Math.random() * 400) + 1;
      nameToShow = randomId.toString();
      setfindDetails(nameToShow);
    }
    if (nameToShow) {
      const pokemonName = smallFirstLetter(nameToShow);
      fetchPokemonSpecies(pokemonName);
      fetchPokemonDetails(pokemonName);
    }
  }, [findDetails]);

  useEffect(() => {
    if (chainUrl) {
      fetchEvolutionChain(chainUrl);
    }
  }, [chainUrl]);

  if (!document.body.classList.contains('dark-mode')) {
    document.body.classList.add('dark-mode');
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const smallFirstLetter = (val) => 
    val.charAt(0).toLowerCase() + val.slice(1);

  const capitalizeFirstLetter = (val) =>
    val.charAt(0).toUpperCase() + val.slice(1);

  const fetchPokemonSpecies = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
      if (response.ok) {
        const data = await response.json();
        setChainUrl(data.evolution_chain.url);
        const flavorText = data.flavor_text_entries.find((e) => e.language.name === 'en');
        const genera = data.genera.find((e)=>e.language.name === 'en');
        setcategory(genera?.genus)
        setAboutPokemon(flavorText?.flavor_text || 'No description found.');
      } else {
        console.error("Failed to fetch species:", response.status);
      }
    } catch (err) {
      console.error("Error fetching species:", err);
    }
  };

  const fetchPokemonDetails = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (response.ok) {
        const data = await response.json();
        setImage(data.sprites.other['official-artwork'].front_default);
        setType(capitalizeFirstLetter(data.types[0].type.name));
        setType2(data.types[1] ? capitalizeFirstLetter(data.types[1].type.name) : null);
        setHeight((data.height / 10).toFixed(1));
        const kg = (data.weight / 10).toFixed(1); // 1 hg = 0.1 kg
        setWeight(`${kg} kg`); // Set weight in kg

        const ab = data.abilities[0].ability.name;
        setability(capitalizeFirstLetter(ab));
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  function updateSearch(val){
    setfindDetails(val)
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  const fetchEvolutionChain = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const speciesNames = [
          data.chain?.species?.name,
          data.chain?.evolves_to[0]?.species?.name,
          data.chain?.evolves_to[0]?.evolves_to[0]?.species?.name,
        ];

        const [img1, img2, img3] = await Promise.all(
          speciesNames.map((name) => fetchPokemonImage(name))
        );

        setBase1(capitalizeFirstLetter(speciesNames[0] || ''));
        setBase2(capitalizeFirstLetter(speciesNames[1] || ''));
        setBase3(capitalizeFirstLetter(speciesNames[2] || ''));

        setAbc1(img1);
        setAbc2(img2);
        setAbc3(img3);

        await Promise.all([
          fetchPokemonType(speciesNames[0], setT1, setT2),
          fetchPokemonType(speciesNames[1], setT3, setT4),
          fetchPokemonType(speciesNames[2], setT5, setT6),
        ]);
      }
    } catch (error) {
      console.error("Error fetching evolution chain:", error);
    }
  };

  const fetchPokemonImage = async (name) => {
    if (!name) return '';
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      return data.sprites.other['official-artwork'].front_default || '';
    } catch (error) {
      console.error(`Error fetching image for ${name}:`, error);
      return '';
    }
  };

  const fetchPokemonType = async (name, setType1, setType2) => {
    if (!name) return;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setType1(capitalizeFirstLetter(data.types[0]?.type.name || ''));
      setType2(capitalizeFirstLetter(data.types[1]?.type.name || ''));
    } catch (error) {
      console.error(`Error fetching type for ${name}:`, error);
    }
  };

  return (
    <>
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
                
                
               
              </ul>
              
            </div>
            <img
        className="darkmode-toggle"
        src='night.png'
        onClick={() => document.body.classList.toggle('dark-mode')}
      ></img>
      <div className="axs">
        <div className="ijk">{findDetails}</div>
      </div>
      <div className="containerpokedex responsive-pokedex">
        <div className="row1 responsive-row1">
          <div className="col1 responsive-col1">
            <img
              className="edr responsive-img"
              src={image || fallbackImg}
              alt="Pokemon"
              onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }}
            />  
          </div>
          <div className="col2 responsive-col2">
            {aboutpokemon}
            <br /><br />
            <span className="azs responsive-azs">
              Versions:
              <img className="pokeballsize" src="./pokeball (2).png" alt="Pokeball" />
              <img className="pokeballsize" src="./pokeball.png" alt="Pokeball" />
            </span>
            <div className="aboutpokemon responsive-aboutpokemon">
              <div className="colum1 responsive-colum1">
                <div className="height"><span style={{ color: "white" }}> Height</span><br />{height} meters</div>
                <div className="weight"><span style={{ color: "white" }}>Weight<br /></span>{weight}</div>
                <div className="gender" style={{ color: "white" }}>Gender<br />
                  <span className="dcf">
                    <img className="gendermale" src="./mars.png" alt="Male" />
                    <img className="gendermale" src="./femenine.png" alt="Female" />
                  </span>
                </div>
              </div>
              <div className="colum2 responsive-colum2" style={{ paddingTop: "10px" }}>
                <div className="category"><span style={{ color: "white" }}>Category<br /></span>{category}</div>
                <div className="abilities"><span style={{ color: "white" }}>Abilities<br /></span>{ability}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row2 responsive-row2">
          <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>Type</div>
          <div className="poketype responsive-poketype">
            <div className={`iop type-${type.toLowerCase()}`}>{type}</div>
            {type2 && <div className={`iop type-${type2.toLowerCase()}`}>{type2}</div>}
          </div>
        </div>
        <div className="row3 responsive-row3">
          <h2>Evolutions</h2>
          <div className="rft responsive-rft">
            {[abc1, abc2, abc3].map((img, index) => (
              img && (
                <div className="co1 responsive-co1" key={index}>
                  <div className="evolvecontain responsive-evolvecontain" onClick={() => updateSearch([base1, base2, base3][index])}>
                    <img className="rfc responsive-rfc" src={img} alt={`Evolution ${index + 1}`} />
                  </div>
                  <div style={{ marginBottom: "10px" }}>{[base1, base2, base3][index]}</div>
                  <div className="poketype2 responsive-poketype2">
                    <div className={`iop type-${t1.toLowerCase()}`}>{[t1, t3, t5][index]}</div>
                    {[t2, t4, t6][index] && <div className={`iop type-${t6.toLowerCase()}`}>{[t2, t4, t6][index]}</div>}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pokedex;

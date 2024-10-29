import React,{useEffect, useState} from 'react'


const Pokedex = ({findDetails  ,setfindDetails}) => {
  const [aboutpokemon, setaboutpokemon] = useState('')
   const [image, setimage] = useState('');
   const [type, settype] = useState('');
   const [type2, settype2] = useState('')
   const [height, setheight] = useState()
   const [weight, setweight] = useState() 
   const[chainurl,setchainurl] = useState('');
   const [base1, setbase1] = useState('');
   const [base2, setbase2] = useState('');
   const [base3, setbase3] = useState('');
   const [pok1, setpok1] = useState('');
   const [pok2, setpok2] = useState('');
   const [pok3, setpok3] = useState('');
   const [abc1, setabc1] = useState('');
   const [abc2, setabc2] = useState('');
   const [abc3, setabc3] = useState('');

   
 
  useEffect(() => {
    if (findDetails) {
      const small =  smallfirstletter(findDetails);
      fetchApi3(small);
      fetchApi4(small);
      fetchApi5(chainurl)
    }
    
  }, []); 

  const smallfirstletter=(val)=>{
      return String(val).charAt(0).toLowerCase() + String(val).slice(1);
  }
  
  useEffect(() => {
    if (chainurl) {
      console.log(chainurl);
    }
  }, [chainurl]);
  

  const fetchApi3 = async (findDetails)=>{
     try{
        const url = `https://pokeapi.co/api/v2/pokemon-species/${findDetails}/`
        const response = await fetch(url);
        if(response.ok){
        const data3 = await response.json();
        setchainurl(data3.evolution_chain.url)
        
        if (data3.flavor_text_entries && data3.flavor_text_entries.length > 0) {
          const english = data3.flavor_text_entries.find((e)=>e.language.name === 'en');
          setaboutpokemon(english.flavor_text);
        } else {
          console.warn("No flavor text available.");
          setaboutpokemon("No description found.");
        }
     }
     else {
      console.error("Failed to fetch data:", response.status);
    }
    }
     catch(err){
      console.log(err);
     }
  }
  
  const fetchApi4 = async (findDetails)=>{
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${findDetails}`;
      const response = await fetch(url);
      const data = await response.json();
      setimage(data.sprites.other['official-artwork'].front_default);
      settype(capitalizeFirstLetter(data.types[0].type.name));
      settype2(data.types[1] ? capitalizeFirstLetter(data.types[1].type.name) : null);
      {
        abc1 === ''?
        setabc1(data.sprites.other['official-artwork'].front_default)
        :
        '';
      }
      {
        abc2 === ''?
        setabc2(data.sprites.other['official-artwork'].front_default)
        :
        '';
      }
      {
        abc3 === ''?
        setabc3(data.sprites.other['official-artwork'].front_default)
        :
        '';
      }
      const abc = data.height / 10;
     setheight(abc);
     const bcd = data.weight * 0.2;
      setweight(bcd);
    } catch (error) {
       console.log(error)
    }
  }

  const fetchApi5 = async (chainurl) => {
    try {
      const response = await fetch(chainurl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Ensure data properties exist before calling capitalizeFirstLetter
      setbase1(capitalizeFirstLetter(data.chain?.species?.name || ''));
      setpok1(smallfirstletter(data.chain?.species?.name || ''))
      fetchApi4(pok1)
      setbase2(capitalizeFirstLetter(data.chain?.evolves_to[0]?.species?.name || ''));
      setpok2(smallfirstletter(data.chain?.evolves_to[0]?.species?.name || ''))
      fetchApi4(pok2)
      setbase3(capitalizeFirstLetter(data.chain?.evolves_to[0]?.evolves_to[0]?.species?.name || ''));
      setpok3(smallfirstletter(data.chain?.evolves_to[0]?.evolves_to[0]?.species?.name || ''))
      fetchApi4(pok3)
  
    } catch (error) {
      console.error('Error found in fetchApi5:', error);
    }
  };
  



  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <>
      <div className='axs'>{findDetails}</div>
      <div className="containerpokedex">
        <div className="row1">
          <div className="col1">
            <img className='edr' src={`${image}`} />
          </div>
          <div className="col2">
               {aboutpokemon}
            <br />
            <br />
            <span className='azs'>Versions: <img className='pokeballsize' src='./pokeball (2).png' />
              <img className='pokeballsize' src='./pokeball.png' />
            </span>

            <div className="aboutpokemon">
              <div className="colum1">
                <div className="height">
                  Height
                  <br />
                 {height} meters
                </div>

                <div className="weight">
                  Weight<br />
                  {weight} lbs

                </div>

                <div className="gender">
                  Gender<br />
                  <span className='dcf'>
                    <img className='gendermale' src='./mars.png' />
                    <img className='gendermale' src='./femenine.png' />
                  </span>
                </div>

              </div>
              <div className="colum2">
                <div className="category">
                  Category<br />
                  Lizard
                </div>
                <div className="abilities">
                  Abilities<br />
                  Blaze
                </div>
              </div>
            </div>



          </div>
        </div>
        <div className="row2">
          <div style={{ fontSize: '20px', fontWeight: "bold", marginBottom: "15px" }}>Type</div>
          <div className="poketype">
            <div className="iop">
              {type}
            </div>
            {type2 ?
            <div className="iop">
            {type2}
          </div>
          :
          ""
          }
          </div>
          <div style={{ marginTop: "15px", fontSize: '20px', fontWeight: "bold", marginBottom: "15px" }}>Weakness</div>
          <div className="poketype">
            <div className="iop">
              Grass
            </div>

            <div className="iop">
              Stone
            </div>
          </div>
        </div>

        <div className="row3">
          <h2>Evolutions</h2>
          <div className="rft">
            <div className="co1">
              <div className='evolvecontain'>
                <img className='rfc' src={`${abc1}`}/>

              </div>
              <div style={{marginBottom:"10px"}}>{base1}</div>
              <div className="poketype2 ">
                <div className="iop">
                  Fire
                </div>
                <div className="iop">
                  Water
                </div>
              </div>
            </div>
            <img className='gre' src='./greater-than-symbol.png' />
            <div className="co1">
              <div className='evolvecontain'>
                <img className='rfc' src={`${abc2}`} />
              </div>
              <div style={{marginBottom:"10px"}}>{base2}</div>
              <div className="poketype2">
                <div className="iop">
                  Fire
                </div>
                <div className="iop">
                  Water
                </div>
              </div>
            </div>
            <img className='gre' src='./greater-than-symbol.png' />
            <div className="co1">
              <div className='evolvecontain'>
                <img className='rfc' src={`${abc3}`} />
              </div>
              <div style={{marginBottom:"10px"}}>{base3}</div>
              <div className="poketype2">
                <div className="iop">
                  Fire
                </div>
                <div className="iop">
                  Water
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default Pokedex

import React from 'react'


const Pokedex = ({findDetails  ,setfindDetails}) => {

  const fetchApi3 = async ()=>{
     try{
        const url = `https://pokeapi.co/api/v2/pokemon-species/${findDetails}/`
        const response = await fetch(url);
        const data3 = await response.json();
        if(response.ok){
          
        }
     }
     catch(err){
      console.log(err);
     }
  }

  return (
    <>
      <div className='axs'>Charmander</div>
      <div className="containerpokedex">
        <div className="row1">
          <div className="col1">
            <img className='edr' src='./pokeball.png' />
          </div>
          <div className="col2">
            The flame on its tail shows the strength of its life-force. If Charmander is weak, the flame also burns weakly.
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
                  2'60"
                </div>

                <div className="weight">
                  Weight<br />
                  187.lbs

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
              Fire
            </div>
            <div className="iop">
              Water
            </div>
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
                <img className='rfc' src='./pokeball.png' />

              </div>
              <div style={{marginBottom:"10px"}}>Charmander</div>
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
                <img className='rfc' src='./pokeball.png' />
              </div>
              <div style={{marginBottom:"10px"}}>Charmander</div>
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
                <img className='rfc' src='./pokeball.png' />
              </div>
              <div style={{marginBottom:"10px"}}>Charmander</div>
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

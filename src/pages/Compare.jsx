import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const fallbackImg = 'https://static.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png/revision/latest?cb=20140520015336';

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; 
}

async function fetchPokemon(nameOrId) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toString().toLowerCase()}`);
    if (!res.ok) throw new Error('Not found');
    const data = await res.json();
    return {
      name: capitalize(data.name),
      image: data.sprites.other['official-artwork'].front_default,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      total: data.stats.reduce((sum, s) => sum + s.base_stat, 0),
    };
  } catch {
    return null;
  }
}

const Compare = () => {
  const [round, setRound] = useState(1);
  const [player1Inputs, setPlayer1Inputs] = useState(['', '', '']);
  const [player2Inputs, setPlayer2Inputs] = useState(['', '', '']);
  const [player1Team, setPlayer1Team] = useState([null, null, null]);
  const [player2Team, setPlayer2Team] = useState([null, null, null]);
  const [player1Current, setPlayer1Current] = useState(null);
  const [player2Current, setPlayer2Current] = useState(null);
  const [player1Stats, setPlayer1Stats] = useState(null);
  const [player2Stats, setPlayer2Stats] = useState(null);
  const [winner, setWinner] = useState('');
  const [battleLog, setBattleLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(['', '', '', '', '', '']);

  async function handleStartBattle() {
    setLoading(true);
    setError(['', '', '', '', '', '']);
    // Fetch all pokemons for both players
    const promises1 = player1Inputs.map(n => fetchPokemon(n));
    const promises2 = player2Inputs.map(n => fetchPokemon(n));
    const results1 = await Promise.all(promises1);
    const results2 = await Promise.all(promises2);
    setPlayer1Team(results1);
    setPlayer2Team(results2);
    let errArr = Array(6).fill('');
    results1.forEach((r,i)=>{if(!r)errArr[i]='Not found'});
    results2.forEach((r,i)=>{if(!r)errArr[i+3]='Not found'});
    setError(errArr);
    // Set first round pokemons
    setPlayer1Current({...results1[0]});
    setPlayer2Current({...results2[0]});
    setPlayer1Stats({...results1[0]});
    setPlayer2Stats({...results2[0]});
    setRound(1);
    setBattleLog([]);
    setWinner('');
    setLoading(false);
  }

  function getBattleResult(p1, p2) {
    // Simple logic: sum HP + Attack + Defense + Speed
    const p1Power = p1.hp + p1.attack + p1.defense + p1.speed;
    const p2Power = p2.hp + p2.attack + p2.defense + p2.speed;
    if (p1Power > p2Power) return 1;
    if (p2Power > p1Power) return 2;
    return 0;
  }

  function handleNextRound() {
    let log = [...battleLog];
    let p1 = {...player1Stats};
    let p2 = {...player2Stats};
    const result = getBattleResult(p1, p2);
    if (result === 1) {
      // Player 1 wins, reduce stats by opponent's attack
      p1.hp = Math.max(0, p1.hp - p2.attack);
      p1.attack = Math.max(0, p1.attack - Math.floor(p2.attack/2));
      log.push(`Round ${round}: ${p1.name} wins! Stats reduced.`);
      // Player 2 brings next pokemon
      if (round < 3) {
        setPlayer2Current({...player2Team[round]});
        setPlayer2Stats({...player2Team[round]});
      }
      setPlayer1Stats(p1);
    } else if (result === 2) {
      // Player 2 wins, reduce stats by opponent's attack
      p2.hp = Math.max(0, p2.hp - p1.attack);
      p2.attack = Math.max(0, p2.attack - Math.floor(p1.attack/2));
      log.push(`Round ${round}: ${p2.name} wins! Stats reduced.`);
      // Player 1 brings next pokemon
      if (round < 3) {
        setPlayer1Current({...player1Team[round]});
        setPlayer1Stats({...player1Team[round]});
      }
      setPlayer2Stats(p2);
    } else {
      log.push(`Round ${round}: Draw! Both stats reduced.`);
      p1.hp = Math.max(0, p1.hp - Math.floor(p2.attack/2));
      p2.hp = Math.max(0, p2.hp - Math.floor(p1.attack/2));
      setPlayer1Stats(p1);
      setPlayer2Stats(p2);
    }
    setBattleLog(log);
    if (round === 3) {
      // Final result
      const p1Final = p1.hp + p1.attack + p1.defense + p1.speed;
      const p2Final = p2.hp + p2.attack + p2.defense + p2.speed;
      if (p1Final > p2Final) setWinner('Player 1 Wins!');
      else if (p2Final > p1Final) setWinner('Player 2 Wins!');
      else setWinner('Draw!');
    } else {
      setRound(round + 1);
    }
  }

  function handleInput(player, idx, value) {
    if (player === 1) {
      const arr = [...player1Inputs];
      arr[idx] = value;
      setPlayer1Inputs(arr);
    } else {
      const arr = [...player2Inputs];
      arr[idx] = value;
      setPlayer2Inputs(arr);
    }
  }

  return (
    <>
        {/* Responsive styles for mobile */}
        <style>{`
          @media (max-width: 600px) {
            .compare-arena {
              max-width: 98vw !important;
              margin: 12px auto !important;
              padding: 8px !important;
              border-radius: 10px !important;
            }
            .compare-flex {
              flex-direction: column !important;
              gap: 18px !important;
            }
            .compare-card {
              min-width: 90vw !important;
              max-width: 98vw !important;
              padding: 10px !important;
            }
            .compare-input {
              width: 90vw !important;
              font-size: 1rem !important;
              padding: 8px 12px !important;
            }
            .compare-btn {
              width: 90vw !important;
              font-size: 1rem !important;
              padding: 10px 0 !important;
            }
          }
        `}</style>
        <div className="compare-arena" style={{ maxWidth: 900, margin: '32px auto', padding: 24, background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)', borderRadius: 18, boxShadow: '0 4px 24px rgba(60,60,120,0.12)', color: '#232323' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Pokémon Arena: 3-Round Battle!</h2>
          <div className="compare-flex" style={{ display: 'flex', gap: 48, justifyContent: 'center', marginBottom: 32 }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ textAlign: 'center' }}>Player 1: Enter 3 Pokémon</h3>
              {[0,1,2].map(i => (
                <input
                  key={i}
                  type="text"
                  className="compare-input"
                  placeholder={`Pokémon ${i+1} name or ID`}
                  value={player1Inputs[i]}
                  onChange={e => handleInput(1, i, e.target.value)}
                  style={{ padding: '10px 18px', borderRadius: 8, fontSize: '1.1rem', border: '1px solid #6366f1', width: 220, marginBottom: 12, maxWidth: '98vw' }}
                />
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ textAlign: 'center' }}>Player 2: Enter 3 Pokémon</h3>
              {[0,1,2].map(i => (
                <input
                  key={i}
                  type="text"
                  className="compare-input"
                  placeholder={`Pokémon ${i+1} name or ID`}
                  value={player2Inputs[i]}
                  onChange={e => handleInput(2, i, e.target.value)}
                  style={{ padding: '10px 18px', borderRadius: 8, fontSize: '1.1rem', border: '1px solid #6366f1', width: 220, marginBottom: 12, maxWidth: '98vw' }}
                />
              ))}
            </div>
          </div>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <button className="compare-btn" onClick={handleStartBattle} style={{ padding: '12px 38px', borderRadius: 12, background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', color: '#fff', fontWeight: 700, fontSize: '1.15rem', border: 'none', cursor: 'pointer', maxWidth: '98vw' }}>Start Battle</button>
        </div>
          {player1Current && player2Current && (
            <div className="compare-flex" style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 32 }}>
              <div className="compare-card" style={{ flex: 1, minWidth: 320, maxWidth: 340, background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px rgba(60,60,120,0.10)', padding: 18, color: '#232323', maxWidth: '98vw' }}>
                <h3 style={{ textAlign: 'center', marginBottom: 8 }}>Player 1</h3>
                <img src={player1Stats.image || fallbackImg} alt={player1Stats.name} style={{ width: 90, height: 90, objectFit: 'contain', marginBottom: 8 }} onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }} />
                <div style={{ fontWeight: 700 }}>{player1Stats.name}</div>
                <div>HP: {player1Stats.hp} | ATK: {player1Stats.attack} | DEF: {player1Stats.defense} | SPD: {player1Stats.speed}</div>
              </div>
              <div className="compare-card" style={{ flex: 1, minWidth: 320, maxWidth: 340, background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px rgba(60,60,120,0.10)', padding: 18, color: '#232323', maxWidth: '98vw' }}>
                <h3 style={{ textAlign: 'center', marginBottom: 8 }}>Player 2</h3>
                <img src={player2Stats.image || fallbackImg} alt={player2Stats.name} style={{ width: 90, height: 90, objectFit: 'contain', marginBottom: 8 }} onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }} />
                <div style={{ fontWeight: 700 }}>{player2Stats.name}</div>
                <div>HP: {player2Stats.hp} | ATK: {player2Stats.attack} | DEF: {player2Stats.defense} | SPD: {player2Stats.speed}</div>
              </div>
            </div>
          )}
        {player1Current && player2Current && round <= 3 && !winner && (
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <button className="compare-btn" onClick={handleNextRound} style={{ padding: '12px 38px', borderRadius: 12, background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', color: '#fff', fontWeight: 700, fontSize: '1.15rem', border: 'none', cursor: 'pointer', maxWidth: '98vw' }}>Next Round</button>
              <div style={{ marginTop: 12, fontWeight: 600 }}>Current Round: {round}</div>
            </div>
        )}
        {battleLog.length > 0 && (
            <div style={{ margin: '24px auto', maxWidth: 600, background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px rgba(60,60,120,0.10)', padding: 18, color: '#232323', maxWidth: '98vw' }}>
            <h4 style={{ marginBottom: 12 }}>Battle Log</h4>
            {battleLog.map((log, idx) => <div key={idx}>{log}</div>)}
          </div>
        )}
        {winner && <div style={{ textAlign: 'center', marginTop: 32, fontSize: '1.5rem', fontWeight: 700, color: '#6366f1' }}>{winner}</div>}
        {(error.some(e => e)) && <div style={{ color: 'red', textAlign: 'center', marginTop: 18 }}>{error.filter(e => e).join(', ')}</div>}
      </div>
    </>
  );
};

export default Compare;

import {useEffect, useState} from 'react'
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const feachPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //詳細なデータを取得
      loadPokemon(res.results);
      console.log(res.results);
      setLoading(false);
    };
    feachPokemonData();
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(pokemon => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setData(_pokemonData);
  };
  console.log(data);
  return (
    <div className="App">
      {loading ? (
        <h1>ローディング中・・・</h1>
      ) : (
        <>
          <h1>ポケモンデータを取得しました</h1>
        </>
      )}
    </div>
  );
}

export default App;

import "./App.css";
import { useState } from "react";
import Axios from "axios";
function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonchosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stats,
          attack: response.data.stats[1].base_stats,
          defense: response.data.stats[2].base_stats,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };
  return (
    <div className="App">
      <div className="Title">
        <h1>Pokemon Info</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search</button>
      </div>
      <div className="DisplaySection">
        {!pokemonchosen ? (
          <h1>Please chose a pokemon</h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img}></img>
            <h2>Species:{pokemon.species}</h2>
            <h2>Type:{pokemon.type}</h2>
            <h2>Hp:{pokemon.hp}</h2>
            <h2>Attack:{pokemon.attack}</h2>
            <h2>Defense:{pokemon.defense}</h2>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

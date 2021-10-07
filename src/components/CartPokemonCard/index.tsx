import Image from "next/image";

import { BsTrash } from "react-icons/bs";

import styles from "./cart-pokemon-card.module.scss";

type PokemonProfileInCart = {
  name: string;
  pokemonImg: string;
  attributes: string[];
  abilities: string[];
  amount?: number;
};

interface CartPokemonCardProps {
  pokemon: PokemonProfileInCart;
  removePokemonInCart: (pokemonProfile: PokemonProfileInCart) => void;
  updatePokemonAmount: (pokemonName: string, amount: number) => void;
}

export function CartPokemonCard({
  pokemon,
  removePokemonInCart,
  updatePokemonAmount,
}: CartPokemonCardProps) {
  const handlingIncrementAmount = () => {
    const sum = pokemon.amount + 1;

    updatePokemonAmount(pokemon.name, sum);
  };

  const handlingDecrementAmount = () => {
    const sub = pokemon.amount - 1;

    updatePokemonAmount(pokemon.name, sub);
  };

  return (
    <div className={styles.container}>
      <div className={styles.trashCan}>
        <button onClick={() => removePokemonInCart(pokemon)}>
          <BsTrash />
          <span>remove</span>
        </button>
      </div>
      <div className={styles.pokemonImg}>
        <Image
          src={pokemon.pokemonImg}
          width={60}
          height={50}
          alt={`pokemon ${pokemon.name}`}
        />
      </div>
      <div className={styles.pokemonContent}>
        <p>{pokemon.name}</p>
        <div className={styles.pokemonCount}>
          <button
            onClick={() => handlingDecrementAmount()}
            disabled={pokemon.amount === 1}
          >
            -
          </button>
          <span>{pokemon.amount}</span>
          <button onClick={() => handlingIncrementAmount()}>+</button>
        </div>
      </div>
      <div className={styles.pokemonInfo}>
        <div className={styles.stats}>
          <div>
            <ul>
              <li>
                <span>hp</span>
              </li>
              <li>
                <span>atk</span>
              </li>
              <li>
                <span>def</span>
              </li>
              <li>
                <span>sp</span>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              {pokemon.attributes.map((att, index) => {
                return <li key={index}>{att}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className={styles.abilities}>
          <span>Abilities:</span> {pokemon.abilities.join(", ")}
        </div>
      </div>
    </div>
  );
}

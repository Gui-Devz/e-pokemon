import { createContext, ReactNode, useContext, useState } from "react";

type PokemonProfile = {
  name: string;
  pokemonImg: string;
  attributes: string[];
  abilities: string[];
  amount: number;
};

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  pokemonProfile: number;
  amount: number;
}

interface CartContextData {
  cart: PokemonProfile[];
  addPokemonInCart: (pokemonProfile: PokemonProfile) => void;
  removePokemonInCart: (pokemonProfile: PokemonProfile) => void;
  //updatePokemonAmount: ({ pokemonProfile, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<PokemonProfile[]>(() => {
    const storagedCart = localStorage.getItem("@IZA:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addPokemonInCart = (pokemonProfile) => {
    const pokemonExistsInCart = cart.some(
      (pokemon) => pokemonProfile.name === pokemon.name
    );

    if (!pokemonExistsInCart) {
      const pokemonProfileFormatted = {
        ...pokemonProfile,
        amount: 1,
      };

      setCart([...cart, pokemonProfileFormatted]);

      localStorage.setItem(
        "@IZA:cart",
        JSON.stringify([...cart, pokemonProfileFormatted])
      );

      return;
    }

    //We need to identify the pokemon in the cart in order to update his amount.
    //And we need to add the updated pokemon at his previous position in cart.
    const cartFiltered = cart.filter(
      (pokemon) => pokemon.name !== pokemonProfile.name
    );
    let pokemonIndex = 0;
    let pokemonWithRightAmount = cart.filter((pokemon, index) => {
      if (pokemon.name === pokemonProfile.name) {
        pokemonIndex = index;
        return true;
      }
      return false;
    });

    pokemonWithRightAmount[0] = {
      ...pokemonWithRightAmount[0],
      amount: pokemonWithRightAmount[0].amount + 1,
    };

    cartFiltered.splice(pokemonIndex, 0, pokemonWithRightAmount[0]);

    setCart(cartFiltered);
    localStorage.setItem("@IZA:cart", JSON.stringify(cartFiltered));
  };

  const removePokemonInCart = (pokemonProfile) => {
    const cartFiltered = cart.filter(
      (pokemon) => pokemon.name !== pokemonProfile.name
    );
    /* const passed = cart.find((pokemon) => pokemon.name === pokemonProfile.name);
    if (passed) {
      setCart(cartFiltered);
      localStorage.setItem("@IZA:cart", JSON.stringify(cartFiltered));
    } */
    setCart(cartFiltered);
    localStorage.setItem("@IZA:cart", JSON.stringify(cartFiltered));

    return;
  };

  return (
    <CartContext.Provider
      value={{ cart, addPokemonInCart, removePokemonInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}

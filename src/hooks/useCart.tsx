import { createContext, ReactNode, useContext, useState } from "react";

type PokemonProfile = {
  name: string;
  pokemonImg: string;
  attributes: string[];
  abilities: string[];
  amount?: number;
};

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  pokemonName: string;
  amount: number;
}

interface CartContextData {
  cart: PokemonProfile[];
  addPokemonInCart: (pokemonProfile: PokemonProfile) => void;
  removePokemonInCart: (pokemonProfile: PokemonProfile) => void;
  updatePokemonAmount: (pokemonName: string, amount: number) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<PokemonProfile[]>(() => {
    const storagedCart =
      typeof window !== "undefined" ? localStorage.getItem("@IZA:cart") : null;

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addPokemonInCart = (pokemonProfile: PokemonProfile) => {
    const pokemonExistsInCart = cart.some(
      (pokemon) => pokemonProfile.name === pokemon.name
    );

    if (!pokemonExistsInCart) {
      const pokemonProfileFormatted = {
        ...pokemonProfile,
        amount: 1,
      };

      setCart([...cart, pokemonProfileFormatted]);

      localStorage?.setItem(
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
    localStorage?.setItem("@IZA:cart", JSON.stringify(cartFiltered));
  };

  const removePokemonInCart = (pokemonProfile: PokemonProfile) => {
    const cartFiltered = cart.filter(
      (pokemon) => pokemon.name !== pokemonProfile.name
    );

    setCart(cartFiltered);
    localStorage?.setItem("@IZA:cart", JSON.stringify(cartFiltered));

    return;
  };

  const updatePokemonAmount = async (pokemonName: string, amount: number) => {
    const cartFiltered = cart.filter((pokemon) => pokemon.name !== pokemonName);

    /* This code block guarantees the order of the pokemons in the cart
    won't change. */
    let productIndex = 0;
    let productAmount = cart.filter((pokemon, index) => {
      if (pokemon.name === pokemonName) {
        productIndex = index;
        return true;
      }
      return false;
    });

    if (amount < 1) {
      return;
    }
    productAmount[0] = {
      ...productAmount[0],
      amount: amount,
    };

    cartFiltered.splice(productIndex, 0, productAmount[0]);

    //updating the cart with the right amount of the pokemon.
    //updating the localStorage as well.
    setCart(cartFiltered);
    localStorage.setItem("@IZA:cart", JSON.stringify(cartFiltered));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addPokemonInCart,
        removePokemonInCart,
        updatePokemonAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}

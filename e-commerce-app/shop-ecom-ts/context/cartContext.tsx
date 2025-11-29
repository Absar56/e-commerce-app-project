import React, { createContext, useContext, useReducer } from "react";

type CartItem = { id:number; name:string; price:number; qty:number; image:string };
type State = { items: Record<number, CartItem> };
type Action =
  | { type: "ADD"; product: any }
  | { type: "INC"; id:number }
  | { type: "DEC"; id:number }
  | { type: "REMOVE"; id:number }
  | { type: "CLEAR" };

const initialState: State = { items: {} };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const p = action.product;
      const existing = state.items[p.id];
      const qty = existing ? existing.qty + 1 : 1;
      return { items: { ...state.items, [p.id]: { id: p.id, name: p.name, price: p.price, qty, image: p.image } } };
    }
    case "INC": {
      const it = state.items[action.id];
      if (!it) return state;
      return { items: { ...state.items, [action.id]: { ...it, qty: it.qty + 1 } } };
    }
    case "DEC": {
      const it = state.items[action.id];
      if (!it) return state;
      if (it.qty <= 1) {
        const next = { ...state.items };
        delete next[action.id];
        return { items: next };
      }
      return { items: { ...state.items, [action.id]: { ...it, qty: it.qty - 1 } } };
    }
    case "REMOVE": {
      const next = { ...state.items };
      delete next[action.id];
      return { items: next };
    }
    case "CLEAR":
      return { items: {} };
    default:
      return state;
  }
}

const CartContext = createContext<any>(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalItems = Object.values(state.items).reduce((s:any, it:any) => s + it.qty, 0);
  const totalPrice = Object.values(state.items).reduce((s:any, it:any) => s + it.qty * it.price, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  original_total: 0,
  final_total: 0

}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const existingItems = state.items.find((items) => items.id == payload.id);
      if (existingItems) {

        existingItems.qty++

      } else {
        state.items.push(payload);

      }
      state.original_total += Number(payload.original_price);
      state.final_total += Number(payload.final_price);

      localStorage.setItem("cart", JSON.stringify(state))


    },
    emptyCart: (state) => {
      state.final_total = 0;
      state.original_total = 0;
      state.items = [];
      localStorage.removeItem("cart");

    },
     clearUser: (state) => {
      state.user = null;
    },
    qtyChange: (state, { payload }) => {
      const cartItems = state.items.find(
        (item) => item.id == payload.id
      );

      if (!cartItems) return;

      if (payload.flag == "inc") {
        cartItems.qty++;

        state.original_total += Number(cartItems.original_price);
        state.final_total += Number(cartItems.final_price);

      } else {
        if (cartItems.qty > 1) {
          cartItems.qty--;

          state.original_total -= Number(cartItems.original_price);
          state.final_total -= Number(cartItems.final_price);

        } else {
          state.original_total -= Number(cartItems.original_price);
          state.final_total -= Number(cartItems.final_price);

          state.items = state.items.filter(
            (item) => item.id !== payload.id
          );
        }
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
    lsToCart: (state) => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        state.items = cart.items;
        state.final_total = Number(cart.final_total);
        state.original_total = Number(cart.original_total);

      }
    },
   setCart: (state, { payload }) => {
  state.items = payload.items.map((item) => ({
    id: item.productId._id,
    name: item.productId.name,
    original_price: item.productId.original_price,
    final_price: item.productId.final_price,
    discountPercentage: item.productId.discountPercentage,
    thumbnail: item.productId.thumbnail,
    qty: item.qty
  }));

  state.original_total = state.items.reduce(
    (acc, item) => acc + item.original_price * item.qty,
    0
  );

  state.final_total = state.items.reduce(
    (acc, item) => acc + item.final_price * item.qty,
    0
  );

  localStorage.setItem("cart", JSON.stringify(state));
}

  },
})


export const { addToCart, emptyCart, qtyChange, lsToCart, setCart,clearUser } = cartSlice.actions

export default cartSlice.reducer
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { jewelry, mens_wear, womens_wear, electronics } from "../assets";
interface CartItemProps {
  category: string;
  image: any;
  title: string;
  price: number;
  quantity: number;
  id: number;
}
type InitialState = {
  categories: any[];
  products: any[];
  cartItems: any[];
  itemsInCart: number;
  totalAmount: number;
};
const initialState: InitialState = {
  categories: [
    {
      name: `men's clothing`,
      id: "mens_clothing",
      cover: mens_wear,
    },
    {
      name: `women's clothing`,
      id: "womens_clothing",
      cover: womens_wear,
    },
    {
      name: `electronics`,
      id: "electronics",
      cover: electronics,
    },
    {
      name: `jewelery`,
      id: "jewelry",
      cover: jewelry,
    },
  ],
  products: [],
  cartItems: [],
  itemsInCart: 0,
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart-slice",
  initialState,
  reducers: {
    writeProducts: (state, action) => {
      state.products = action.payload;
    },
   
    addItemToCart: (state, action) => {
      const itemToAdd = action.payload;
      const existingItem: any = state.cartItems.find(
        (item: CartItemProps) => item.id === itemToAdd.id
      );
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + itemToAdd.quantity;
        state.itemsInCart = state.itemsInCart + itemToAdd.quantity;
        state.totalAmount =
          state.totalAmount + itemToAdd.quantity * itemToAdd.price;
      }
      if (!existingItem) {
        state.cartItems.push(itemToAdd);
        state.itemsInCart = state.itemsInCart + itemToAdd.quantity;
        state.totalAmount =
          state.totalAmount + itemToAdd.price * itemToAdd.quantity;
      }
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const itemToDelete: any = state.cartItems.find(
        (item: CartItemProps) => item.id === id
      );
      state.cartItems = state.cartItems.filter(
        (item: CartItemProps) => item.id !== id
      );
      state.itemsInCart = state.itemsInCart - itemToDelete.quantity;
      state.totalAmount =
        state.totalAmount - itemToDelete.quantity * itemToDelete.price;
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const itemToIncrement: any = state.cartItems.find(
        (item: CartItemProps) => item.id === id
      );
      itemToIncrement.quantity = itemToIncrement.quantity + 1;
      state.totalAmount = state.totalAmount + itemToIncrement.price;
      state.itemsInCart = state.itemsInCart + 1;
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const itemToDecrement: any = state.cartItems.find(
        (item: CartItemProps) => item.id === id
      );
      itemToDecrement.quantity = itemToDecrement.quantity - 1;
      state.totalAmount = state.totalAmount - itemToDecrement.price;
      state.itemsInCart = state.itemsInCart - 1;
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.itemsInCart = 0;
    },
  },
});

const store = configureStore({
  reducer: cartSlice.reducer,
});

export const cartActions = cartSlice.actions;
export default store;

import {createSlice} from '@reduxjs/toolkit';
const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[]
    },
    reducers:{
        addtoCart:(state,action)=>{
            state.cart.push(action.payload)
        },

        // addtoDelete: (state, action) => {
        //     const itemIdToDelete = action.payload.itemId;
        //     console.log('Current Cart State:', state.cart);
        //     state.cart = state.cart.filter(item => item._id !== itemIdToDelete);
        //     console.log('Updated Cart State:', state.cart);
        //   },
        addtoDelete: (state, action) => {
            state.cart = state.cart.filter(item => item.item._id !== action.payload.item.item._id);
            console.log('Updated Cart State:', state.cart);
          },
          editCartItem: (state, action) => {
            const { _id, updatedItem } = action.payload;
            // Find the item in the cart and update it
            state.cart = state.cart.map(item => {
              if (item._id === _id) {
                return { ...item, ...updatedItem };
              }
              return item;
            });
          },
          

    }
})
export default cartSlice.reducer;
export const {addtoCart,addtoDelete, editCartItem} = cartSlice.actions;

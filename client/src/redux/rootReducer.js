// const storedCartItems = localStorage.getItem("cartItems");
// console.log("fyut7");
// console.log(storedCartItems);
// const intialState = {
//   loading: false, 
//   // cartItems:[],
//   cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
// };

// export const rootReducer = (state = intialState, action) => {
//   switch (action.type) {
//     case "AddToCart":
//       // return {
//       //   ...state,
//       //   cartItems: [...state.cartItems, action.payload],
//       // };
//       return {
//         ...state,
//         cartItems: [...(state.cartItems || []), action.payload], // Ensure cartItems is an array
//       };
//     default:
//       return state;
//   } 
// };

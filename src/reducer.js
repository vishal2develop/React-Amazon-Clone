// data layout
export const initialState = {
  basket: [],
  user: null,
};

// reducer - used to push and pull data from context

export const getBasketTotal = (basket) => {
  return basket?.reduce((amount, item) => item.price + amount, 0);
};

const reducer = (state, action) => {
  //console.log(action);

  switch (action.type) {
    case "ADD_TO_BASKET":
      // return original state, with basket changed
      // basket contains - previous basket + new item
      return { ...state, basket: [...state.basket, action.item] };

    case "REMOVE_FROM_BASKET":
      // find the index of basket item with the id to be removed
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove  product (id: ${action.id}) as its not in basket`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export default reducer;

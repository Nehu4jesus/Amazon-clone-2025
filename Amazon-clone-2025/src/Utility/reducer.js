import { Type } from "./action.type";

export const initialState = { basket: [], user: null };
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return {
          ...state,
          basket: updatedBasket,
        };
      }
    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(item => item.id === action.id);
      if (index >= 0) {
        if (state.basket[index].amount > 1) {
          const updatedBasket = state.basket.map((item, i) =>
            i === index ? { ...item, amount: item.amount - 1 } : item
          );
          return {
            ...state,
            basket: updatedBasket,
          };
        } else {
          const updatedBasket = state.basket.filter((_, i) => i !== index);
          return {
            ...state,
            basket: updatedBasket,
          };
        }
      }
      return {
        ...state,
        basket: state.basket, // Return original state if no item was removed
      };
      
        case Type.SET_USER:
          return {
            ...state,
            user: action.user,
          };
      

    default:
      return state;
  }
};
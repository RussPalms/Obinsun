import { useReducer, useEffect } from 'react';
import { hasStripe } from '../lib/has-stripe';

const initialState = {
  cart: {
    items: {
      count: 0,
      items: [],
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error(`No such action ${action.type}`);
  }
};

const useStripeCount = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (hasStripe) {
      //   const unsubscribe = window.Stripe.store.subscribe(() => {
      //     const itemsCount = window.Stripe.store.getState();
      //     dispatch({ type: "SET", payload: itemsCount });
      //   });
      //   return unsubscribe;
    }
  }, []);

  return state;
};

export default useStripeCount;

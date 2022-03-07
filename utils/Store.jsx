import Cookies from 'js-cookie';
import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useReducer, useEffect } from 'react';
import styles from './langStyle.module.css';

export const Store = createContext();

export const ACTION_TYPES = {
  DARK_MODE: 'dark_mode',
  LIGHT_MODE: 'light_mode',
  LANG_EN: 'en',
  LANG_HE: 'he',
  ADD_TO_CART: 'add_to_cart',
};

function reducer(state, action) {
  // console.log(action.type);
  switch (action.type) {
    case ACTION_TYPES.DARK_MODE:
      return { ...state, darkMode: 1 };

    case ACTION_TYPES.LIGHT_MODE:
      return { ...state, darkMode: 0 };

    case ACTION_TYPES.LANG_EN:
      return { ...state, lang: 'en' };

    case ACTION_TYPES.LANG_HE:
      return { ...state, lang: 'he' };

    case ACTION_TYPES.ADD_TO_CART: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);
      const cartItems = existItem
        ? state.cart.cartItems.map((item) => (item._id === newItem._id ? { ...newItem, quantity: item.quantity + 1 } : item))
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  const cartItems = Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [];
  const initialState = { darkMode: 1, lang: 'en', cart: { cartItems } };

  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => dispatch({ type: Cookies.get('darkMode') === 'ON' ? ACTION_TYPES.DARK_MODE : ACTION_TYPES.LIGHT_MODE }), []);

  const theme = createTheme({
    direction: 'rtl',
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    styling: {
      boxShadow: '3px 3px 16px #26262640',
      bg: '#330099',
    },
    palette: {
      mode: state.darkMode ? 'dark' : 'light',
      primary: {
        main: '#330033',
      },
      secondary: {
        main: '#ff9900',
      },
      lang: state.lang,
    },
  });

  return (
    <Store.Provider value={value}>
      <ThemeProvider theme={theme}>
        <span className={state.lang == 'he' ? styles.he : styles.en}>{children}</span>
      </ThemeProvider>
    </Store.Provider>
  );
}

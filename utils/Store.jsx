import Cookies from 'js-cookie';
import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useReducer, useEffect } from 'react';
import styles from './langStyle.module.css';
import { apiReq, setToken } from '../functions/apiFunction';

export const Store = createContext();

export const ACTION_TYPES = {
  DARK_MODE: 'dark_mode',
  LIGHT_MODE: 'light_mode',
  LANG_EN: 'en',
  LANG_HE: 'he',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_ITEM: "remove item",
  CLEAR_CART: "clear cart",
  USER_LOGIN: "user login",
  USER_LOGOUT: "user logout",
  SAVE_ADDRESS_SHIPPING: "save shipping address",
  SAVE_PAYMENT_METHOD: "save payment method"
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.DARK_MODE: {
      Cookies.set('darkMode', "on");
      return { ...state, darkMode: 1 };
    }

    case ACTION_TYPES.LIGHT_MODE: {
      Cookies.remove('darkMode');
      return { ...state, darkMode: 0 };
    }

    case ACTION_TYPES.LANG_EN: {
      Cookies.set('lang', "en");
      return { ...state, lang: 'en' };
    }

    case ACTION_TYPES.LANG_HE: {
      Cookies.set('lang', "he");
      return { ...state, lang: 'he' };
    }

    case ACTION_TYPES.ADD_TO_CART: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);
      const cartItems = existItem
        ? state.cart.cartItems.map((item) => (item._id === newItem._id ? { ...newItem, quantity: newItem.quantity } : item))
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case ACTION_TYPES.REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter((i) => i._id !== action.payload._id);
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case ACTION_TYPES.CLEAR_CART: {
      Cookies.remove('cartItems');
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    case ACTION_TYPES.USER_LOGIN: {
      Cookies.set('user', JSON.stringify(action.payload));
      setToken(action.payload.token)
      return { ...state, user: action.payload }
    }

    case ACTION_TYPES.USER_LOGOUT: {
      Cookies.remove('user');
      Cookies.set('cartItems', JSON.stringify([]));
      return { ...state, user: null, cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" } }
    }

    case ACTION_TYPES.SAVE_ADDRESS_SHIPPING: {
      Cookies.set('shippingAddress', JSON.stringify(action.payload));
      return { ...state, cart: { ...state.cart, shippingAddress: action.payload } }
    }

    case ACTION_TYPES.SAVE_PAYMENT_METHOD: {
      Cookies.set('payMethod', action.payload);
      return { ...state, cart: { ...state.cart, paymentMethod: action.payload } }
    }

    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  const cartItems = Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
    user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
    shippingAddress = Cookies.get('shippingAddress') ? JSON.parse(Cookies.get('shippingAddress')) : null,
    paymentMethod = Cookies.get('payMethod') ? Cookies.get('payMethod') : "",
    initialState = { darkMode: 0, lang: "en", cart: { cartItems, shippingAddress, paymentMethod }, user };

  const [state, dispatch] = useReducer(reducer, initialState),
    value = { state, dispatch };

  // useEffect(() => state.user && setToken(state.user.token), [state.user]);
  useEffect(() => {
    if (state.user) {
      setToken(state.user.token)
      apiReq({ path: "/users/auth", method: "post" }).then(
        data => !data.success && dispatch({ type: ACTION_TYPES.USER_LOGOUT }))
      // apiReq({ path: "/seed", method: "get" })
    }
  }, [state.user]);

  useEffect(() => Cookies.get('darkMode') === "on" && dispatch({ type: ACTION_TYPES.DARK_MODE }), []);
  useEffect(() => Cookies.get('lang') === "he" && dispatch({ type: ACTION_TYPES.LANG_HE }), []);

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
      // ...(!state.darkMode
      //   ? {
      //     background: {
      //       default: "#fff",
      //       paper: "#909090",
      //       card: "#fff"
      //     },
      //   }
      //   : {

      //     text: {
      //       primary: '#fff',
      //       secondary: '#f5f5f5',
      //     },
      //   }),
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

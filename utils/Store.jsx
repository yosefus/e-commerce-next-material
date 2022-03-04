import Cookies from 'js-cookie';
import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useReducer, useEffect } from 'react';
import styles from './langStyle.module.css';

export const Store = createContext();

const initialState = {
  darkMode: 1,
  lang: 'en',
};

export const ACTION_TYPES = {
  DARK_MODE: 'dark_mode',
  LIGHT_MODE: 'light_mode',
  LANG_EN: 'en',
  LANG_HE: 'he',
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
    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
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
      mode: state.darkMode === 1 ? 'dark' : 'light',
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
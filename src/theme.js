import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5',
      light: '#818CF8',
      dark: '#3730A3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#14B8A6',
      light: '#5EEAD4',
      dark: '#0F766E',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F5F6FC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E2233',
      secondary: '#5B6178',
    },
    divider: 'rgba(79, 70, 229, 0.12)',
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "'Nunito', sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shadows: [
    'none',
    '0 2px 8px rgba(31, 41, 82, 0.06)',
    '0 4px 14px rgba(31, 41, 82, 0.08)',
    '0 6px 18px rgba(31, 41, 82, 0.09)',
    '0 8px 24px rgba(31, 41, 82, 0.10)',
    '0 10px 28px rgba(31, 41, 82, 0.10)',
    '0 12px 32px rgba(31, 41, 82, 0.11)',
    '0 14px 34px rgba(31, 41, 82, 0.11)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
    '0 16px 36px rgba(31, 41, 82, 0.12)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F5F6FC',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingTop: 10,
          paddingBottom: 10,
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #6D28D9 100%)',
          boxShadow: '0 8px 20px rgba(79, 70, 229, 0.25)',
          '&:hover': {
            backgroundImage:
              'linear-gradient(135deg, #4338CA 0%, #5B21B6 100%)',
            boxShadow: '0 10px 24px rgba(79, 70, 229, 0.32)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(90deg, #4338CA 0%, #6D28D9 100%)',
        },
      },
    },
  },
});

export default theme;

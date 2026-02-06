import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1C53A0',
            50: '#D4E3F7',
            100: '#A8C6F0',
            200: '#7DAAE8',
            300: '#528DE0',
            400: '#2671D9',
            500: '#1C53A0',
            600: '#174482',
            700: '#13386C',
            800: '#0F2D57',
            900: '#0B2241',
        },
        secondary: {
            main: '#E5BD19',
            50: '#FCF8E8',
            100: '#F9F1D2',
            200: '#F5E4A3',
            300: '#F0D775',
            400: '#EBCA47',
            500: '#E5BD19',
            600: '#B89714',
            700: '#746325',
            800: '#5C4B0A',
            900: '#453908',
        },
    },
    typography: {
        fontFamily: '"Noto Sans", system-ui, sans-serif',
    },
});

export default theme;

// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#FF9839',
        },
    },
    shape: {
        borderRadius: 8,
    },
});

export default theme;

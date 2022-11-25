import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import React from 'react';

type themeProps = {
    children : JSX.Element
}

export enum themePalette {
    BG = '#f0f2f5',
    LIME = '#0B5D1E',

    // Alert styles
    ERROR_MAIN = '#f44336',
    ERROR_BG = '#ff978f',
    SUCCESS_MAIN = '#66bb6a',
    SUCCESS_BG = 'rgba(102, 187, 106, 0.1)',

    TEXT_PRIMARY = '#113650',
    TEXT_SECONDARY = '#373e44',

    BORDER= '#f1f1f1',
}

const theme = createTheme({
    palette : {
        mode: 'light',
        background: {
            default: themePalette.BG
        },
        primary: {
            main: themePalette.LIME
        },
        text: {
            primary: themePalette.TEXT_PRIMARY,
            secondary: themePalette.TEXT_SECONDARY
        },
    },
    components: {
        MuiPaper:{
            styleOverrides: {
                root: {
                    border: `1px solid ${themePalette.BORDER}`
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    boxShadow: 'none',
                    borderRadius: '0.5em'
                }
            }
        },
        MuiButtonBase: {
            defaultProps:{
                style: {
                    textTransform: 'none',
                    boxShadow: 'none',
                    borderRadius: '0'
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    fontSize: '1em'
                },
                standardError: {
                    border: `1px solid ${themePalette.ERROR_MAIN}`,
                },
                standardSuccess: {
                    border: `1px solid ${themePalette.SUCCESS_MAIN}`
                }
            },            
        }
    }
});

export const ThemeConfig : React.FC<themeProps> = ({children}) => {
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
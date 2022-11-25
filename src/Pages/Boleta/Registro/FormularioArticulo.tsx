import React, { useContext } from 'react'
import { Divider, FormControlLabel, FormGroup, Grid, MenuItem, Stack, Switch, TextField, TextFieldProps, Typography } from '@mui/material'


import { FormularioWrapper } from './FormularioWrapper';
import { Boleta } from '../../../models/Boleta';


import ArticleIcon from '@mui/icons-material/Article';
import { ArticuloSlt } from './InputsAPI/ArticuloSlt';

type FormularioArticuloProps = {
    boleta : Boleta,
    handleBoletaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

export const FormularioArticulo : React.FC<FormularioArticuloProps> = ({ boleta, handleBoletaChange }) => {
    


    return (
        <FormularioWrapper>

            <Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <ArticleIcon sx={{fontSize: '2.5em'}} />
                    <Typography variant='h6'>
                        Articulo
                    </Typography>
                </Stack>
                <Divider />
            </Stack>

            
            <ArticuloSlt 
                value={ boleta.articulo }
                name='articulo'
                label='Articulo'
                handleBoletaChange={handleBoletaChange}
            />

        </FormularioWrapper>
    )
}

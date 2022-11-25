import React from 'react'
import { Divider, Stack, TextField, Typography } from '@mui/material'
import { Boleta } from '../../../models/Boleta'
import { FormularioWrapper } from './FormularioWrapper'

import ArticleIcon from '@mui/icons-material/Article';
import { getDateToInput } from '../../../utils/Formats';
import { TipoFirmaSlt } from './InputsAPI/TipoFirmaSlt';

type FormularioBoletaProps = {
    boleta : Boleta,
    handleBoletaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const FormularioBoleta : React.FC<FormularioBoletaProps> = ({ boleta, handleBoletaChange }) => {
    return (
        <FormularioWrapper>
            
            <Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <ArticleIcon sx={{fontSize: '2.5em'}} />
                    <Typography variant='h6'>
                        Boleta
                    </Typography>
                </Stack>
                <Divider />
            </Stack>

            <TextField
                size='small'
                type='tel'
                label='No. Boleta'
                placeholder='1'
                name='noboleta'
                value={boleta.noboleta}
                onChange={ handleBoletaChange }
            />
            
            <TextField
                size='small'
                type='datetime-local'
                label='Fecha y hora'
                name='fecha'
                value={getDateToInput( boleta.fecha )}
                onChange={ handleBoletaChange }
            />

            <TipoFirmaSlt 
                value={ boleta.firma }
                name='firma'
                label='Firma'
                handleBoletaChange={handleBoletaChange}
            />

            <TextField
                size='small'
                type='text'
                label='Dirección'
                placeholder='San José Pinula'
                name='lugar'
                value={ boleta.lugar }
                onChange={ handleBoletaChange }
            />

        </FormularioWrapper>
    )
}

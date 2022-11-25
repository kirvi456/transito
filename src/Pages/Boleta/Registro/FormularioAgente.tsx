import React, { useContext } from 'react'
import { Divider, FormControlLabel, FormGroup, Grid, MenuItem, Stack, Switch, TextField, TextFieldProps, Typography } from '@mui/material'


import { FormularioWrapper } from './FormularioWrapper';
import { Boleta } from '../../../models/Boleta';



import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { AgenteSlt } from './InputsAPI/AgentesSlt';

type FormularioAgenteProps = {
    boleta : Boleta,
    handleBoletaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

export const FormularioAgente : React.FC<FormularioAgenteProps> = ({ boleta, handleBoletaChange }) => {
    


    return (
        <FormularioWrapper>

            <Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <LocalPoliceIcon sx={{fontSize: '2.5em'}} />
                    <Typography variant='h6'>
                        Agente
                    </Typography>
                </Stack>
                <Divider />
            </Stack>

            
            <AgenteSlt 
                value={ boleta.agente }
                name='agente'
                label='Agente'
                handleBoletaChange={handleBoletaChange}
            />

        </FormularioWrapper>
    )
}

import React, { useState } from 'react'
import { Paper, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { HeaderFormulario } from './Formulario';
import { TipoBusquedaType } from './types';
import { Boleta, BoletaPopulated } from '../../../../models/Boleta';

type BuscadorHeaderProps = {
    setNuevasBoletas : ( nuevasBoletas : BoletaPopulated[] ) => void
}

export const BuscadorHeader : React.FC<BuscadorHeaderProps> = ({setNuevasBoletas}) => {

    const [tipoBusqueda, setTipoBusqueda] = useState<TipoBusquedaType>('boleta');

    const handleTipoBoleta = (
        event: React.MouseEvent<HTMLElement>,
        newTipoBusqueda: TipoBusquedaType,
    ) => {

        if( newTipoBusqueda ) {
            setTipoBusqueda(newTipoBusqueda)
            setNuevasBoletas([])
        }
    }    


    return (
        <Paper
            sx={{
                width: 600,
                maxWidth: '90%',
                p: 2
            }}
            elevation={10}
        >
            <Stack spacing={2}>
                <Stack alignItems='end'>
                    <ToggleButtonGroup
                        value={tipoBusqueda}
                        exclusive
                        onChange={ handleTipoBoleta }
                        aria-label="text alignment"
                        size='small'
                    >
                        <ToggleButton value='boleta' aria-label='número boleta'>
                            No. Boleta
                        </ToggleButton>
                        <ToggleButton value='conductor' aria-label='número boleta'>
                            Conductor
                        </ToggleButton>
                        <ToggleButton value='vehiculo' aria-label='número boleta'>
                            Vehiculo
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

                <HeaderFormulario
                    tipoBusqueda={ tipoBusqueda }
                    setNuevasBoletas={ setNuevasBoletas }
                />

            </Stack>
        </Paper>
    )
}

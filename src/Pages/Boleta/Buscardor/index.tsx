import React, { useState } from 'react'
import { BoletaPopulated } from '../../../models/Boleta';

import { Container, Stack } from '@mui/material'
import { BuscadorHeader } from './Header/BuscadorHeader';
import { BoletasList } from './BoletasList';

export const BuscadorPage = () => {
    
    const [boletas, setBoletas] = useState<BoletaPopulated[]>([]);
    
    const setNuevasBoletas = ( nuevasBoletas : BoletaPopulated[] ) => {
        setBoletas([...nuevasBoletas])
    }

    return (
        <Container sx={{pb: 3}}>
            <Stack alignItems='center' spacing={2}>
                <BuscadorHeader 
                    setNuevasBoletas={setNuevasBoletas}
                />    

                <BoletasList
                    boletas={boletas}
                />
            </Stack>
        </Container>
    )
}

import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useState } from 'react'
import { BoletaPopulated } from '../../../models/Boleta'
import { BoletaCard } from './BoletaCard'
import { NoBoletas } from './NoBoletas'

type BoletasListProps = {
    boletas: BoletaPopulated[]
}

type Filtro = 'PAGADA' | 'EMITIDA' | 'ANULADA';

export const BoletasList : React.FC<BoletasListProps> = ({ boletas }) => {

    const [filtros, setFiltros] = useState<Filtro[]>(['EMITIDA', 'PAGADA']);

    const handleFiltroChange = (
        event: React.MouseEvent<HTMLElement>,
        newFilters: Filtro[],
    ) => {
        setFiltros(newFilters);
    };

    const filteredBoletas = boletas.filter( el => filtros.includes( el.estado as 'EMITIDA') );

    return (
        <Stack spacing={2} sx={{maxWidth: '90%'}}>

            <Stack alignItems='end'>
                <ToggleButtonGroup
                    aria-label="text alignment"
                    size='small'
                    color="primary"
                    onChange={handleFiltroChange}
                    value={filtros}
                >
                    <ToggleButton value='EMITIDA' aria-label='boletas emitidas'>
                        Emitidas
                    </ToggleButton>
                    <ToggleButton value='PAGADA' aria-label='boletas pagadas'>
                        Pagadas
                    </ToggleButton>
                    <ToggleButton value='ANULADA' aria-label='boletas anuladas'>
                        Anuladas
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            {
                filteredBoletas.length === 0 
                ? <NoBoletas />
                : filteredBoletas.map( el => {
                    return (
                        <BoletaCard
                            key={el._id} 
                            boleta={el}
                        />
                    )
                })
            }

        </Stack>
    )
}

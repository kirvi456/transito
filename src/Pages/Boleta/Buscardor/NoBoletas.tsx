import { Stack, Typography } from '@mui/material'
import React from 'react'

import Empty from '../../../assets/svg/empty.svg'

export const NoBoletas = () => {
    return (
        <Stack spacing={2} alignItems='center' sx={{pt: 5, width: 600, maxWidth: '100%'}}>
            <img 
                src={Empty}
                alt='No se encontraron boletas'
                style={{
                    width: 250,
                    maxWidth: '60%'
                }}
            />
            <Typography>
                No se encontraron boletas
            </Typography>
        </Stack>

    )
}

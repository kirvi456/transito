import React, { ReactNode } from 'react'
import { Paper, Stack } from '@mui/material'

type FormularioWrapperProps = {
    children : ReactNode
}

export const FormularioWrapper : React.FC<FormularioWrapperProps> = ( { children } ) => {
    return (
        <Paper 
                sx={{
                    p: 2,
                    width: '600px',
                    maxWidth: '95%'
                }}
                elevation={10}
            >
                <Stack spacing={2}>
                    { children }
                </Stack>
            </Paper>
    )
}

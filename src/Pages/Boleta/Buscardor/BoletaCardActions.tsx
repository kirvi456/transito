import { IconButton, Stack, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../../auth'


import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';


export const BoletaCardActions = () => {
    
    const user = useContext( AuthContext )
    

    if( user.authState.user?.rol === 'ADMIN') return (
        <Stack direction='row' justifyContent='end'>
            <Tooltip title="Editar Boleta">
                <IconButton aria-label="editar" >
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Ver Boleta">
                <IconButton aria-label="ver" >
                    <RemoveRedEyeIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Borrar Boleta">
                <IconButton aria-label="borrar" >
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Stack>

    )
    
    if( user.authState.user?.rol === 'DIGITADOR') return (
        <Stack direction='row' justifyContent='end'>
            <Tooltip title="Ver Boleta">
                <IconButton aria-label="ver" >
                    <RemoveRedEyeIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    )

    return (<></>)
}

import { Button, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Write from '../../assets/svg/write.svg';
import { AuthContext } from '../../auth';


export const DigitadorHomePage = () => {
    
    const user = useContext( AuthContext );
    
    const navigate = useNavigate()

    const goToResgistrar = () => {
        navigate('/boleta/registrar')
    }

    return (
        <Stack alignItems='center' spacing={2} sx={{mt: '20vh'}}>
            <img 
                src={Write}
                style={{
                    width: '300px',
                    maxWidth: '90%',
                }}
                alt='Imagen escribir'
            />
            <Typography>
                Buenos dias {user.authState.user?.nombre}
            </Typography>
            <Button
                onClick={goToResgistrar}
            >
                Registrar Boletas
            </Button>
        </Stack>
    )
}

import { LoadingButton } from '@mui/lab'
import { Container, Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Boleta, EmptyBoleta, getEmptyBoleta } from '../../../models/Boleta'
import { Conductor } from '../../../models/Conductor'
import { Vehiculo } from '../../../models/Vehiculo'
import { esNumero } from '../../../utils/Checkers'
import { FormularioAgente } from './FormularioAgente'
import { FormularioArticulo } from './FormularioArticulo'
import { FormularioBoleta } from './FormularioBoleta'
import { FormularioConductor } from './FormularioConductor'
import { FormularioVehiculo } from './FormularioVehiculo'


import SaveIcon from '@mui/icons-material/Save';
import { useNotification } from '../../../hooks/useNotification'
import { registaraBoleta } from '../../../services/boleta'
import { URLSContext } from '../../../context/URLs.context'


export const BoletaRegistroPage = () => {

    const [boleta, setBoleta] = useState<Boleta>( getEmptyBoleta() )
    const [loading, setLoading] = useState<boolean>( false )

    const {openErrorNotification, openSuccessNotification } = useNotification();

    const URLS = useContext( URLSContext );

    const handleRegistrarBoleta = async () => {

        setLoading( true )

        const { result, message, payload } = await registaraBoleta( URLS.boleta, boleta );
    
        if( !result ) openErrorNotification( message )
        else {
            openSuccessNotification('Boleta Registrada');
            setBoleta( getEmptyBoleta() )
        }
        
        setLoading( false )
    }


    
    const setNuevoConductor = ( nuevoConductor : Conductor ) => {
        setBoleta( prev =>  ( { ...prev, conductor: { ...nuevoConductor } } ) )
    }

    const setNuevoVehiculo = ( nuevoVehiculo : Vehiculo ) => {
        setBoleta( prev =>  ( { ...prev, vehiculo: { ...nuevoVehiculo } } ) )
    }

    const handleBoletaChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        switch( e.target.name ) {
            case 'noboleta':
                if( esNumero( e.target.value ) )  boleta[e.target.name as 'noboleta'] = Number(e.target.value);
                break;
            case 'fecha':
                boleta.fecha = (new Date(e.target.value)).getTime();
                break;
            case 'conductor.nombre':
                boleta.conductor.nombre = e.target.value.toUpperCase();
                break;
            case 'conductor.tipolicencia':
                boleta.conductor.tipoLicencia = e.target.value;
                break;
            case 'conductor.nolicencia':
                boleta.conductor.noLicencia = e.target.value;
                break;
            case 'conductor.foliolicencia':
                boleta.conductor.folioLicencia = e.target.value;
                break;
            case 'conductor.licenciabloqueada':
                boleta.conductor.licenciaBloqueada = (e.target as HTMLInputElement).checked;
                break;
            case 'conductor.nit':
                boleta.conductor.nit = e.target.value;
                break;
            case 'conductor.genero':
                boleta.conductor.genero = e.target.value;
                break;
            case 'vehiculo.tipoplaca':
                boleta.vehiculo.tipoPlaca = e.target.value;
                break;
            case 'vehiculo.noplaca':
                boleta.vehiculo.noPlaca = e.target.value.toUpperCase();
                break;
            case 'vehiculo.tipovehiculo':
                boleta.vehiculo.tipo = e.target.value;
                break;
            case 'vehiculo.marcavehiculo':
                boleta.vehiculo.marca = e.target.value;
                break;
            case 'vehiculo.colorvehiculo':
                boleta.vehiculo.color = e.target.value;
                break;
            case 'vehiculo.notarjeta':
                boleta.vehiculo.noTarjeta = e.target.value.toUpperCase();
                break;
            default:
                boleta[e.target.name as 'firma'] = e.target.value;
        }
        setBoleta( prev => ( { ...prev, conductor: {...prev.conductor}, vehiculo: {...prev.vehiculo}  } ) )
    }

    return (
        <Container sx={{pb: 3}}>
            <Stack alignItems='center' spacing={2}>
                <Typography variant='h3'>
                    Registro de Multa de Tránsito
                </Typography>

                <FormularioBoleta 
                    boleta = { boleta }
                    handleBoletaChange={handleBoletaChange}
                />

                <FormularioConductor
                    boleta = { boleta }
                    handleBoletaChange={handleBoletaChange}
                    setNuevoConductor={setNuevoConductor}
                />
                
                <FormularioVehiculo
                    boleta = { boleta }
                    handleBoletaChange={handleBoletaChange}
                    setNuevoVehiculo={setNuevoVehiculo}
                />

                <FormularioAgente
                    boleta = { boleta }
                    handleBoletaChange={handleBoletaChange}
                />
                
                <FormularioArticulo
                    boleta = { boleta }
                    handleBoletaChange={handleBoletaChange}
                />

                <LoadingButton
                    variant='contained'
                    onClick={ handleRegistrarBoleta }
                    sx={{
                        width: '600px',
                        maxWidth: '95%'
                    }}
                    startIcon={<SaveIcon />}
                    loading={loading}
                >
                    Guardar
                </LoadingButton>
            </Stack>
        </Container>
    )

}

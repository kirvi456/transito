import React, { useContext, useState } from 'react'
import { Divider, FormControlLabel, FormGroup, Grid, MenuItem, Stack, Switch, TextField, TextFieldProps, Typography } from '@mui/material'


import { FormularioWrapper } from './FormularioWrapper';
import { Boleta } from '../../../models/Boleta';


import { FetchRequest } from '../../../utils/MakeRequest';
import { LoadingButton } from '@mui/lab';
import { URLSContext } from '../../../context/URLs.context';
import { Conductor } from '../../../models/Conductor';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SearchIcon from '@mui/icons-material/Search';
import { TipoPlacaSlt } from './InputsAPI/TipoPlacaSlt';
import { MarcaVehiculoSlt } from './InputsAPI/MarcaVehiculoSlt';
import { ColorVehiculoSlt } from './InputsAPI/ColorVehiculoSlt';
import { TipoVehiculoSlt } from './InputsAPI/TipoVehiculoSlt';
import { Vehiculo } from '../../../models/Vehiculo';

type FormularioVehiculoProps = {
    boleta : Boleta,
    handleBoletaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    setNuevoVehiculo: (nuevoVehiculo: Vehiculo) => void
}

export const FormularioVehiculo : React.FC<FormularioVehiculoProps> = ({ boleta, handleBoletaChange, setNuevoVehiculo }) => {
    
    const URLS = useContext( URLSContext )
    const [loading, setLoading] = useState<boolean>(false);


    const buscarConductor = async() => {
        setLoading(true)
        const { data, error } = await FetchRequest<{result: Vehiculo}>(`${URLS.vehiculo}?tipoPlaca=${boleta.vehiculo.tipoPlaca}&noPlaca=${boleta.vehiculo.noPlaca}`, 'GET', undefined);
        if ( !data || !data.result ||  error ) {
            setNuevoVehiculo( { _id: '', tipoPlaca: '', noPlaca: boleta.vehiculo.noPlaca, tipo: '', marca: '', color: '', noTarjeta: '' } )
            setLoading( false )
            return;
        }
        setNuevoVehiculo( data.result );
        setLoading( false)
    }

    

    return (
        <FormularioWrapper>

            <Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <DirectionsCarIcon sx={{fontSize: '2.5em'}} />
                    <Typography variant='h6'>
                        Vehículo
                    </Typography>
                </Stack>
                <Divider />
            </Stack>

            

            <Grid container>
                <Grid item xs={4}>
                    <TipoPlacaSlt 
                        value={ boleta.vehiculo.tipoPlaca }
                        name='vehiculo.tipoplaca'
                        label='Tipo Placa'
                        handleBoletaChange={handleBoletaChange}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        size='small'
                        type='text'
                        label='Número Placa'
                        name='vehiculo.noplaca'
                        value={ boleta.vehiculo.noPlaca }
                        onChange={ handleBoletaChange }
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Stack 
                direction='row' 
                spacing={2}
                justifyContent='end'
            >
                <LoadingButton
                    endIcon={<SearchIcon />}
                    variant='contained'
                    onClick={buscarConductor}
                >
                    Buscar
                </LoadingButton>
            </Stack>

            <MarcaVehiculoSlt 
                value={ boleta.vehiculo.marca }
                name='vehiculo.marcavehiculo'
                label='Marca'
                handleBoletaChange={handleBoletaChange}
            />

            <ColorVehiculoSlt 
                value={ boleta.vehiculo.color }
                name='vehiculo.colorvehiculo'
                label='Color'
                handleBoletaChange={handleBoletaChange}
            />

            <TipoVehiculoSlt 
                value={ boleta.vehiculo.tipo }
                name='vehiculo.tipovehiculo'
                label='Tipo'
                handleBoletaChange={handleBoletaChange}
            />

            <TextField
                size='small'
                type='text'
                label='No Tarjeta Circulación'
                name='vehiculo.notarjeta'
                value={ boleta.vehiculo.noTarjeta }
                onChange={ handleBoletaChange }
            />

        </FormularioWrapper>
    )
}

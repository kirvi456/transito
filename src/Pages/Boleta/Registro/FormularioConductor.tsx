import React, { useContext, useRef, useState } from 'react'
import { Button, Divider, FormControlLabel, FormGroup, Grid, IconButton, MenuItem, Stack, Switch, TextField, TextFieldProps, Typography } from '@mui/material'


import { FormularioWrapper } from './FormularioWrapper';
import { Boleta } from '../../../models/Boleta';
import FaceIcon from '@mui/icons-material/Face';
import { TipoLicenciaSlt } from './InputsAPI/TIpoLicencia';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import { FetchRequest } from '../../../utils/MakeRequest';
import { LoadingButton } from '@mui/lab';
import { URLSContext } from '../../../context/URLs.context';
import { Conductor } from '../../../models/Conductor';

import CancelIcon from '@mui/icons-material/Cancel';
type FormularioConductorProps = {
    boleta : Boleta,
    handleBoletaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    setNuevoConductor: (nuevoConductor: Conductor) => void
}

export const FormularioConductor : React.FC<FormularioConductorProps> = ({ boleta, handleBoletaChange, setNuevoConductor }) => {
    
    const URLS = useContext( URLSContext )

    const [loading, setLoading] = useState<boolean>(false);

    const inputNombre = useRef<HTMLInputElement>();

    const buscarConductor = async() => {
        setLoading(true)
        const { data, error } = await FetchRequest<{result: Conductor}>(`${URLS.conductor}?tipoLicencia=${boleta.conductor.tipoLicencia}&noLicencia=${boleta.conductor.noLicencia}`, 'GET', undefined);
        if ( !data || !data.result ||  error ) {
            setNuevoConductor( { _id: '', 
                tipoLicencia: '', 
                noLicencia: boleta.conductor.noLicencia, 
                nombre: '', 
                folioLicencia: '', 
                genero: 'SIN ESPECIFICAR', 
                nit: '',
                licenciaBloqueada: false
            } )
            setLoading( false )
            return;
        }
        setNuevoConductor( data.result );
        setLoading( false )
    }

    const setSinLicencia = () => {
        setNuevoConductor( { 
            _id: '', 
            tipoLicencia: '6357f17b6052529e73c19e2f', 
            noLicencia: 'NO SE CONSIGNO', 
            nombre: '', 
            folioLicencia: 'NO SE CONSIGNO', 
            genero: 'SIN ESPECIFICAR', 
            nit: '',
            licenciaBloqueada: false} 
        )
        inputNombre.current?.focus();
    }

    const setNoNit = () => {
        setNuevoConductor( { 
            ...boleta.conductor,
            nit: 'SIN NIT'
        })
        inputNombre.current?.focus();
    }

    return (
        <FormularioWrapper>

            <Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <FaceIcon sx={{fontSize: '2.5em'}} />
                    <Typography variant='h6'>
                        Conductor
                    </Typography>
                </Stack>
                <Divider />
            </Stack>

            

            <Grid container>
                <Grid item xs={4}>
                    <TipoLicenciaSlt 
                        value={ boleta.conductor.tipoLicencia }
                        name='conductor.tipolicencia'
                        label='Tipo Licencia'
                        handleBoletaChange={handleBoletaChange}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        size='small'
                        type='text'
                        label='Número Licencia'
                        name='conductor.nolicencia'
                        value={ boleta.conductor.noLicencia }
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
                    loading={loading}
                >
                    Buscar
                </LoadingButton>
                <Button
                    endIcon={<HighlightOffIcon />}
                    variant='outlined' 
                    onClick={setSinLicencia}  
                >
                    No Se Consigno
                </Button>
            </Stack>



            <TextField
                size='small'
                type='text'
                label='Nombre Completo'
                name='conductor.nombre'
                value={ boleta.conductor.nombre }
                onChange={ handleBoletaChange }
                inputRef={inputNombre}
            />

            <Stack direction='row'>
                <TextField
                    size='small'
                    type='text'
                    label='NIT'
                    name='conductor.nit'
                    value={ boleta.conductor.nit }
                    onChange={ handleBoletaChange }
                    sx={{flexGrow: 1}}
                />
                <IconButton color="primary" aria-label="upload picture" component="label"
                    onClick={setNoNit}
                >
                    <CancelIcon />
                </IconButton>
            </Stack>

            <TextField
                size='small'
                type='text'
                label='Folio Licencia'
                name='conductor.foliolicencia'
                value={ boleta.conductor.folioLicencia }
                onChange={ handleBoletaChange }
            />

            
            <FormGroup sx={{display: 'flex', alignItems: 'start'}}>
                <FormControlLabel 
                    control={
                        <Switch 
                            checked={ boleta.conductor.licenciaBloqueada }
                            onChange={ handleBoletaChange }
                            name='conductor.licenciabloqueada'
                        />
                    } 
                    label='Licencia Bloqueada' 
                    labelPlacement='start'
                />
            </FormGroup>

            <TextField
                select
                size='small'
                type='text'
                label='Genero'
                name='conductor.genero'
                value={ boleta.conductor.genero }
                onChange={ handleBoletaChange }
            >
                <MenuItem value='MASCULINO'>MASCULINO</MenuItem>
                <MenuItem value='FEMENINO'>FEMENINO</MenuItem>
                <MenuItem value='SIN ESPECIFICAR'>SIN ESPECIFICAR</MenuItem>
            </TextField>

        </FormularioWrapper>
    )
}

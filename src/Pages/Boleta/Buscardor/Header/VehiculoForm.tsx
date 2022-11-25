import React, { useContext, useState } from 'react'
import { TextField, Grid } from '@mui/material'
import { Stack } from '@mui/system'
import { LoadingButton } from '@mui/lab'

import SearchIcon from '@mui/icons-material/Search';
import { BoletaPopulated } from '../../../../models/Boleta';
import { FetchRequest } from '../../../../utils/MakeRequest';
import { URLSContext } from '../../../../context/URLs.context';
import { useNotification } from '../../../../hooks/useNotification';
import { TipoPlacaSlt } from './TipoPlacaSlt';

type VehiculoFormProps = {
  setNuevasBoletas : ( nuevasBoletas : BoletaPopulated[] ) => void
}


export const VehiculoForm : React.FC<VehiculoFormProps> = ({setNuevasBoletas}) => {
  const URLS = useContext( URLSContext )

    const [tipoPlaca, setTipoPlaca] = useState<string>('');
    const [noPlaca, setNoPlaca] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { openErrorNotification } = useNotification();

    const buscarBoletas = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        
        if(tipoPlaca.replaceAll(' ', '') === '' ) return;

        const { data, error } = await FetchRequest<{result: BoletaPopulated[]}>( `${URLS.boleta}/vehiculo?tipoPlaca=${tipoPlaca}&noPlaca=${noPlaca}`, 'GET', undefined )
    

        if( error ) {
            openErrorNotification(error);
            setNuevasBoletas([]);
            setLoading(false);
            return;
        }

        if( data ) setNuevasBoletas( data.result )
        setLoading(false);
    }

    
    return (
        <form onSubmit={ buscarBoletas }>
            <Stack spacing={2}>
              <Grid container>
                  <Grid item xs={4}>
                    <TipoPlacaSlt
                      label='TipoPlaca'
                      name='tipoplaca'
                      value={tipoPlaca}
                      handleChange={setTipoPlaca}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField 
                      size='small'
                      placeholder='No. Placa'
                      label='Placa'
                      fullWidth
                      value={noPlaca}
                      onChange={ (e) =>  setNoPlaca( e.target.value.toUpperCase() ) }
                    />
                  </Grid>
              </Grid>
                <LoadingButton
                    variant='contained'
                    startIcon={<SearchIcon />}
                    type='submit'
                    loading={loading}
                >
                    Buscar
                </LoadingButton>
            </Stack>
        </form>
    )
}

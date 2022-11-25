import React, { useContext, useState } from 'react'
import { TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { LoadingButton } from '@mui/lab'

import SearchIcon from '@mui/icons-material/Search';
import { BoletaPopulated } from '../../../../models/Boleta';
import { FetchRequest } from '../../../../utils/MakeRequest';
import { URLSContext } from '../../../../context/URLs.context';
import { useNotification } from '../../../../hooks/useNotification';

type BoletaFormProps = {
    setNuevasBoletas : ( nuevasBoletas : BoletaPopulated[] ) => void
}


export const BoletaForm : React.FC<BoletaFormProps> = ({ setNuevasBoletas }) => {
    
    const URLS = useContext( URLSContext )

    const [noBoleta, setNoBoleta] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { openErrorNotification } = useNotification();

    const buscarBoletas = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        
        if(noBoleta.replaceAll(' ', '') === '' ) return;

        const { data, error } = await FetchRequest<{result: BoletaPopulated[]}>( `${URLS.boleta}/boleta?noboleta=${noBoleta}`, 'GET', undefined )
    

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
                <TextField 
                    size='small'
                    placeholder='Boleta No.'
                    label='Boleta No.'
                    value={noBoleta}
                    onChange={ (e) => setNoBoleta(e.target.value)}
                />

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

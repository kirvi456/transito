import { MenuItem, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { URLSContext } from '../../../../context/URLs.context';
import useFetch from '../../../../hooks/useFetch';

type TipoVehiculo = {
    _id: string,
    tipo: string,
}

type TipoVehiculoSltProps = {
    value: string,
    name: string,
    label: string,
    handleBoletaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

}

export const TipoVehiculoSlt : React.FC<TipoVehiculoSltProps> = ( { name, label, value, handleBoletaChange } )  => {
    
    const URLS = useContext( URLSContext );

    const [items, setItems] = useState<TipoVehiculo[]>([]);

    
    const { data, error } = useFetch< { result: TipoVehiculo[] } >( URLS.tipovehiculo );

    useEffect( () => {
        const sorted = data?.result.sort((a, b) => a.tipo.localeCompare(b.tipo)) || [] ;
        if( !error ) setItems( [ ...sorted ] );
    }, [data])

    return (
        <TextField
            select
            type='text'
            size='small'
            label={label}
            name={name}
            value={value}
            onChange={ handleBoletaChange }
            fullWidth
            SelectProps={{
                MenuProps:{ sx: { maxHeight: '400px' }}
            }}
        >
            {
                items.map( ( item ) => (
                    <MenuItem key={item._id} value={item._id}>{item.tipo}</MenuItem>
                ) )
            }
        </TextField>
    )
}

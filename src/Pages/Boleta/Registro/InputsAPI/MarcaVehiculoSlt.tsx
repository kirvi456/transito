import { MenuItem, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { URLSContext } from '../../../../context/URLs.context';
import useFetch from '../../../../hooks/useFetch';

type MarcaVehiculo = {
    _id: string,
    marca: string,
}

type MarcaVehiculoSltProps = {
    value: string,
    name: string,
    label: string,
    handleBoletaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

}

export const MarcaVehiculoSlt : React.FC<MarcaVehiculoSltProps> = ( { name, label, value, handleBoletaChange } )  => {
    
    const URLS = useContext( URLSContext );

    const [items, setItems] = useState<MarcaVehiculo[]>([]);

    
    const { data, error } = useFetch< { result: MarcaVehiculo[] } >( URLS.marcavehiculo );

    useEffect( () => {
        if( !error ) {
            const sorted = data?.result.sort((a, b) => a.marca.localeCompare(b.marca)) || [] ;
            setItems( [ ...sorted ] )
        
        }
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
                    <MenuItem key={item._id} value={item._id}>{item.marca}</MenuItem>
                ) )
            }
        </TextField>
    )
}

import { MenuItem, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { URLSContext } from '../../../../context/URLs.context';
import useFetch from '../../../../hooks/useFetch';

type ColorVehiculo = {
    _id: string,
    color: string,
}

type ColorVehiculoSltProps = {
    value: string,
    name: string,
    label: string,
    handleBoletaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

}

export const ColorVehiculoSlt : React.FC<ColorVehiculoSltProps> = ( { name, label, value, handleBoletaChange } )  => {
    
    const URLS = useContext( URLSContext );

    const [items, setItems] = useState<ColorVehiculo[]>([]);

    
    const { data, error } = useFetch< { result: ColorVehiculo[] } >( URLS.colorvehiculo );

    useEffect( () => {
        const sorted = data?.result.sort((a, b) => a.color.localeCompare(b.color)) || [] ;
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
                    <MenuItem key={item._id} value={item._id}>{item.color}</MenuItem>
                ) )
            }
        </TextField>
    )
}

import { MenuItem, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { URLSContext } from '../../../../context/URLs.context';
import useFetch from '../../../../hooks/useFetch';

type TipoPlaca = {
    _id: string,
    tipo: string,
    desc: string
}

type TipoPlacaSltProps = {
    value: string,
    name: string,
    label: string,
    handleChange: React.Dispatch<React.SetStateAction<string>>

}

export const TipoPlacaSlt : React.FC<TipoPlacaSltProps> = ( { name, label, value, handleChange } )  => {
    
    const URLS = useContext( URLSContext );

    const [items, setItems] = useState<TipoPlaca[]>([]);

    
    const { data, error } = useFetch< { result: TipoPlaca[] } >( URLS.tipoplaca );

    useEffect( () => {
        if( !error ) setItems( [ ...( data?.result || []) ] );
    }, [data])

    return (
        <TextField
            select
            type='text'
            size='small'
            label={label}
            name={name}
            value={value}
            onChange={ (e)=> handleChange(e.target.value) }
            fullWidth
        >
            {
                items.map( ( item ) => (
                    <MenuItem key={item._id} value={item._id}>{item.tipo} - {item.desc} </MenuItem>
                ) )
            }
        </TextField>
    )
}

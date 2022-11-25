import { MenuItem, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { URLSContext } from '../../../../context/URLs.context';
import useFetch from '../../../../hooks/useFetch';

type TipoFirma = {
    _id: string,
    tipo: string
}

type TipoFirmaSltProps = {
    value: string,
    name: string,
    label: string,
    handleBoletaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

}

export const TipoFirmaSlt : React.FC<TipoFirmaSltProps> = ( { name, label, value, handleBoletaChange } )  => {
    
    const URLS = useContext( URLSContext );

    const [items, setItems] = useState<TipoFirma[]>([]);

    
    const { data, error } = useFetch< { result: TipoFirma[] } >( URLS.tipofirma );

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
        >
            {
                items.map( ( item ) => (
                    <MenuItem key={item._id} value={item._id}>{item.tipo}</MenuItem>
                ) )
            }
        </TextField>
    )
}

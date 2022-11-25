import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { URLSContext } from '../../../../context/URLs.context';
import useFetch from '../../../../hooks/useFetch';
import { Articulo } from '../../../../models/Articulo';


type ArticuloSltProps = {
    value: string,
    name: string,
    label: string,
    handleBoletaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

}

export const ArticuloSlt : React.FC<ArticuloSltProps> = ( { name, label, value, handleBoletaChange } )  => {
    
    const URLS = useContext( URLSContext );

    const [items, setItems] = useState<Articulo[]>([]);
    const [total, setTotal] = useState<Number>(0.0);
    
    
    const { data, error } = useFetch< { result: Articulo[] } >( URLS.articulo );

    useEffect( () => {
        const sorted = data?.result.sort((a, b) => a.no.localeCompare(b.no)) || [] ;
        if( !error ) setItems( [ ...sorted ] );
    }, [data])

    useEffect( () => {
        if(value=== '')setTotal(0)
    }, [value])


    const onSelectionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTotal(items.find(el => el._id === e.target.value)?.valor || 0.0);
        handleBoletaChange(e)
    }

    return (
        <Stack spacing={2}> 
            <TextField
                select
                type='text'
                size='small'
                label={label}
                name={name}
                value={value}
                onChange={ onSelectionChange }
                fullWidth
                SelectProps={{
                    MenuProps:{ sx: { maxHeight: '400px' }}
                }}
            >
                {
                    items.map( ( item ) => (
                        <MenuItem key={item._id} value={item._id}>{item.no} - {item.desc}</MenuItem>
                    ) )
                }
            </TextField>

            <Typography variant='h6' textAlign='end'>
                {`Q ${total}.00`}
            </Typography>

        </Stack>
    )
}

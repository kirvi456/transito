import { MenuItem, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { URLSContext } from '../../../../context/URLs.context';
import useFetch from '../../../../hooks/useFetch';
import { Agente } from '../../../../models/Agente';


type AgenteSltProps = {
    value: string,
    name: string,
    label: string,
    handleBoletaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

}

export const AgenteSlt : React.FC<AgenteSltProps> = ( { name, label, value, handleBoletaChange } )  => {
    
    const URLS = useContext( URLSContext );

    const [items, setItems] = useState<Agente[]>([]);

    
    const { data, error } = useFetch< { result: Agente[] } >( URLS.agente );

    useEffect( () => {
        const sorted = data?.result.sort((a, b) => a.chapa.localeCompare(b.chapa)) || [] ;
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
                    <MenuItem key={item._id} value={item._id}>{item.chapa} - {item.nombre}</MenuItem>
                ) )
            }
        </TextField>
    )
}

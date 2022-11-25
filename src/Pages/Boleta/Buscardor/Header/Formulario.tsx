import { Stack } from '@mui/material'
import React from 'react'
import { Boleta, BoletaPopulated } from '../../../../models/Boleta'
import { BoletaForm } from './BoletaForm'
import { ConductorForm } from './ConductorForm'
import { TipoBusquedaType } from './types'
import { VehiculoForm } from './VehiculoForm'

type HeaderFormularioProps = {
    tipoBusqueda : TipoBusquedaType,
    setNuevasBoletas : ( nuevasBoletas : BoletaPopulated[] ) => void
}

export const HeaderFormulario : React.FC<HeaderFormularioProps> = ({ tipoBusqueda, setNuevasBoletas }) => {
    

    const getForm = () => {
        switch( tipoBusqueda ) {
            case 'boleta':
                return <BoletaForm setNuevasBoletas={setNuevasBoletas} />;
            case 'conductor':
                return <ConductorForm setNuevasBoletas={setNuevasBoletas} />;
            case 'vehiculo':
                return <VehiculoForm setNuevasBoletas={setNuevasBoletas} />;
        }
    }
    
    
    return (  getForm()  );

}

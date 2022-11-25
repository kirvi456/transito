import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../auth';
import { NavBar } from '../NavBar/NavBar';

type SpecificRolLayoutProps = {
    rols : string[]
}

export const SpecificRolLayout : React.FC<SpecificRolLayoutProps> = ({ rols }) =>{
    
    const { authState } = useContext( AuthContext );

    return (        
        rols.includes( authState.user?.rol || 'NOROL' )
        ? ( <> <NavBar /> <Outlet /> </> )
        : <Navigate to='/' />        
    )
}
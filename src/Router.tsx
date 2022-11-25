
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NoAuthLayout, AuthLayout, AnyAuthLayout } from './common/Layouts';
import { AdminRolLayout } from './common/Layouts/AdminRolLayout';
import { AnyRolLayout } from './common/Layouts/AnyRolLayout';
import { ControllerLayout } from './common/Layouts/ControllerLayout';
import { SpecificRolLayout } from './common/Layouts/SpecificRolLayout';
import { BuscadorPage } from './Pages/Boleta/Buscardor';
import { BoletaRegistroPage } from './Pages/Boleta/Registro';


import { AdminHomePage } from './Pages/Home/admin';
import { DigitadorHomePage } from './Pages/Home/digitador';
import { LoginPage } from './Pages/Login';
import { RegistrarPage } from './Pages/Registrar';


export const AppRouter : React.FC<{}> = () => {
    return (
        <Routes>


            <Route path='/' element={<AuthLayout />}>

                <Route path='/' element={<ControllerLayout />} />

                <Route path='/' element={<AdminRolLayout />} >
                    <Route path='/adminhome' element={<AdminHomePage />} />
                    <Route path='/registro/digitador' element={<RegistrarPage rol='DIGITADOR' />} />
                    <Route path='/registro/revisor' element={<RegistrarPage rol='REVISOR' />} />
                </Route>

                

                <Route path='/' element={<SpecificRolLayout rols={['ADMIN', 'DIGITADOR'] } />} >
                    <Route path='/digitadorhome' element={<DigitadorHomePage />} /> 
                    <Route path='/boleta/registrar' element={<BoletaRegistroPage />} /> 
                    <Route path='/boletas' element={<BuscadorPage />} /> 
                </Route>

                {/* <Route path='/' element={<SpecificRolLayout rols={['REVISOR'] } />} >
                    <Route path='/revisorhome' element={<RevisorHomePage />} /> 
                </Route> */}

                {/* <Route path='/' element={<AnyRolLayout />} >
                    <Route path='/calcomania' element={<PresentacionPage />} />
                </Route> */}

            </Route>

            <Route path='/' element={<NoAuthLayout />}>
                <Route path='/login' element={<LoginPage />} />
            </Route>

            

            <Route path='*' element={ <div>404</div> }/>

        </Routes>
    )
}
import React from 'react';

type URLSList = {
    auth            : string;
    usuario         : string;
    tipofirma       : string;
    tipolicencia    : string;
    tipoplaca       : string;
    marcavehiculo       : string;
    tipovehiculo        : string;
    colorvehiculo       : string;
    conductor           : string;
    vehiculo            : string;
    agente              : string;
    articulo            : string;
    boleta              : string;
}

console.log(import.meta.env.VITE_APP_BASE_URL)

const myURLS : URLSList = {
    auth:                       `${import.meta.env.VITE_APP_BASE_URL}api/auth`,
    usuario:                    `${import.meta.env.VITE_APP_BASE_URL}api/usuarios`,
    
    tipofirma:                  `${import.meta.env.VITE_APP_BASE_URL}api/tipofirma`,
    tipolicencia:               `${import.meta.env.VITE_APP_BASE_URL}api/tipolicencia`,
    tipoplaca:                  `${import.meta.env.VITE_APP_BASE_URL}api/tipoplaca`,
    marcavehiculo:              `${import.meta.env.VITE_APP_BASE_URL}api/marcavehiculo`,
    tipovehiculo:               `${import.meta.env.VITE_APP_BASE_URL}api/tipovehiculo`,
    colorvehiculo:              `${import.meta.env.VITE_APP_BASE_URL}api/colorvehiculo`,
    conductor:                  `${import.meta.env.VITE_APP_BASE_URL}api/conductor`,
    vehiculo:                   `${import.meta.env.VITE_APP_BASE_URL}api/vehiculo`,
    agente:                     `${import.meta.env.VITE_APP_BASE_URL}api/agente`,
    articulo:                   `${import.meta.env.VITE_APP_BASE_URL}api/articulo`,
    boleta:                     `${import.meta.env.VITE_APP_BASE_URL}api/boleta`,
}


export const URLSContext = React.createContext<URLSList >(myURLS);

export const URLSProvider : React.FC<{children : JSX.Element}> = ({children}) => {

    const value = myURLS;

    return (
        <URLSContext.Provider value={value}>
            { children }
        </URLSContext.Provider>
    )
}
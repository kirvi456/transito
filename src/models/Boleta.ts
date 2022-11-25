export type BoletaPopulated = {
    _id: string,
    noboleta: number,
    fecha: number,
    lugar: string,
    firma: {
        _id: string,
        tipo: string
    },
    agente: {
        _id: string,
        nombre: string,
        chapa: string
    },
    articulo: {
        _id: string,
        desc: string,
        no: string,
        valor: number,
    },
    conductor: {
        nombre: string,
        tipoLicencia: {
            _id: string,
            tipo: string,
            desc: string
        },
        noLicencia: string,
        folioLicencia: string,
        licenciaBloqueada: boolean,
        genero: string,
        nit: string,
        _id: string
    },
    vehiculo: {
        tipoPlaca: {
            _id: string,
            tipo: string
        },
        noPlaca: string,
        marca: {
            _id: string,
            marca: string
        },
        color: {
            _id: string,
            color: string
        },
        tipo: {
            _id: string,
            tipo: string
        },
        noTarjeta: string,
        _id: string
    },
    estado: string
}

export type Boleta = {
    _id: string,
    noboleta: number,
    fecha: number,
    lugar: string,
    firma: string,
    agente: string,
    articulo: string,
    conductor: {
        nombre: string,
        tipoLicencia: string,
        noLicencia: string,
        folioLicencia: string,
        licenciaBloqueada: boolean,
        genero: string,
        nit: string,
        _id: string
    },
    vehiculo: {
        tipoPlaca: string,
        noPlaca: string,
        marca: string,
        color: string,
        tipo: string,
        noTarjeta: string,
        _id: string
    },
    pago? : {
        _id: string,
        tipo: string,
        noDocumento: string,
        monto: number,
        fecha: number
    },
}

export const EmptyBoleta : Boleta = {
    _id: '',
    noboleta: 0,
    fecha: ( new Date() ).getTime(),
    lugar: 'San José Pinula',
    firma: '',
    agente: '',
    articulo: '',
    conductor: {
        nombre: '',
        tipoLicencia: '',
        noLicencia: '',
        folioLicencia: '',
        licenciaBloqueada: false,
        genero: 'SIN ESPECIFICAR',
        nit: '',
        _id: ''
    },
    vehiculo: {
        tipoPlaca: '',
        noPlaca: '',
        marca: '',
        color: '',
        tipo: '',
        noTarjeta: '',
        _id: ''
    },
}

export const getEmptyBoleta = () : Boleta => {
    return {
        ...EmptyBoleta, 
        conductor: {...EmptyBoleta.conductor}, 
        vehiculo: {...EmptyBoleta.vehiculo} 
    }
}
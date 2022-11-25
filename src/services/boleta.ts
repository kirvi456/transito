import { Boleta } from "../models/Boleta";
import { FetchRequest, } from "../utils/MakeRequest";


export const registaraBoleta = async( url : string, body : Boleta ) => {
    
    try{

        const { _id, ...boleta } = body;
        const { _id:idcon, ...conductor } = body.conductor;
        const { _id:idveh, ...vehiculo } = body.vehiculo;

        
        const { error, data } = await FetchRequest<Boleta>( url, 'POST',  {...boleta, conductor, vehiculo} );
    
        if( error ) return { result : false, message: error, payload: undefined };
    
        if( data ) return { result : true, message: '', payload: data };


    } catch( error : any ){
        console.log( error )
        return { result : false, message: error.error as string, payload: undefined };
    }

    return { result: false, message: 'No se pudo crear. Intentelo más tarde.', payload: undefined}
}

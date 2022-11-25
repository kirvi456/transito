import { FetchRequest } from "../../utils/MakeRequest";

type LoginReturn = {
    response : boolean,
    message?: string,
    data? : LoginResponseOK
};

type LoginResponseBad = { msg : string };

type LoginResponseOK = {
    usuarioInstancia: {
        nombre: string,
        usuario: string,
        correo: string,
        rol: string,
        estado: string,
        _id: string
    },
    token: string
};

type LoginResponse = LoginResponseOK | LoginResponseBad;

export const loginService = async ( url : string, usuario : string, pw : string ) : Promise<LoginReturn> => {
    
    try{
        const { data, error } = await FetchRequest<LoginResponse>( url, 'POST', { usuario, pw } );
    
        if( error ) return {response: false, message: error }   

        return { response: true, message: 'Logueado correctamente', data: data as LoginResponseOK }
        
    }catch ( error : any ){
        return {response: false, message: error.error }        
    }
    

}
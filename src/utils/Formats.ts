
export const getDateString = ( date : number = 0 ) => {
    try {

        return (new Date( date ) ).toLocaleDateString(
            'es-ES', 
            {
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit'
            }
        ) 
    } catch( error ) {
        return (new Date() ).toLocaleDateString(
            'es-ES', 
            {
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit'
            }
        ) 
    }
}

export const getDateTimeString = ( date : number = 0 ) => {
    try {

        return (new Date( date ) ).toLocaleDateString(
            'es-ES', 
            {
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }
        ) 
    } catch( error ) {
        return (new Date() ).toLocaleDateString(
            'es-ES', 
            {
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit'
            }
        ) 
    }
}

export const getDateToInput = ( date : number ) => {

    const myDate = new Date(date);


    const mes = myDate.getMonth() + 1;
    const mesStr = mes < 10 ? '0' + mes : '' + mes; 
    const dia = myDate.getDate();
    const diaStr = dia < 10 ? '0' + dia : '' + dia;

    const hora = myDate.getHours();
    const horaStr = hora < 10 ? '0' + hora : '' + hora;
    const minutos = myDate.getMinutes();
    const minutosStr = minutos < 10 ? '0' + minutos : '' + minutos;


    return `${myDate.getFullYear()}-${ mesStr }-${diaStr}T${horaStr}:${minutosStr}`;
}
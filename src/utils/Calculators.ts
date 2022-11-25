const dayMS = 86400000;

export const getDescuentoDiasHabiles = ( emisionDate : number ) : number => {

    const today = (new Date()).getTime();

    return today < calcDescEnd( emisionDate ) ? 0.25 : 0; 

}

export const calcDescEnd = ( emisionDate : number ) : number => {


    let emisionDateAux = emisionDate;

    let daysCounter = 0;

    while ( daysCounter < 5 ) {
        emisionDateAux += dayMS;
        const currentDateDay = (new Date( emisionDateAux )).getDay();
        if( currentDateDay > 0 && currentDateDay < 6 ) daysCounter++;
    }

    return emisionDateAux; 

}


export const getMora = ( emisionDate : number ) : number => {

    const aplica = ( getDescuentoDiasHabiles( emisionDate ) === 0 );
    if( !aplica ) return 0;

    const fechaInicioMora = calcDescEnd( emisionDate );

    const hoy = ( new Date() ).getTime();

    const porcionAnio = ( hoy - fechaInicioMora ) / ( dayMS * 365 );
    

    return Number( ( porcionAnio * 0.2 ).toFixed(2) );
}
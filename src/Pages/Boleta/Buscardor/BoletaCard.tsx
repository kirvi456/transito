import { Alert, Divider, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { BoletaPopulated } from '../../../models/Boleta';
import { getDateTimeString } from '../../../utils/Formats';
import { BoletaCardActions } from './BoletaCardActions';
import { getMora } from '../../../utils/Calculators';

type BoletaCardProps = {
    boleta : BoletaPopulated
}

export const BoletaCard : React.FC<BoletaCardProps> = ({ boleta }) => {

    const getBorderColor = ( ) : string => {
        switch ( boleta.estado ){
            case 'EMITIDA': return 'warning.light'
            case 'ANULADA': return 'error.light'
            case 'PAGADA':  return 'success.main'
            default: return ''
        }
    }

    const getEstadoMensaje = (  ) : JSX.Element => {
        switch ( boleta.estado ){
            case 'EMITIDA': return (<Alert severity="warning">La boleta se encuentra pendiente de pago</Alert>);
            case 'ANULADA': return (<Alert severity="error">La boleta se anuló</Alert>);
            case 'PAGADA':  return (<Alert severity="success">La boleta se encuentra pagada</Alert>);
            default: return (<Alert severity="info">Sin registro de estado</Alert>);
        }
    }


    const getMoraInfo = () : string => {
        const moraPorcentaje = getMora( boleta.fecha );

        return `(${ moraPorcentaje * 100 }%) Q ${ ( boleta.articulo.valor * moraPorcentaje ) .toFixed(2) }`;
    }

    return (
        <Paper
            elevation={10}
            sx={{
                pt: 2, 
                pl: 2, 
                pr: 2, 
                pb: 1, 
                width: '600px',
                maxWidth: '100%',
                position: 'relative',
                overflow: 'hidden',
                borderColor: getBorderColor()
            }}
        >
            <Box 
                sx={{
                    position: 'absolute',
                    background: '#113650',
                    color: 'white',
                    p: 1,
                    top: 0,
                    left: 0,
                    borderRadius: '0 0 .5em 0' 
                }}
            >
                <Typography sx={{fontWeight: 'bold'}}>
                    Boleta No.{boleta.noboleta}
                </Typography>

            </Box>

            
            
            <Stack spacing={1}>
                <Stack direction='row' justifyContent='end' alignItems='center' spacing={1}>
                    <CalendarMonthIcon />
                    <Typography variant='caption'>
                        { getDateTimeString( boleta.fecha ) }
                    </Typography>
                </Stack>
                <Stack justifyContent='center'>
                    <Typography variant='h4' fontWeight='800' textAlign='center'>
                        {boleta.vehiculo.tipoPlaca.tipo} - {boleta.vehiculo.noPlaca}
                    </Typography>
                    <Typography variant='caption' textAlign='center' sx={{fontSize: '0.65em', fontWeight: 'bold'}}>
                        TIPO: {boleta.vehiculo.tipo.tipo} / COLOR: {boleta.vehiculo.color.color} / MARCA: {boleta.vehiculo.marca.marca}
                    </Typography>
                </Stack>
                <Stack direction='row'>
                    <PlaceIcon />
                    <Typography textAlign='justify'>
                        <strong>Lugar: </strong>{boleta.lugar}
                    </Typography>
                </Stack>
                <Stack direction='row'>
                    <PersonIcon />
                    <Typography textAlign='justify'>
                        <strong>Infractor: </strong>{boleta.conductor.nombre}
                    </Typography>
                </Stack>
                <Stack direction='row'>
                    <LocalPoliceIcon />
                    <Typography>
                        <strong>Agente: </strong>{boleta.agente.chapa} - {boleta.agente.nombre}
                    </Typography>
                </Stack>
                <Divider />
                <Typography>
                    <strong>{boleta.articulo.no}</strong> {boleta.articulo.desc}
                </Typography>

                <Divider />
                
                <Stack direction='row' justifyContent='space-between'>
                    <Typography>
                        Monto
                    </Typography>
                    <Typography sx={{fontWeight: '800', textAlign: 'end'}}>
                        Q{boleta.articulo.valor}.00
                    </Typography>
                </Stack>

                <Stack direction='row' justifyContent='space-between'>
                    <Typography>
                        Mora
                    </Typography>
                    <Typography sx={{fontWeight: '800', textAlign: 'end'}}>
                        {getMoraInfo()}
                    </Typography>
                </Stack>

                <Stack direction='row' justifyContent='space-between'>
                    <Typography>
                        Descuento
                    </Typography>
                    <Typography sx={{fontWeight: '800', textAlign: 'end'}}>
                        Q{boleta.articulo.valor}.00
                    </Typography>
                </Stack>

                <Typography variant='h6' sx={{fontWeight: '800', textAlign: 'end'}}>
                    Total: Q{boleta.articulo.valor}.00
                </Typography>

                { getEstadoMensaje() }

                <Divider />

                <BoletaCardActions />
            </Stack>
        </Paper>
    )
}

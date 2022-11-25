import React from 'react'
import { 
    SwipeableDrawer, 
    Box, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { listaPaginas } from './LinksList';





type DrawerProps = {
    open: boolean, 
    rol: string,
    handleOpenChange : () => void
}

export const Drawer : React.FC<DrawerProps> = ({ open, rol, handleOpenChange }) => {
    

    // Se obtienen todos los roles a los que se les asignaron paginas
    const listaRoles = (Object.keys(listaPaginas) as string[]);


    // Se revisa si el rol que se esta pasando como prop tiene paginas definidas
    const lista = listaRoles.includes( rol ) ? listaPaginas[ rol as 'ADMIN' ] : []; 


    let navigate = useNavigate();

    return (
        <SwipeableDrawer
                open={open}
                onClose={handleOpenChange}
                onOpen={handleOpenChange}
        >            
            <Box sx={{minWidth: '250px'}} onClick={handleOpenChange}>
                
                {
                    (  lista )
                        .map( ({ titulo, icono, url }, index ) => (
                        <List 
                            key={'navItem' + index} 
                            onClick = { () => navigate( url, { replace: true } ) }>
                            <ListItem key={ titulo } disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        { icono }
                                    </ListItemIcon>
                                    <ListItemText primary={ titulo } />
                                </ListItemButton>
                            </ListItem>
                        </List> 
                    ))
                }     
                
            </Box>
        </SwipeableDrawer>
    )
}
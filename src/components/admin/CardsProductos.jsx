import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { DialogProducto } from './DialogProducto';
import { openModal } from '../../actions/ui';
import { productSetActive, productStartDelete } from '../../actions/admin';
export const CardsProductos = ({ products = '' }) => {
    const { name, image } = products
    const dispatch = useDispatch();
    const handleActalizar = (product) => {
        dispatch(openModal())
        dispatch(productSetActive(product))
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro/a?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrarlo',
            cancelButtonText: 'No, Cancelar'

        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(productStartDelete(id))
                Swal.fire({
                    title: 'Eliminado',
                    text: 'Su producto ha sido eliminado.',
                    icon: 'success',
                    confirmButtonText: 'Cerrar',

                })
            }
        })
        
    }
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="p" component="div" align='center'>
                        {name}
                    </Typography>
                </CardContent>

                <CardActions sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Button size="small"
                        variant='contained'
                        color="info"
                        startIcon={<ModeEditIcon />}
                        onClick={() => handleActalizar(products)}
                    >
                        Actualizar
                    </Button>
                    <Button size="small"
                        variant='contained'
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(products._id)}
                    >
                        Eliminar</Button>
                </CardActions>

            </Card>
        </div>
    )
}

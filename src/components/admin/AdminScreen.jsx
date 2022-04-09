import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { AdminNavBar } from './AdminNavBar'
import { AlertTitle, Box, Grid, Pagination, Typography } from '@mui/material'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { DialogProducto } from './DialogProducto';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert, openModal } from '../../actions/ui';
import { CardsProductos } from './CardsProductos';
import { productStartLoading } from '../../actions/admin';
import Alert from '@mui/material/Alert';
import { AutoCompleteFilter } from './AutoCompleteFilter';


export const AdminScreen = () => {
  const dispatch = useDispatch();
  const { products, paginasTotales } = useSelector(state => state.admin);
  const { openAlert, acction, msg, openPaginacion } = useSelector(state => state.UI);
  const [currentPage, setcurrentPage] = useState(1)

  const handleClickOpen = () => {
    dispatch(openModal())
  };
  useEffect(() => {
    dispatch(productStartLoading(currentPage))
  }, [dispatch, currentPage])

  useEffect(() => {
    if (openAlert) {
      setTimeout(() => {
        dispatch(closeAlert())
      }, 3000);
    }
  }, [openAlert])


  return (
    <div className='animate__animated animate__fadeIn'>
      <AdminNavBar />
      <Container maxWidth="lg" sx={{ marginTop: 10 }}>
        <Box >
          <Grid container direction='column' justifyContent='space-between'>
            <Grid item
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* <AutoCompleteFilter  /> */}
            </Grid>
            <Grid item >
              <Box sx={{ flexGrow: 1, marginTop: 2 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 5, sm: 8, md: 12 }} justifyContent='center'>
                  {
                    products.length > 0 ?
                      products.map((products, index) => (
                        <Grid item xs={4} sm={4} md={4} key={products._id || index}>
                          <CardsProductos products={products} />
                        </Grid>
                      ))
                      :
                      <Alert severity="error"
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',

                        }}
                      >
                        <Typography variant="body1" color="initial">
                          No se concentró nada con la búsqueda
                        </Typography>
                      </Alert>
                  }

                </Grid>

              </Box>
            </Grid>
            <Grid item
              sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: 3
              }}>
              {
                openPaginacion &&
                <Pagination
                  count={paginasTotales}
                  color="secondary"
                  defaultPage={1}
                  size='large'
                  onChange={(e, page) => setcurrentPage(page)}
                />
              }
            </Grid>
          </Grid>
        </Box>

      </Container>
      <Grid item xs={12} sx={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        bottom: 0,
      }}>
        <Fab color="secondary" aria-label="add" onClick={handleClickOpen} >
          <AddIcon />
        </Fab>
        <DialogProducto />
      </Grid>
      <Grid item xs={12} sx={{
        position: 'fixed',
        padding: '1rem',
        bottom: 0,
        right: 0,
      }}>
        {
          openAlert &&
          <Alert severity="success" className='animate__animated animate__bounceInRight'>
            <AlertTitle>{acction}</AlertTitle>
            {msg} - <strong>Correctamente</strong>
          </Alert>
        }

      </Grid>
    </div >
  )

}
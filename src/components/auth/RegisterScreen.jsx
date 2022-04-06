import React, { useEffect, useState } from 'react'
import { Container, Paper, Typography, Grid, TextField, Button, Alert } from '@mui/material'
import { styles } from '../custom/Styles'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForms'

import validator from 'validator';
import { useDispatch } from 'react-redux'
import { starRegister } from '../../actions/auth'

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const [FormValue, handleInputChange] = useForm({
    nombre: 'nicolas',
    email: 'nico@gmail.com',
    Password: '123456',
    Password2: '123456',
  });
  const [Validar, setValidar] = useState({})

  const { nombre, email, Password, Password2 } = FormValue;

  const validarFormulario = () => {
    if (nombre.length <= 0) {
      setValidar({
        nombre: true,
        msgnombre: 'El nombre es obligatorio'
      })
      return false;
    }
    if (validator.isEmpty(email)) {
      setValidar({
        email: true,
        msgemail: 'El email es obligatorio'
      })
      return false;
    }
    if (!validator.isEmail(email)) {
      setValidar({
        email: true,
        msgemail: 'El email no es valido'
      })
      return false;
    }
    if (Password.length < 6) {
      setValidar({
        Password: true,
        msgpassword: 'La contraseña debe tener al menos 6 caracteres'
      })
      return false;
    }
    if (validator.isEmpty(Password2)) {
      setValidar({
        Password2: true,
        msgpassword2: 'Confirmar la contraseña es obligatorio'
      })
      return false;
    }
    if (Password !== Password2) {
      setValidar({
        Password2: true,
        msgpassword2: 'Las contraseñas no coinciden'
      })
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (nombre.length > 0) {
      setValidar({
        nombre: false,
        msgnombre: ''
      })
    }
    if (email.length > 0) {
      setValidar({
        email: false,
        msgemail: ''
      })
    }
    if (validator.isEmail(email)) {
      setValidar({
        email: false,
        msgemail: ''
      })
    }
    if (Password.length >= 6) {
      setValidar({
        Password: false,
        msgpassword: ''
      })
    }
    if (Password2.length > 0) {
      setValidar({
        Password2: false,
        msgpassword2: ''
      })
    }
  }, [nombre, email, Password, Password2])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      dispatch(starRegister(email, Password, nombre))
    }
  }

  return (
    <Container maxWidth='sm' className='animate__animated animate__fadeInRight'
      sx={{
        height: '35rem',
        margin: ' 100px auto'
      }}>
      <Paper elevation={3} style={styles.paper}>
        <form onSubmit={handleSubmit}>

          <Grid container gap={3} direction="column" padding={3}>
            <Typography variant="h3" color="secondary" align='center'>
              Registro
            </Typography>

            <TextField
              label="Nombre"
              color='secondary'
              placeholder='Escriba su nombre'
              name='nombre'
              value={nombre}
              onChange={handleInputChange}
              autoFocus
              error={Validar.nombre}
              helperText={Validar.msgnombre}
            />
            <TextField
              label="Correo"
              color='secondary'
              placeholder="Escriba su correo"
              name='email'
              value={email}
              onChange={handleInputChange}
              error={Validar.email}
              helperText={Validar.msgemail}
            />

            <TextField
              label="Contraseña"
              color='secondary'
              type='password'
              placeholder="Escriba su contraseña"
              name='Password'
              value={Password}
              onChange={handleInputChange}
              error={Validar.Password}
              helperText={Validar.msgpassword}
            />

            <TextField
              label="Confirmar Contraseña"
              color='secondary'
              type='password'
              placeholder="Repetir contraseña"
              name='Password2'
              value={Password2}
              onChange={handleInputChange}
              error={Validar.Password2}
              helperText={Validar.msgpassword2}
            />

            <Button variant="contained" color="secondary" type='submit'>
              Registrar
            </Button>
            <Typography variant="body1" color="initial">
              ¿Ya tienes una cuenta? <Link to='/auth/login'>Iniciar Sesión</Link>
            </Typography>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

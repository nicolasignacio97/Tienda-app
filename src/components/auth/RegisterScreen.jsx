import React, { useEffect, useState } from 'react'
import { Container, Paper, Typography, Grid, TextField, Button } from '@mui/material'
import { styles } from '../custom/Styles'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForms'

import validator from 'validator';

export const RegisterScreen = () => {
  const [FormValue, handleInputChange] = useForm({
    nombre: 'Nicolas',
    email: 'nicolas@gmail.com',
    Password: '123456',
    Password2: '123456',
  });
  const [Validar, setValidar] = useState({
    nombre: false,
    msgnombre: '',
    email: false,
    msgemail: '',
    Password: false,
    msgpassword: '',
    Password2: false,
    msgpassword2: '',
  })

  const { nombre, email, Password, Password2 } = FormValue;

  const validarFormulario = () => {
    if (nombre.length === 0) {
      setValidar({
        ...Validar,
        nombre: true,
        msgnombre: 'El nombre es obligatorio'
      })
      return false;
    }
    if (validator.isEmpty(email)) {
      setValidar({
        ...Validar,
        email: true,
        msgemail: 'El email es obligatorio'
      })
      return false;
    }
    if (!validator.isEmail(email)) {
      setValidar({
        ...Validar,
        email: true,
        msgemail: 'El email no es valido'
      })
      return false;
    }
    if (Password.length < 6) {
      setValidar({
        ...Validar,
        Password: true,
        msgpassword: 'La contraseña debe tener al menos 6 caracteres'
      })
      return false;
    }
    if (validator.isEmpty(Password2)) {
      setValidar({
        ...Validar,
        Password2: true,
        msgpassword2: 'Confirmar la contraseña es obligatorio'
      })
      return false;
    }
    if (Password !== Password2) {
      setValidar({
        ...Validar,
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
        ...Validar,
        nombre: false,
        msgnombre: ''
      })
    }
    if (email.length > 0 && validator.isEmail(email)) {
      setValidar({
        ...Validar,
        email: false,
        msgemail: ''
      })
    }
    if (Password.length >= 6) {
      setValidar({
        ...Validar,
        Password: false,
        msgpassword: ''
      })
    }
    if (Password2.length > 0) {
      setValidar({
        ...Validar,
        Password2: false,
        msgpassword2: ''
      })
    }

  }, [nombre, email, Password, Password2])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      console.log(FormValue)
    }
  }

  return (
    <Container maxWidth='sm'className='animate__animated animate__fadeInRight'
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
              ¿Ya tienes una cuenta? <Link to='/login'>Iniciar Sesión</Link>
            </Typography>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; import { IconButton, Input, InputAdornment } from '@mui/material';
import { Container, Paper, Typography, Grid, TextField, Button, BottomNavigation } from '@mui/material'
import { styles } from '../custom/Styles'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForms';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const [FormValue, handleInputChange, setValues] = useForm({
    email: 'nico@gmail.com',
    Password: '123456',
    showPassword: false
  });

  const { email, Password, showPassword } = FormValue;

  const [Validar, setValidar] = useState({
    email: false,
    msgEmail: "",
    Password: false,
    msgPassword: ""
  })
  const validarFormulario = () => {
    if (validator.isEmpty(email)) {
      setValidar({
        ...Validar,
        email: true,
        msgEmail: "El email es obligatorio"
      })
      return false;
    }
    if (!validator.isEmail(email)) {
      setValidar({
        ...Validar,
        email: true,
        msgEmail: "El email no es valido"
      })
      return false;
    }
    if (validator.isEmpty(Password)) {
      setValidar({
        ...Validar,
        Password: true,
        msgPassword: "La constraseña es obligatorio"
      })
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (email.length > 0) {
      setValidar({
        ...Validar,
        email: false,
        msgEmail: ""
      })
    }
    if (Password.length > 0) {
      setValidar({
        ...Validar,
        Password: false,
        msgPassword: ""
      })
    }
  }, [email, Password])

  const handleClickShowPassword = () => {
    setValues({
      ...FormValue,
      showPassword: !showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
     dispatch(startLogin(email, Password))
    }
    return;
  }
  return (
    <Container maxWidth='sm' className='animate__animated animate__fadeInLeft'
      sx={{
        height: '35rem',
        margin: ' 100px auto'
      }}>
      <Paper elevation={3} style={styles.paper}>
        <form onSubmit={handleSubmit}>
          <Grid container gap={3} direction="column" padding={3}>
            <Typography variant="h3" color="secondary" align='center'>
              Inicia Sesión
            </Typography>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Correo"
                color='secondary'
                placeholder="Escriba su correo"
                name='email'
                value={email}
                onChange={handleInputChange}
                error={Validar.email}
                autoFocus
              />
              <Typography variant="caption" color="error" >
                {Validar.msgEmail}
              </Typography>
            </FormControl>
            <FormControl>
              <InputLabel color='secondary'>Contraseña</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                name='Password'
                value={Password}
                onChange={handleInputChange}
                placeholder="Escriba su contraseña"
                color='secondary'
                error={Validar.Password}

                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"

              />
              <Typography variant="caption" color="error" >
                {Validar.msgPassword}
              </Typography>
            </FormControl>
            <Button variant="contained" color="secondary" type='submit'>
              Iniciar
            </Button>
            <Typography variant="body1" color="initial">
              ¿No tienes cuenta? <Link to='/auth/registro'>Registrate Aquí</Link>
            </Typography>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}


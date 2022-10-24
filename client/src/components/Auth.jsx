import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from '@mui/material'
import history from 'history/browser'
import { useDispatch } from 'react-redux'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

import { signin, signup } from '../actions/auth'
import Input from './Input'

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    // const result = res?.profileObj
    // const token = res?.tokenId

    // try {
    //   dispatch({ type: 'AUTH', data: { result, token } })
    // } catch (error) {
    //   console.log(error)
    // }
    console.log(res)
  }

  const googleFailure = () => {
    console.log('Google Sign In was unsuccessful. Try again later')
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper
        sx={{
          marginTop: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem 2rem',
        }}
        elevation={3}>
        <Avatar
          sx={{
            margin: '1rem',
            backgroundColor: 'red',
          }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5' sx={{ marginBottom: '1rem' }}>
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <form sx={{ width: '100%' }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
                type='password'
                autoComplete='on'
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{
              margin: '1rem 0',
            }}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          {/* <GoogleLogin
            clientId='922223186760-5mke3kkp782m0u46lb1nfo1scc16h3le.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                fullWidth
                variant='contained'
                color='primary'
                sx={{
                  margin: '1rem 0',
                }}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<img src='/google.png' alt='google' />}
                cookiePolicy='single_host_origin'>
                Google Sign in
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
          /> */}
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth

import React, { useState } from 'react'
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import decode from 'jwt-decode'

import * as actionType from '../constants/actionTypes'

const Navbar = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('profile'))
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const logout = () => {
    dispatch({ type: actionType.LOGOUT })

    navigate('/auth')

    setUser(null)
  }

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <AppBar
      sx={{
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
      }}
      position='static'
      color='inherit'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          to='/'
          component={Link}
          sx={{ color: 'rgba(0,183,255, 1)', textDecoration: 'none' }}
          variant='h2'
          align='center'>
          Memories
        </Typography>
        <img
          style={{ marginLeft: '15px' }}
          src='memories.png'
          alt='icon'
          height='60'
        />
      </div>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '400px',
        }}>
        {user?.result ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '400px',
            }}>
            <Avatar
              sx={{
                color: 'white',
                backgroundColor: 'red',
              }}
              alt={user?.result.name}
              src={user?.result.imageUrl}>
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              variant='h6'>
              {user?.result.name}
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'>
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

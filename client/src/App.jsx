import React from 'react'
import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Auth from './components/Auth'

const App = () => (
  <BrowserRouter>
    <Container maxWidth='lg'>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </Container>
  </BrowserRouter>
)

export default App

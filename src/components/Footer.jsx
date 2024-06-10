import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import leyvaLogo from '../assets/leyva.png';  // Asegúrate de que la imagen está en la carpeta correcta

function Footer() {
  let navigate = useNavigate();

  return (
    <Box component="footer" sx={{
      bgcolor: '#FDA80D',  // Fondo amarillo
      boxShadow: '0px 9px 0px #AF6B06',  // Sombra marrón
      color: 'white',
      p: 2,
      display: 'flex',
      justifyContent: 'space-around'
    }}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Typography variant="body1">
          Elabora: Sam Leyva Ferrer para la materia de Frontend -8 Semestre-
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{
          bgcolor: '#FFD053',  // Color de fondo del botón
          color: '#FFFFCC',  // Color de texto
          boxShadow: '0px 4px 3px #FE8906',  // Sombra naranja
          '&:hover': {
            bgcolor: '#FFDC33',  // Color de fondo al pasar el mouse
          }
        }}>
          INICIO
        </Button>
        <img src={leyvaLogo} alt="Leyva Logo" height="60px" />
      </Container>
    </Box>
  );
}

export default Footer;

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import imagen from "../assets/icono.svg";

function Navbar() {
  return (
    <AppBar position="static" sx={{
      background: 'linear-gradient(120deg, #2199FF, #67BCFF)', // Gradiente azul
      boxShadow: '0px 9px 0px #004FA5' // Sombra azul oscuro
    }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '16px', cursor: 'pointer' }}>
          <Link to="/">
            <img
              src={imagen}
              alt="Icono"
              style={{ height: '50px' }}
            />
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFFFCC', textShadow: '1px 1px #002F83', ml: 1 }}>
              Clash Royale Web
            </Typography>
          </Link>
        </Box>
        <Button component={Link} to="/carta" sx={buttonStyle}>
          Cartas
        </Button>
        <Button component={Link} to="/jugadores" sx={buttonStyle}>
          Jugadores
        </Button>
        <Button component={Link} to="/guardados" sx={buttonStyle}>
          Guardados
        </Button>
      </Toolbar>
    </AppBar>
  );
}

// Estilo común para los botones para evitar repetición
const buttonStyle = {
  bgcolor: '#FDA80D',
  color: '#FFFFCC',
  boxShadow: '0px 4px 3px #FE8906',
  '&:hover': {
    bgcolor: '#FFD053', // Más claro en hover
  },
  mx: 1 // Aplica un margen horizontal
};

export default Navbar;

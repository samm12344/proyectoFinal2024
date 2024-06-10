import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import imga from "../assets/clashfondo.jpg";
import './Welcomemessage.css';

const WelcomeMessage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h2" sx={{ color: '#fda80d' }} gutterBottom>
        Clash Royale API
      </Typography>
      
      <div className="image-container">
        <Link to="/cartas">
          <img className="image" src={imga} alt="royale" />
        </Link>
        <Button component={Link} to="/carta" sx={buttonStyle} className="centered-button">
          ENTRAR
        </Button>
      </div>
    </Container>
  );
};

const buttonStyle = {
  bgcolor: '#FDA80D',
  color: '#FFFFCC',
  boxShadow: '0px 4px 3px #FE8906',
  '&:hover': {
    bgcolor: '#FFD053', // Más claro en hover
  },
  position: 'absolute', // Posición absoluta para el botón
  top: '50%', // Centrado vertical
  left: '50%', // Centrado horizontal
  transform: 'translate(-50%, -50%)', // Ajuste fino para centrar exactamente
};

export default WelcomeMessage;

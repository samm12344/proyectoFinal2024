import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Swal from 'sweetalert2';
import './Card.css';

const Guardados = () => {
  const [savedPlayers, setSavedPlayers] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    const players = JSON.parse(localStorage.getItem('savedPlayers')) || [];
    setSavedPlayers(players);

    const cards = JSON.parse(localStorage.getItem('savedCards')) || [];
    setSavedCards(cards);
  }, []);

  const handleRemovePlayer = (playerTag) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newSavedPlayers = savedPlayers.filter(player => player.tag !== playerTag);
        localStorage.setItem('savedPlayers', JSON.stringify(newSavedPlayers));
        setSavedPlayers(newSavedPlayers);
        Swal.fire('Eliminado!', 'El jugador ha sido eliminado.', 'success');
      }
    });
  };

  const handleRemoveCard = (cardId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newSavedCards = savedCards.filter(card => card.id !== cardId);
        localStorage.setItem('savedCards', JSON.stringify(newSavedCards));
        setSavedCards(newSavedCards);
        Swal.fire('Eliminada!', 'La carta ha sido eliminada.', 'success');
      }
    });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h2" sx={{ color: '#fda80d' }} gutterBottom>
        Jugadores Guardados
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tag</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Nivel</TableCell>
              <TableCell>Trofeos</TableCell>
              <TableCell>Clan</TableCell>
              <TableCell>Carta Favorita</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedPlayers.map((player) => (
              <TableRow key={player.tag}>
                <TableCell>{player.tag}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.expLevel}</TableCell>
                <TableCell>{player.trophies}</TableCell>
                <TableCell>{player.clan ? player.clan.name : 'Sin Clan'}</TableCell>
                <TableCell>
                  <img 
                    src={player.currentFavouriteCard.iconUrls.medium} 
                    alt={player.currentFavouriteCard.name}
                    style={{ width: '50px', height: '50px' }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    className="save-button saved"
                    onClick={() => handleRemovePlayer(player.tag)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h2" sx={{ color: '#fda80d', marginTop: '50px' }} gutterBottom>
        Cartas Guardadas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Elixir</TableCell>
              <TableCell>Nivel Máximo</TableCell>
              <TableCell>Rareza</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedCards.map((card) => (
              <TableRow key={card.id}>
                <TableCell>{card.name}</TableCell>
                <TableCell>{card.elixirCost}</TableCell>
                <TableCell>{card.maxLevel}</TableCell>
                <TableCell>{card.rarity}</TableCell>
                <TableCell>
                  <img 
                    src={card.iconUrls.medium} 
                    alt={card.name}
                    style={{ width: '50px', height: '50px' }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    className="save-button saved"
                    onClick={() => handleRemoveCard(card.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Guardados;

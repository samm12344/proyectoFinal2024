import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch } from '@mui/material';
import Swal from 'sweetalert2';
import './Card.css';

const Player = () => {
  const [playerTag, setPlayerTag] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [savedPlayers, setSavedPlayers] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [searchedPlayers, setSearchedPlayers] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedPlayers')) || [];
    setSavedPlayers(saved);
  }, []);

  const handleSearch = () => {
    const formattedTag = playerTag.startsWith('#') ? playerTag.substring(1) : playerTag;
    const saved = JSON.parse(localStorage.getItem('savedPlayers')) || [];
    const playerExists = saved.find(savedPlayer => savedPlayer.tag === `#${formattedTag}`);

    if (playerExists) {
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'El jugador ya está guardado.',
      });
      setPlayerData(playerExists);
      setSearchedPlayers(prev => [...prev, playerExists]);
    } else {
      fetch(`/api/v1/players/%23${formattedTag}`, {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImRiZmVjZjk1LWVhYTMtNDgyMi04Y2Y3LTRhODNmNjE4MDVkNyIsImlhdCI6MTcxNzczMzY1MSwic3ViIjoiZGV2ZWxvcGVyLzY2MTRlZThiLWFjNmMtMDU0NS04Y2QxLTNhMmVlMzVhYzBhNyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxODcuMTQ4LjEyNi4yMjMiXSwidHlwZSI6ImNsaWVudCJ9XX0.f1MWaTuTZ_MhCuZ_4QORJct4Ab9jCrMwgq8ZSQcHikKgxXJDcir-jq_P_6cgdpRHU-CyNZ08Lp6LL1aUufnW0A`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setPlayerData(data);
          setSearchedPlayers(prev => [...prev, data]);
        })
        .catch(error => {
          setPlayerData(null);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró el jugador.',
          });
          console.error('Error fetching data:', error);
        });
    }
  };

  const handleSavePlayer = (player) => {
    const saved = JSON.parse(localStorage.getItem('savedPlayers')) || [];
    const playerExists = saved.find(savedPlayer => savedPlayer.tag === player.tag);

    if (!playerExists) {
      saved.push(player);
      localStorage.setItem('savedPlayers', JSON.stringify(saved));
      setSavedPlayers(saved);
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Jugador guardado exitosamente.',
      });
    }
  };

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
        const saved = JSON.parse(localStorage.getItem('savedPlayers')) || [];
        const newSavedPlayers = saved.filter(savedPlayer => savedPlayer.tag !== playerTag);
        localStorage.setItem('savedPlayers', JSON.stringify(newSavedPlayers));
        setSavedPlayers(newSavedPlayers);
        Swal.fire(
          'Eliminado!',
          'El jugador ha sido eliminado.',
          'success'
        );
      }
    });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h2" sx={{ color: '#fda80d' }} gutterBottom>
        Buscar Jugador de Clash Royale
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          label="Tag del Jugador"
          variant="outlined"
          value={playerTag}
          onChange={e => setPlayerTag(e.target.value)}
          style={{ marginRight: '20px' }}
        />
        <Button
          className="save-button not-saved"
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="body1" style={{ marginRight: '10px' }}>
          Mostrar guardados
        </Typography>
        <Switch
          checked={showSaved}
          onChange={() => setShowSaved(!showSaved)}
          color="primary"
        />
      </div>
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
            {(showSaved ? savedPlayers : searchedPlayers).map((player) => (
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
                  {savedPlayers.find(p => p.tag === player.tag) ? (
                    <Button
                      className="save-button saved"
                      onClick={() => handleRemovePlayer(player.tag)}
                    >
                      Eliminar
                    </Button>
                  ) : (
                    <Button
                      className="save-button not-saved"
                      onClick={() => handleSavePlayer(player)}
                    >
                      Guardar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Player;

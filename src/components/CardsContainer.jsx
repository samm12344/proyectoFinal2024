import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Switch, FormControlLabel } from '@mui/material';
import Card from './Card';
import './Card.css';  // Asegúrate de que los estilos del botón están en este archivo

const CardsContainer = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    fetch('/api/v1/cards', {
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
        setCards(data.items);
        setFilteredCards(data.items);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    let displayedCards = cards;

    if (showSaved) {
      displayedCards = savedCards;
    }

    const filtered = displayedCards.filter(card => 
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.id.toString().includes(searchTerm) ||
      card.maxLevel.toString().includes(searchTerm)
    );
    setFilteredCards(filtered);
  }, [cards, searchTerm, showSaved]);

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h2" sx={{ color: '#fda80d' }} gutterBottom>
        Clash Royale Cards
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          label="Buscar"
          variant="outlined"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ marginRight: '20px' }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={showSaved}
              onChange={e => setShowSaved(e.target.checked)}
              color="primary"
            />
          }
          label="Guardados"
        />
      </div>
      <Grid container spacing={3}>
        {filteredCards.map(card => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card card={card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardsContainer;

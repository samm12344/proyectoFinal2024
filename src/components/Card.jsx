import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Card.css';

const Card = ({ card }) => {
  const [flipped, setFlipped] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    const cardExists = savedCards.find(savedCard => savedCard.id === card.id);
    setIsSaved(!!cardExists);
  }, [card.id]);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  const handleSaveClick = (event) => {
    event.stopPropagation();
    if (isSaved) {
      Swal.fire({
        title: '¿Deseas eliminar esta carta guardada?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
          const newSavedCards = savedCards.filter(savedCard => savedCard.id !== card.id);
          localStorage.setItem('savedCards', JSON.stringify(newSavedCards));
          setIsSaved(false);
          Swal.fire('Eliminado', 'La carta ha sido eliminada', 'success');
        }
      });
    } else {
      Swal.fire({
        title: '¿Deseas guardar esta carta?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
          savedCards.push(card);
          localStorage.setItem('savedCards', JSON.stringify(savedCards));
          setIsSaved(true);
          Swal.fire('Guardado', 'La carta ha sido guardada', 'success');
        }
      });
    }
  };

  const cardClass = `carta ${flipped ? 'vuelta' : ''} carta_${card.rarity}`;

  return (
    <div className="card-container">
      <article className={cardClass} onClick={handleCardClick}>
        <div className="carta__cara carta__cara_delantera cara cara-delantera">
          <span className="carta__cantidad-elixir">{card.elixirCost}</span>
          <div className="carta__borde"></div>
          <figure className="carta__contenido-delantero">
            <img className="carta__ilustracion" src={card.iconUrls.medium} alt={card.name} />
            <figcaption className="carta__nivel"><span>Nivel {card.maxLevel}</span></figcaption>
          </figure>
        </div>
        <div className="carta__cara carta__cara_trasera cara cara-trasera">
          <div className="carta__borde">
            <div className="carta__contenido-trasero">
              <h1 className="carta__nombre-personaje">{card.name}</h1>
              <p className="carta__descripcion">
                <p>ID: {card.id}</p>
                <p>Rareza: {card.rarity}</p>
              </p>
              <img className="carta__icono-clash" src="https://i.ibb.co/Q65LCnk/icono.png" alt="Clash Icon" />
            </div>
          </div>
        </div>
      </article>
      <button 
        className={`save-button ${isSaved ? 'saved' : 'not-saved'}`} 
        onClick={handleSaveClick}
      >
        {isSaved ? 'Guardado' : 'Guardar'}
      </button>
    </div>
  );
};

export default Card;

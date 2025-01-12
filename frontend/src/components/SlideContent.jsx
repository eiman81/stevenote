import React from 'react'
import { Box } from '@mui/material'
import ElementModal from './ElementModal';

export default function SlideContent({ slide, currentSlideNumber, setStore, store, deckId, textProperties, setTextProperties }) {

  const [slideElements, setSlideElements] = React.useState(slide.elements);
  React.useEffect(() => {
    setSlideElements(slide.elements);
  }, [slide.elements]);

  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedElement, setSelectedElement] = React.useState(null);

  const handleDeleteElement = (e, id) => {
    e.preventDefault();
    let newStore = store;
    newStore.decks.filter(deck => deck.id === parseInt(deckId))[0].slides[currentSlideNumber - 1].elements = newStore.decks.filter(deck => deck.id === parseInt(deckId))[0].slides[currentSlideNumber - 1].elements.filter(el => el.id !== id);
    setStore(newStore);
    setSlideElements(newStore.decks.filter(deck => deck.id === parseInt(deckId))[0].slides[currentSlideNumber - 1].elements);
  };  

  const handleEditElement = (id) => {
    console.log(id);
    let newStore = store;
    const element = newStore.decks.filter(deck => deck.id === parseInt(deckId))[0].slides[currentSlideNumber - 1].elements.filter(el => el.id === id.id)[0];
    element.text = textProperties.text;
    element.positionX = textProperties.positionX;
    element.positionY = textProperties.positionY;
    element.sizeWidth = textProperties.sizeWidth;
    element.sizeHeight = textProperties.sizeHeight;
    element.fontSize = textProperties.fontSize;
    element.color = textProperties.color;
    setStore(newStore);
    setSlideElements(newStore.decks.filter(deck => deck.id === parseInt(deckId))[0].slides[currentSlideNumber - 1].elements);
    setOpenEditModal(false);
  }

  return (
    <Box
      width={600}
      height={400}
      sx={{
        position: 'relative',
        padding: 4,
        boxShadow: 5,
        borderRadius: 2,
        bgcolor: 'grey.100',
        margin: 'auto',
      }}
    >
      {slideElements.map((el) => (
        <Box
          key={el.id}
          sx={{
            position: 'absolute',
            top: `${el.positionY}%`,
            left: `${el.positionX}%`,
            width: `${el.sizeWidth}%`,
            height: `${el.sizeHeight}%`,
            fontSize: `${el.fontSize}em`,
            color: el.color,
            padding: '4px',
            zIndex: el.layer,
            overflow: 'hidden',
            border: '1px solid #D3D3D3',
          }}
          onDoubleClick={() => {
            setSelectedElement(el)
            setOpenEditModal(true)
          }}
          onContextMenu={(e) => handleDeleteElement(e, el.id)}
        >
          {el.text}
        </Box>
      ))}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '50px',
          height: '50px',
          fontSize: '1em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px', 
        }}
      >
        {currentSlideNumber}
      </Box>
      <ElementModal 
        formType='edit'
        open={openEditModal} 
        onClose={() => setOpenEditModal(false)} 
        onSubmit={() => handleEditElement(selectedElement)}
        textProperties={textProperties}
        //currentTextProperties={selectedElement ? slideElements.filter(el => selectedElement.id === el.id)[0] : textProperties}
        setTextProperties={setTextProperties}
      />
    </Box>
  )
}
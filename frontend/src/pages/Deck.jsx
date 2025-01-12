import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, Container, Typography } from '@mui/material'
import DeckHeader from '../components/DeckHeader'
import SlideList from '../components/SlideList'
import SlideContent from '../components/SlideContent'
import SlideControls from '../components/SlideControls'
import ConfirmPopup from '../components/ConfirmPopup'
import DialogForm from '../components/DialogForm'
import ElementModal from '../components/ElementModal'

export default function Deck({ token }) {
  const { deckId } = useParams()
  const navigate = useNavigate()
  const [store, setStore] = useState(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [openEditTitle, setOpenEditTitle] = useState(false)
  const [openElementDialog, setOpenElementDialog] = useState(false)
  const [textProperties, setTextProperties] = useState({
    type: 'text',
    text: '',
    positionX: 0,
    positionY: 0,
    sizeWidth: 50,
    sizeHeight: 50,
    fontSize: 1,
    color: '#000000',
  })

  useEffect(() => {
    if (token) {
      fetchStore()
    }
  }, [token])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') navigatePreviousSlide()
      else if (e.key === 'ArrowRight') navigateNextSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlideIndex, store])

  const fetchStore = async () => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStore(response.data.store)
    } catch (error) {
      alert(error.response.data.error)
    }
  }

  const reallySetStore = async (newStore) => {
    try {
      await axios.put('http://localhost:5005/store', { store: newStore }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStore(newStore)
    } catch (error) {
      alert(error.response.data.error)
    }
  }

  const navigateNextSlide = () => {
    if (store && currentSlideIndex < store.decks.find(deck => deck.id === parseInt(deckId)).slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const navigatePreviousSlide = () => {
    if (store && currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }

  const deleteSlide = (index) => {
    if (!store) return
    if (store.decks.find(deck => deck.id === parseInt(deckId)).slides.length === 1) {
      setOpenDeleteConfirm(true)
      return
    }
    const newStore = {
      ...store,
      decks: store.decks.map(deck =>
        deck.id === parseInt(deckId)
          ? {
            ...deck,
            slides: deck.slides
              .filter(slide => slide.id !== index)
              .map((slide, idx) => ({ ...slide, id: idx, number: idx+1 }))
          }
          : deck
      )
    }
    reallySetStore(newStore)
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }

  const handleDeleteDeck = () => {
    const newStore = {
      ...store,
      decks: store.decks.filter(deck => deck.id !== parseInt(deckId))
    }
    reallySetStore(newStore)
    setOpenDeleteConfirm(false)
    navigate('/dashboard')
  }

  const handleChangeTitle = (formValues) => {
    const newStore = {
      ...store,
      decks: store.decks.map(deck =>
        deck.id === parseInt(deckId)
          ? { ...deck, title: formValues.title, thumbnail: formValues.thumbnail }
          : deck
      )
    }
    reallySetStore(newStore)
    setOpenEditTitle(false)
  }

  const handleAddSlide = () => {
    if (!store) return
    const newStore = {
      ...store,
      decks: store.decks.map(deck =>
        deck.id === parseInt(deckId)
          ? {
            ...deck,
            slides: [
              ...deck.slides,
              {
                id: deck.slides.length === 0 ? 0 : deck.slides[deck.slides.length - 1].id + 1,
                number: deck.slides.length + 1,
                elements: []
              }
            ]
          }
          : deck
      )
    }
    reallySetStore(newStore)
  }

  const handleAddTextElement = () => {
    const newTextElement = {
      ...textProperties,
      id: Date.now(),
      position: { x: 0, y: 0 },
      layer: store.decks.find(deck => deck.id === parseInt(deckId)).slides[currentSlideIndex].elements.length,
    }
    
    const newStore = {
      ...store,
      decks: store.decks.map(deck =>
        deck.id === parseInt(deckId)
          ? {
            ...deck,
            slides: deck.slides.map((slide, idx) =>
              idx === currentSlideIndex
                ? {
                  ...slide,
                  elements: [...slide.elements, newTextElement]
                }
                : slide
            )
          }
          : deck
      )
    }
    reallySetStore(newStore)
    setOpenElementDialog(false)
  }

  if (!store) return <Typography>Loading...</Typography>

  const currentDeck = store.decks.find(deck => deck.id === parseInt(deckId))
  if (!currentDeck) return <Typography>Deck not found</Typography>


  return (
    <>
      <DeckHeader 
        title={currentDeck.title} 
        onEditTitle={() => setOpenEditTitle(true)}
        onAddElement={() => setOpenElementDialog(true)}
      />
      <Box sx={{ display: 'flex', bgcolor: 'background.paper' }}>
        <SlideList
          slides={currentDeck.slides}
          currentSlideIndex={currentSlideIndex}
          onSlideSelect={setCurrentSlideIndex}
          onAddSlide={handleAddSlide}
        />
        <Container maxWidth="lg" sx={{ flexShrink: 1 }}>
          <SlideContent
            slide={currentDeck.slides[currentSlideIndex]}
            currentSlideNumber={currentSlideIndex + 1}
            setStore={reallySetStore}
            store={store}
            deckId={deckId}
            textProperties={textProperties}
            setTextProperties={setTextProperties}
          />
          {currentDeck.slides.length > 1 && (
            <SlideControls
              currentSlideIndex={currentSlideIndex}
              totalSlides={currentDeck.slides.length}
              onPrevious={navigatePreviousSlide}
              onNext={navigateNextSlide}
              onDelete={() => deleteSlide(currentSlideIndex)}
            />
          )}
        </Container>
      </Box>
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <Button onClick={() => navigate('/dashboard')}>Back</Button>
        <Button onClick={() => setOpenDeleteConfirm(true)}>Delete Presentation</Button>
      </Box>
      <ConfirmPopup 
        open={openDeleteConfirm} 
        onClose={() => setOpenDeleteConfirm(false)} 
        onSubmit={handleDeleteDeck}
      />
      <DialogForm
        open={openEditTitle} 
        onClose={() => setOpenEditTitle(false)} 
        onSubmit={handleChangeTitle}
        title='Edit Title'
        data={[
          {
            title: 'Title',
            label: 'Deck Title',
            value: currentDeck.title
          },
          {
            title: 'Thumbnail',
            label: 'Thumbnail URL',
            value: currentDeck.thumbnail
          }
        ]}
      />
      <ElementModal 
        formType='add'
        open={openElementDialog} 
        onClose={() => setOpenElementDialog(false)} 
        onSubmit={handleAddTextElement}
        textProperties={textProperties}
        setTextProperties={setTextProperties}
      />
    </>
  )
}
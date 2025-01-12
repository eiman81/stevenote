import React from 'react'
import axios from 'axios'
import { Box, Button, Container, Typography } from '@mui/material';
import FormDialog from '../components/FormDialog';
import DeckCard from '../components/DeckCard';
import Stack from '@mui/material/Stack';

const Dashboard = (props) => {

  const [store, setStore] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (newDeckTitle) => {
    const newStore = {...store};
    if (!newStore.decks) {
      newStore.decks = [];
    }
    newStore.decks.push({
      id: newStore.decks.length === 0 ? 0 : newStore.decks[newStore.decks.length - 1].id + 1,
      title: newDeckTitle,
      description: '',
      thumbnail: '',
      slides: [
        {
          id: 0,
          number: 1,
          elements: []
        }
      ]
    });
    reallySetStore(newStore);
    handleClose();
  };

  React.useEffect(() => {
    if (props.token) {
      axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: `Bearer ${props.token}`
        }
      })
        .then((response) => {
          setStore(response.data.store);
          props.setStoreFn(response.data.store);
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    }
  }, [props.token]);

  const reallySetStore = (newStore) => {
    axios.put('http://localhost:5005/store', {
      store: newStore
    }, {
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    })
      .then((response) => {
        setStore(newStore);
        props.setStoreFn(newStore);
        console.log(response);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }

  const newDeck = () => {
    setOpen(true);
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: 'background.paper',
            paddingTop: 2,
          }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the Dashboard
          </Typography>
          <Button onClick={() => {newDeck()}} variant='outlined'>New Deck</Button>
        </Box>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ 
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 2
          }}
        >
          {store ? 
            store.decks && store.decks.length > 0 ? 
              store.decks.map(deck => {
                return <DeckCard title={deck.title} key={deck.id} slidesNum={deck.slides.length} deckId={deck.id} thumbnail={deck.thumbnail} />
              }) :
              <Typography>No decks available</Typography>
            : 
            'Loading...'}
        </Stack>

      </Container>
      <FormDialog 
        open={open} 
        onClose={handleClose} 
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default Dashboard
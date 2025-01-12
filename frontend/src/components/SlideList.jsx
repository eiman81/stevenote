import { List, ListItemButton, ListItemText } from '@mui/material'

export default function SlideList({ slides, onSlideSelect, onAddSlide }) {
  return (
    <List
      sx={{ 
        width: '100%',
        maxWidth: 200, 
        bgcolor: 'background.paper', 
        position: 'relative', 
        overflow: 'auto', 
        maxHeight: 400, 
        height: 400,
        flexShrink: 1,
      }}
      component="nav"
    >
      {slides.map((slide, index) => (
        <ListItemButton 
          key={index} 
          onClick={() => onSlideSelect(index)}
          sx={{
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <ListItemText primary={`${slide.number}`} />
        </ListItemButton>
      ))}
      <ListItemButton 
        dense={true} 
        sx={{
          textAlign: 'center',
          justifyContent: 'center',       
        }}
        onClick={onAddSlide}
      >
        <ListItemText primary='New Slide' />
      </ListItemButton>
    </List>
  )
}
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import DeleteIcon from '@mui/icons-material/Delete'

export default function SlideControls({ currentSlideIndex, totalSlides, onPrevious, onNext, onDelete }) {
  return (
    <Box display="flex" justifyContent="center" mt={2} alignItems="center">
      <IconButton
        onClick={onPrevious}
        disabled={currentSlideIndex === 0}
        sx={{ opacity: currentSlideIndex === 0 ? 0.5 : 1 }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Typography variant="body1">
        Slide {currentSlideIndex + 1} of {totalSlides}
      </Typography>
      <IconButton
        onClick={onNext}
        disabled={currentSlideIndex === totalSlides - 1}
        sx={{ opacity: currentSlideIndex === totalSlides - 1 ? 0.5 : 1 }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
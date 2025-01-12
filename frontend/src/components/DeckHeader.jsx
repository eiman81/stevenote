import { Box, Typography, IconButton } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import CodeIcon from '@mui/icons-material/Code'

export default function DeckHeader({ title, onEditTitle, onAddElement }) {
  return (
    <Box 
      component="section" 
      sx={{ 
        display: 'flex', 
        p: 2, 
        border: '1px dashed grey',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h4'>{title}</Typography>
        <IconButton onClick={onEditTitle}>
          <EditNoteIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={onAddElement}>
          <TextFieldsIcon />
        </IconButton>
        <IconButton>
          <AddPhotoAlternateIcon />
        </IconButton>
        <IconButton>
          <VideoCallIcon />
        </IconButton>
        <IconButton>
          <CodeIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
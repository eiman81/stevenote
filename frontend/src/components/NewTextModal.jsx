import { DialogTitle, DialogContent, DialogContentText, TextField, Typography, Slider } from '@mui/material'

const NewTextModal = ({ textProperties, setTextProperties }) => {
  return (
    <>
      <DialogTitle>Insert New Text</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the text you want to add to the slide.
        </DialogContentText>
        <TextField
          margin="dense"
          id="text-field"
          label="Text"
          type="text"
          fullWidth
          variant="standard"
          value={textProperties.text}
          onChange={(e) => setTextProperties({ ...textProperties, text: e.target.value })}
          autoFocus
        />
        <DialogContentText>
          Text Area Size (height and width %)
        </DialogContentText>
        <Typography id="discrete-slider" gutterBottom>
        Width
        </Typography>
        <Slider
          aria-label="width size"
          defaultValue={50}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={100}
          value={textProperties.sizeWidth}
          onChange={(e) => setTextProperties({ ...textProperties, sizeWidth: e.target.value })}

        />
        <Typography id="discrete-slider" gutterBottom>
        height
        </Typography>
        <Slider
          aria-label="height size"
          defaultValue={50}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={100}
          value={textProperties.sizeHeight}
          onChange={(e) => setTextProperties({ ...textProperties, sizeHeight: e.target.value })}
          
        />
        <DialogContentText>
        Font Size (em)
        </DialogContentText>
        <TextField
          margin="dense"
          id="font-size-field"
          label="Font Size"
          type="number"
          fullWidth
          variant="standard"
          value={textProperties.fontSize}
          onChange={(e) => setTextProperties({ ...textProperties, fontSize: e.target.value })}
          
        />
        <DialogContentText>
        Colour (hex)
        </DialogContentText>
        <TextField
          margin="dense"
          id="colour-field"
          label="Colour"
          type="text"
          fullWidth
          variant="standard"
          value={textProperties.color}
          onChange={(e) => setTextProperties({ ...textProperties, color: e.target.value })}
            
        />
      </DialogContent>
    </>

  )
}

export default NewTextModal
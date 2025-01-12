import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';

const DeckCard = ({ title, description, thumbnail, slidesNum, deckId }) => {

  return (
    <Card sx={{ maxWidth: 345, width: 250 }}>
      <CardActionArea component={Link} to={"/deck/"+deckId}>
        <CardMedia
          component="img"
          height="140"
          image={thumbnail ? thumbnail : 'https://media.licdn.com/dms/image/C5112AQEMm84DCiQDXA/article-cover_image-shrink_600_2000/0/1520203338232?e=2147483647&v=beta&t=7ivy6wbh6eq6X-COPPe0kRoVo6dqzNYJnIHZ9_JK8No'}
          alt="presentation thumbnail"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
          {slidesNum && (
            <Typography variant="body2" color="text.secondary">
              {slidesNum} {slidesNum == 1 ? 'slide' : 'slides'}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );    
}

export default DeckCard
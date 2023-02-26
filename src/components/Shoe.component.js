import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Shoe = ({ shoe }) => {

  return (
    <Card className='my-3 p-3 rounded card-main card-main-sm card-main-md'>
      <Link to={`/shoes/${shoe.id}`}>
        <Card.Img src={shoe.src} variant='top' alt={shoe.title} style={{ maxHeight: '10rem' }} />
      </Link>
      <Card.Body>
        <Link to={`/shoes/${shoe.id}`}>
          <Card.Title as='div' className='mt-1-sm'>
            <strong>
              {shoe.title}
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as='h5' className='mb-3'>
          {shoe.price} ש"ח{' '}
        </Card.Text>

      </Card.Body>
    </Card>
  );
};

export default Shoe;

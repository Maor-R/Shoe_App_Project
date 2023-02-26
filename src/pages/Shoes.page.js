import { Row, Col } from 'react-bootstrap';

import { Shoe, Message } from './../components';
import { Spinner } from './../components/layout';

const Shoes = ({  shoes, loading, error }) => {



  return (
    <Row>
      {loading ? (
        <Spinner />
      ) : error.isError ? (
        <Message variant='danger' dismissible={false}>
            {error.message}
        </Message>
      ) : (
            shoes
          .map((shoe) => (
            <Col key={shoe.id} sm={12} md={6} lg={3} xl={3}>
              <Shoe shoe={shoe}  />
            </Col>
          ))
      )}
    </Row>
  );
};

export default Shoes;
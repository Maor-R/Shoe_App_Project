import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import api from './../api/api';

import { Spinner } from '../components/layout';
import {  Message } from '../components';

const Shoe = () => {
  const { shoeId } = useParams();
  const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    isError: false,
    message: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getShoe = async () => {
      try {
        const response = await api.get(`/Shoes/${shoeId}`);
        setShoe(response.data);
      } catch (error) {
        console.error(error);
        setError({
          isError: true,
          message: error.response.data.message
        });
      } finally {
        setLoading(false);
      }
    };

    getShoe();
  }, [shoeId]);

  const handleDelete = async () => {
    try {
      await api.delete(`/Shoes/${shoe.id}`);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        message: error.response.data.message
      });
    }
  };

  const handleEdit = async () => {
    navigate(`/shoes/${shoe.id}/edit`);
  };


  return (
    <>
      <Button onClick={() => navigate('/')} className='mb-3'>
        Back
      </Button>

      {loading ? (
        <Spinner />
      ) : error.isError ? (
        <Message variant='danger' dismissible={false}>
            {error.message}
        </Message>
      ) : (
        <>
          <Row>
                <Col md={12}>
                  <Image src={shoe.src} alt={shoe.title} fluid />
                </Col>
                <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                          <Col>Name:</Col>
                          <Col>
                            <strong>
                              {shoe.title}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong
                              style={{ fontSize: shoe.price > 999 && '0.85rem' }}
                        >
                          {shoe.price}{' '}ש"ח
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                        <>
                      <ListGroup.Item>
                            <Button onClick={handleEdit}> Edit</Button>
                      </ListGroup.Item>
                      <ListGroup.Item>
                            <Button variant="danger" onClick={handleDelete}> Delete</Button>
                      </ListGroup.Item>
                        </>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Shoe;

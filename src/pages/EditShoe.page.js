import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

import api from './../api/api';

import { Spinner } from '../components/layout';
import { Message } from '../components';

const EditShoe = () => {
  const { shoeId } = useParams();
  const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    isError: false,
    message: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    src: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getShoe = async () => {
      try {
        const response = await api.get(`/Shoes/${shoeId}`);
        setShoe(response.data);
        setFormData({
          title: response.data.title,
          price: response.data.price,
          src: response.data.src        });
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCancel = () => {
    navigate(`/shoes/${shoe.id}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/Shoes/${shoeId}`, formData);
      navigate(`/shoes/${shoeId}`);
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        message: error.response.data.message
      });
    }
    finally{window.location.reload()}
  };

  if (loading) {
    return <Spinner />;
  }

  if (error.isError) {
    return (
      <Message variant='danger' dismissible={false}>
        {error.message}
      </Message>
    );
  }

  return (
    <>
      <Button onClick={() => navigate(`/shoes/${shoe.id}`)} className='mb-3'>
        Back
      </Button>

      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formName'>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='text'
                name='title'
                maxLength="40"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='formPrice'>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type='number'
                name='price'
                min="1" max="999"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>


            <Form.Group controlId='formThumbnail'>
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type='text'
                name='src'
                value={formData.src}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant='secondary' onClick={handleCancel} className='mr-2'>
              Cancel
            </Button>
            <Button variant='primary' type='submit'>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EditShoe;

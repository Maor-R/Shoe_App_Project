import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

import api from './../api/api';

import { Message } from '../components';

const AddShoe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    src: '',
  });
  const [error, setError] = useState({
    isError: false,
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/Shoes', formData);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        message: error.response.data.message
      });
    }
  };

  return (
    <>
      <Button onClick={() => navigate('/')} className='mb-3'>
        Back
      </Button>

      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formName'>
              <Form.Control
                type='text'
                name='title'
                maxLength="40"
                placeholder='Name'
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='formPrice'>
              <Form.Control
                type='number'
                min="1" max="999"
                name='price'
                placeholder='Price'
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='formThumbnail'>
              <Form.Control
                type='text'
                name='src'
                placeholder='Image'
                value={formData.src}
                onChange={handleChange}
              />
            </Form.Group>


            {error.isError && (
              <Message variant='danger' dismissible={false}>
                {error.message}
              </Message>
            )}

            <Button variant='primary' type='submit'>
              Add Shoe
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddShoe;

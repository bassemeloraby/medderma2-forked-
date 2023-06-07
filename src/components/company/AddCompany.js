import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { addcomp } from '../../features/productReducer/ProductSlice';

function AddCompany() {
  const [companyName, setCompanyName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const companySubmit = (e) => {
    e.preventDefault();

    dispatch(addComp({ companyName }));
    setProductName('');
    navigate('/companies')
  };

  return (
    <div>
    <h2>create user</h2>
      <Form onSubmit={companySubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Company Name</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              value={companyName}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddCompany;
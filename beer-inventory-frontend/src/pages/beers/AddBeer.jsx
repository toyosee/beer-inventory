import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, InputGroup, Form, Container, Dropdown } from 'react-bootstrap';

function AddBeer() {
  const [beer, setBeer] = useState({
    tap_number: null,
    name: '',
    type: '',
    brewery_id: '',
    supplier_id: '',
    description: '',
    flavor_details: '',
    price_per_keg: '',
    arrival_date: '',
    keg_size: '',
    serving_sizes: '',
    price_per_serving_size: '',
    category_id: null,
    tap_id: null,
    status: "ordered"
  });

  const [breweries, setBreweries] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [kegSizes, setKegSizes] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true); // Set it to true to initially disable the input

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch breweries and suppliers to populate dropdowns
    axios
      .get('http://localhost:5001/api/breweries')
      .then((response) => {
        setBreweries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching breweries:', error);
      });

    axios
      .get('http://localhost:5001/api/suppliers')
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching suppliers:', error);
      });

    // Fetch keg sizes from the kegsizes table
    axios
      .get('http://localhost:5001/api/kegsizes')
      .then((response) => {
        setKegSizes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching keg sizes:', error);
      });
  }, []);

  const handleChange = (e) => {
    setBeer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const beerUrl = 'http://localhost:5001/api/beers/';

    try {
      await axios.post(beerUrl, beer);
      navigate('/beer');
    } catch (err) {
      console.error('Error adding beer:', err);
    }
  };

  return (
    <>
    <div className='form contMargin'>
      <h1>Order Beer</h1>
      <InputGroup size="lg">
        <InputGroup.Text id="tap_number">Tap Number</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          name="tap_number"
          type="number"
          aria-describedby="tap_number"
          disabled={isDisabled}
        />
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="name">Beer Name</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          name="name"
          type="text"
          aria-describedby="name"
        />
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="type">Type of Beer</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          name="type"
          aria-describedby="type"
        />
      </InputGroup>

      <div>
        <label htmlFor="brewery_id">Brewery:</label>
        <select
          className="form-select"
          name="brewery_id"
          onChange={handleChange}
          defaultValue={''}
        >
          <option value="" disabled>
            Select Brewery
          </option>
          {breweries.map((brewery) => (
            <option key={brewery.brewery_id} value={brewery.brewery_id}>
              {brewery.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="supplier_id">Supplier:</label>
        <select
          className="form-select"
          name="supplier_id"
          onChange={handleChange}
          defaultValue={''}
        >
          <option value="" disabled>
            Select Supplier
          </option>
          {suppliers.map((supplier) => (
            <option key={supplier.supplier_id} value={supplier.supplier_id}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>

      <InputGroup size="lg">
        <InputGroup.Text id="description">Brief Description</InputGroup.Text>
        <Form.Control
          as="textarea" // Use textarea for brief description
          onChange={handleChange}
          name="description"
          aria-describedby="description"
        />
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="flavor_details">Flavor Details</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          name="flavor_details"
          type="text"
          aria-describedby="flavor_details"
        />
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="price_per_keg">Price Per Keg ($)</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          name="price_per_keg"
          type="number"
          aria-describedby="price_per_keg"
        />
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="arrival_date">Arrival Date</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          name="arrival_date"
          type="date"
          aria-describedby="arrival_date"
        />
      </InputGroup>

      <div>
        <label htmlFor="keg_size">Keg Size:</label>
        <select
          className="form-select"
          name="keg_size"
          onChange={handleChange}
          defaultValue={''}
        >
          <option value="" disabled>
            Select Keg Size
          </option>
          {kegSizes.map((kegSize) => (
            <option key={kegSize.keg_size_id} value={kegSize.keg_size_id}>
              {kegSize.size}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="serving_sizes">Serving Sizes:</label>
        <select
          className="form-select"
          name="serving_sizes"
          onChange={handleChange}
          defaultValue={''}
        >
          <option value="" disabled>
            Select Serving Sizes
          </option>
          <option value="16oz">16oz</option>
          <option value="10oz">10oz</option>
          <option value="6oz">6oz</option>
        </select>
      </div>

      <InputGroup size="lg">
        <InputGroup.Text id="price_per_serving_size">
          Price Per Serving ($)
        </InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          name="price_per_serving_size"
          type="number"
          aria-describedby="price_per_serving_size"
        />
      </InputGroup>
        <div className="btn-div">
        <Button className='btn-extra' onClick={handleClick}>
        Order
      </Button>
      <Button variant='primary' size='lg' href={"/beer"} className="update-link btn-extra">
            Back
        </Button>
        </div>

    </div>
    </>
  );
}

export default AddBeer;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function TapList() {
  const [tapList, setTapList] = useState([]);
  const [untappedList, setUntappedList] = useState([]);
  const tapListUrl = 'http://localhost:5001/api/tap/';
  const untappedListUrl = 'http://localhost:5001/api/tap/untappedList';
  const updateUrl = 'http://localhost:5001/api/tap/updateStatus';

  useEffect(() => {
    // const tapListUrl = 'http://localhost:5001/api/tap/';
    // const untappedListUrl = 'http://localhost:5001/api/tap/untappedList';

    // Fetch data from the tapList URL
    axios.get(tapListUrl).then((response) => {
      if (response.data && response.data.tapList) {
        setTapList(response.data.tapList);
      } else {
        console.error('tapList data is missing in the response');
      }
    });

    // Fetch data from the untappedList URL
    axios.get(untappedListUrl).then((response) => {
      if (response.data && response.data.untappedList) {
        setUntappedList(response.data.untappedList);
      } else {
        console.error('untappedList data is missing in the response');
      }
    });
  }, []);

  const updateBeerStatus = (beerId, newStatus) => {
    // console.log('Beer ID:', beerId);
    // console.log('New Status:', newStatus);
  
    axios.patch(`${updateUrl}/${beerId}`, { status: newStatus }).then(() => {
      // After updating the beer status, fetch both tapList and untappedList
      const tapListUrl = 'http://localhost:5001/api/tap/';
      const untappedListUrl = 'http://localhost:5001/api/tap/untappedList';
  
      // Fetch data from the tapList URL
      axios.get(tapListUrl).then((tapResponse) => {
        if (tapResponse.data && tapResponse.data.tapList) {
          setTapList(tapResponse.data.tapList);
        } else {
          console.error('tapList data is missing in the response');
        }
      });
  
      // Fetch data from the untappedList URL
      axios.get(untappedListUrl).then((untappedResponse) => {
        if (untappedResponse.data && untappedResponse.data.untappedList) {
          setUntappedList(untappedResponse.data.untappedList);
        } else {
          console.error('untappedList data is missing in the response');
        }
      });
    });
  };
  
  

  return (
    <>
    <Container className='contMargin'>
      <h2>Tap List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="tbl-left">Beer Name</th>
            <th className="tbl-left">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tapList.map((beer) => (
            <tr key={beer.product_id}>
              <td className="tbl-left">{beer.name}</td>
              <td
                    className="tbl-left"
                    style={{
                      fontWeight: 'bolder',
                      fontSize: '20px',
                      color:
                        beer.status === 'upcoming'
                          ? 'grey'
                          : beer.status === 'on-tap'
                          ? 'green'
                          : beer.status === 'ordered'
                          ? 'orange'
                          : 'red',
                    }}
                  >
                    {beer.status}
            </td>

              <td>
                <Button
                  variant="danger"
                  onClick={() => updateBeerStatus(beer.product_id, 'empty')}
                  className='tap'
                >
                  Mark as Empty
                </Button>
                <Button
                  variant="primary"
                  onClick={() => updateBeerStatus(beer.product_id, 'upcoming')}
                  className='tap'
                >
                  Mark as Not Received
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <h2>Untapped List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="tbl-left">Beer Name</th>
            <th className="tbl-left">Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {untappedList.map((beer) => (
            <tr key={beer.product_id}>
              <td className="tbl-left">{beer.name}</td>
              <td
                    className="tbl-left"
                    style={{
                      fontWeight: 'bolder',
                      fontSize: '20px',
                      color:
                        beer.status === 'upcoming'
                          ? 'grey'
                          : beer.status === 'on-tap'
                          ? 'green'
                          : beer.status === 'ordered'
                          ? 'orange'
                          : 'red',
                    }}
                  >
                    {beer.status}
            </td>
              <td>
                <Button
                  variant="success"
                  onClick={() => updateBeerStatus(beer.product_id, 'on-tap')}
                >
                  Put On Tap
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
</>
  );
}

export default TapList;
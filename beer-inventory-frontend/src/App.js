import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import './styles.css';
import Beers from './pages/beers/Beers';
import AddBeer from './pages/beers/AddBeer';
import Update from './pages/beers/UpdateBeer';
import Breweries from './pages/breweries/Breweries';
import AddBreweries from './pages/breweries/AddBreweries';
import UpdateBrewery from './pages/breweries/UpdateBreweries';
import Suppliers from './pages/suppliers/Suppliers';
import AddSuppliers from './pages/suppliers/AddSuppliers';
import UpdateSupplier from './pages/suppliers/UpdateSupplier';
import Categories from './pages/categories/Categories';
import AddCategories from './pages/categories/AddCategories';
import UpdateCategory from './pages/categories/UpdateCategories';
import KegSize from './pages/kegsizes/KegSize';
import AddKegSize from './pages/kegsizes/AddKegSize';
import UpdateKegsize from './pages/kegsizes/UpdateKegsize';
import Users from './pages/users/Users';
import AddUsers from './pages/users/AddUsers';
import UpdateUser from './pages/users/UpdateUser';
import TapList from './pages/taplist/TapList'
import Login from './pages/users/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Navbar className='fixed-top' expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">University Of Beer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/beer">Beers</Nav.Link>
              <Nav.Link href="/breweries">Breweries</Nav.Link>
              <Nav.Link href="/taplist">Lists/Deliveries</Nav.Link>
              <NavDropdown title="Extra" id="basic-nav-dropdown">
                <NavDropdown.Item href="/categories">Categories</NavDropdown.Item>
                <NavDropdown.Item href="/suppliers">Suppliers</NavDropdown.Item>
                <NavDropdown.Item href="/kegsizes">Keg Sizes</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/users">Staff</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav.Link href="/login" className="ms-auto" style={{ color: 'white' }}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/beer" element={<Beers />} />
            <Route path="/beer/add" element={<AddBeer />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/breweries" element={<Breweries />} />
            <Route path="/breweries/add" element={<AddBreweries />} />
            <Route path="/breweries/update/:id" element={<UpdateBrewery />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/suppliers/add" element={<AddSuppliers />} />
            <Route path="/suppliers/update/:id" element={<UpdateSupplier />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/add" element={<AddCategories />} />
            <Route path="/categories/update/:id" element={<UpdateCategory />} />
            <Route path="/kegsizes" element={<KegSize />} />
            <Route path="/kegsizes/add" element={<AddKegSize />} />
            <Route path="/kegsizes/update/:id" element={<UpdateKegsize />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/add" element={<AddUsers />} />
            <Route path="/users/update/:id" element={<UpdateUser />} />
            <Route path="/taplist" element={<TapList />} /> {/* Add the TapList route */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

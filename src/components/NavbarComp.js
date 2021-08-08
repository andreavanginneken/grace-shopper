import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import { SearchBar } from '../components';
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
} from 'react-bootstrap';

import { logoutUser, getAllAlbums } from '../api';

import LoginModal from './Login.js';
import RegisterModal from './Register.js';

const NavbarComp = (props) => {
  const { user, setUser, admin, setAdmin, allAlbums, setAllAlbums } = props;
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleClick = async() => {
    const allAlbums = await getAllAlbums()
    setAllAlbums(allAlbums)
  }

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: 'var(--color-primary)',
      }}
      className="fixed-top"
    >
      <Container>
        <Link
          to={'/'}
          style={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            width: '4rem',
          }}
        >
          <>
            Vinyl{' '}
            <span role="img" aria-label="Rock and Roll">
              🤘
            </span>
          </>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Navbar.Text>
              <Link to={'/'} style={{ marginLeft: '1rem' }}>
                Home
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to={'/albums'} onClick={handleClick} style={{ marginLeft: '1rem' }}>
                Albums
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to={'/orders'} style={{ marginLeft: '1rem' }}>
                Cart
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to={'/checkout'} style={{ marginLeft: '1rem' }}>
                Checkout
              </Link>
            </Navbar.Text>
            {admin ? (
              <Navbar.Text>
                <Link to={'/admin'} style={{ marginLeft: '1rem' }}>
                  Admin
                </Link>
              </Navbar.Text>
            ) : (
              ''
            )}
            <Form
              style={{
                 marginLeft: '300px', 
              }}
            >
            <SearchBar allAlbums={allAlbums} setAllAlbums={setAllAlbums}/>
            </Form>
            {!user.username ? (
              <>
                <Button
                  onClick={handleShowLogin}
                  variant="warning"
                  style={{ marginLeft: '1rem' }}
                >
                  Login
                </Button>
                <Button
                  onClick={handleShowRegister}
                  variant="warning"
                  style={{ marginLeft: '1rem' }}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  logoutUser();
                  setUser({});
                  setAdmin(false);
                }}
                variant="warning"
                style={{ marginLeft: '1rem' }}
              >
                Logout ({user.username.split(' ')[0]})
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setUser={setUser}
        setAdmin={setAdmin}
      />
      <RegisterModal
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        setUser={setUser}
      />
    </Navbar>
  );
};

export default NavbarComp;

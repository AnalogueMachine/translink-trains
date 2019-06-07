import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='/'>Translink Trains</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='https://github.com/GoodCoverage'>GitHub</Nav.Link>
          <Nav.Link href='http://twitter.com/Good_Coverage'>Twitter</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
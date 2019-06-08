import { shallow } from 'enzyme';
import Header from '../Header';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const collapseId = 'basic-navbar-nav';

describe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('should return a Navbar component', () => {
    expect(wrapper.type()).toBe(Navbar);
  });

  it('should have the correct properties', () => {
    expect(wrapper.props().bg).toEqual('light');
    expect(wrapper.props().expand).toEqual('lg');
  });

  describe('Brand element', () => {
    let brandElement;

    beforeEach(() => {
      brandElement = wrapper.props().children[0];
    })

    it('should be the correct type', () => {  
      expect(brandElement.type).toBe(Navbar.Brand);
    });

    it('should have the appropriate text', () => {
      expect(brandElement.props.children).toBe('Translink Trains');
    });

    it('should contain a link to itself', () => {
      expect(brandElement.props.href).toBe('/');
    });
  });

  describe('Collapse toggle element', () => {
    let toggle;

    beforeEach(() => {
      toggle = wrapper.props().children[1];
    });

    it('should be the correct type', () => {
      expect(toggle.type).toBe(Navbar.Toggle);
    });

    it('should toggle the correct element using its id', () => {
      expect(toggle.props).toHaveProperty('aria-controls', collapseId);
    });
  });

  describe('Collapse element', () => {
    let collapseElement;

    beforeEach(() => {
      collapseElement = wrapper.props().children[2];
    });

    it('should be the correct type of element', () => {
      expect(collapseElement.type).toBe(Navbar.Collapse)
    });

    it('should have an id that matches the toggle aria control', () => {
      expect(collapseElement.props.id).toEqual(collapseId);
    });

    describe('Nav element', () => {
      let navElement;

      beforeEach(() => {
        navElement = collapseElement.props.children;
      });

      it('should be a Nav element', () => {
        expect(navElement.type).toBe(Nav);
      });

      it('should be have the correct style class', () => {
        expect(navElement.props.className).toBe('mr-auto');
      });

      describe('Nav links', () => {
        let links;

        beforeEach(() => {
          links = navElement.props.children;
        });

        it('should contain two links', () => {
          expect(links.length).toEqual(2);
        });

        it('should be the correct element in all cases', () => {
          links.forEach((link) => {
            expect(link.type).toBe(Nav.Link);
          });
        });
        
        it('should have a link to GitHub as the first link', () => {
          expect(links[0].props.href).toBe("https://github.com/HundredPercecntCoverage");
          expect(links[0].props.children).toBe('GitHub');
        });

        it('should have a link to Twitter as the second link', () => {
          expect(links[1].props.href).toBe("http://twitter.com/");
          expect(links[1].props.children).toBe('Twitter');
        });
      });
    });
  });
});

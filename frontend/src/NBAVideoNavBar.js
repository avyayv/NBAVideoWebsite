import React from 'react';
import {Navbar, Container} from 'react-bootstrap';

class NBAVideoNavBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">
                    <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                NBA Video Searcher 
                </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

export default NBAVideoNavBar;
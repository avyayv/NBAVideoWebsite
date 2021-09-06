import React from 'react';
import {Navbar, Container} from 'react-bootstrap';

class NBAVideoNavBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">
                NBA Video Searcher 
                </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

export default NBAVideoNavBar;
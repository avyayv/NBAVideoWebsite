import {Button, InputGroup, FormControl}  from 'react-bootstrap';
import React from 'react';

class InputBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            playerId: "0"
        }
    }

    makeRequest = () => {
        const url = `https://nbastatsvideoapi-n4b6xkst7q-de.a.run.app/?player_id=${this.state.playerId}`;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.setShots(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    render() {
        return (
            <div className="search-div">
                <div className="search">
                    <InputGroup className="search-box">
                        
                        <FormControl
                            placeholder="Player ID"
                            aria-describedby="basic-addon1"
                            onChange={e => this.setState({ playerId: e.target.value })}
                        />

                        <Button variant="success" onClick={this.makeRequest} id="button-addon2">
                            Search 
                        </Button>
                    </InputGroup>
                </div>
            </div>
        )
    }
}

export default InputBox;
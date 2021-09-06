import {Button, InputGroup, FormControl}  from 'react-bootstrap';
import React from 'react';
import jsonData from "./PlayerNameToId.json";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015

class InputBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            playerName: "0"
        }
    }

    makeRequest = () => {
        let playerId = jsonData[this.state.playerName]
        const url = `https://nbastatsvideoapi-n4b6xkst7q-de.a.run.app/?player_id=${playerId}`;
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
                        
                        <Typeahead
                            id="basic-typeahead-single"
                            placeholder="Player Name"
                            aria-describedby="basic-addon1"
                            options={Object.keys(jsonData)}
                            onChange={selected => this.setState({ playerName: selected })}
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
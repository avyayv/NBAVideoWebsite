import { Button, InputGroup }  from 'react-bootstrap';
import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015

class InputBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            playerName: "0",
            players: {},
            teams: {},
        }
    }

    getPlayersAndTeams = () => {

        const playersUrl = `https://nbastatsvideoapi-n4b6xkst7q-de.a.run.app/players`;

        fetch(playersUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({players: result})
                },
                (error) => {
                    console.log(error)
                }
            )

        const teamsUrl = `https://nbastatsvideoapi-n4b6xkst7q-de.a.run.app/teams`;

        fetch(teamsUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({teams: result})
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    makeRequest = () => {
        let playerId = this.state.players[this.state.playerName]
        const url = `https://nbastatsvideoapi-n4b6xkst7q-de.a.run.app/videos?player_id=${playerId}`;
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

    componentDidMount() {
        this.getPlayersAndTeams()
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
                            options={Object.keys(this.state.players)}
                            onChange={selected => this.setState({ playerName: selected })}
                        />

                        <Button onClick={this.makeRequest} id="button-addon2">
                            Search 
                        </Button>
                    </InputGroup>
                </div>
            </div>
        )
    }
}

export default InputBox;
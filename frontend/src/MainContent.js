import React from 'react';
import SidePanelTable from './SidePanelTable';
import InputBox from './InputBox';
import VideoPlayer from './VideoPlayer';
import {Container} from 'react-bootstrap';

class MainContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {shots: [], video: ""}
    }

    setShots = (shots) => {
        this.setState({shots: shots})
        console.log(shots)
    }

    setVideo = (videoUrl) => {
        this.setState({video: videoUrl})
        console.log(videoUrl)
    }

    render() {
        return (
            <Container className="main-content">
                <InputBox setShots={this.setShots}/>
                <VideoPlayer src={this.state.video}/>
                <SidePanelTable setVideo={this.setVideo} shots={this.state.shots}/>
            </Container>
        )
    }
}

export default MainContent;

import React from 'react';

class VideoPlayer extends React.Component {
    render() {
        return (
            <div className="video-player">
                <video key={this.props.src} width="640" height="360" controls loop autoPlay muted playsInline>
                    <source src={this.props.src} type="video/mp4"></source>
                    <p>
                        Your browser doesn't support HTML5 video. Here is a <a href={this.props.src}>
                            link to the video</a> instead.
                    </p>
                </video>
            </div>
        )
    }
}

export default VideoPlayer;
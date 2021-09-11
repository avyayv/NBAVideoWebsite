import React from 'react';

class VideoPlayer extends React.Component {
    render() {
        if (this.props.src) {
            return (
                <div className="video-player">
                    <video key={this.props.src} width="810" height="450" controls loop autoPlay playsInline>
                        <source src={this.props.src} type="video/mp4"></source>
                        <p>
                            Your browser doesn't support HTML5 video. Here is a <a href={this.props.src}>
                                link to the video</a> instead.
                        </p>
                    </video>
                </div>
            )
        }
        return null;
    }
}

export default VideoPlayer;
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';


@observer
export default class Video extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isPlay: false}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (nextProps.video != this.props.video) || (nextProps.isPlaying != this.props.isPlaying)|| (nextState.isPlay != this.state.isPlay);
	}

	onSongClicked = (video) => {
		this.setState({isPlay: !this.state.isPlay})
		let message = JSON.stringify({"event":"command","func":`${this.state.isPlay? 'pauseVideo': 'playVideo'}`,"args":""});
		document.getElementById('player').contentWindow.postMessage(message, '*');

		this.props.onSongClicked(video);
	}

	onAddSong = (video, event) => {
		event.stopPropagation();
		this.props.onAddSong(video);
	}

	onRemoveSong = (video, event) => {
		event.stopPropagation();
		this.props.onRemoveSong(video, this.props.videoKey);
	}

	render() {
		let {video, isPlaying} = this.props;
		let isPlay = this.state.isPlay;
		console.log(isPlay);
		return (
				<div className={'video ' + (isPlaying? 'is-playing ': '') + (isPlay? 'played': 'paused')} onClick={() => this.onSongClicked(video)}>
					<img src={`https://img.youtube.com/vi/${video.videoId}/default.jpg`}/>
					<div className="name" title={video.name}>{video.name}</div>
					{(isPlaying && isPlay)? <div className="play-stop pause"></div> : <div className="play-stop play"></div>}
					<div className="button">
						{ this.props.onAddSong && <div onClick={(event) => this.onAddSong(video, event)}>+</div> }			
						{ !this.props.onAddSong && <div onClick={(event) => this.onRemoveSong(video, event)}>x</div> }			
					</div>
				</div>
			
		);
	}
}

Video.propTypes = {
  videoKey: PropTypes.string,
  video: PropTypes.object,
  onRemoveSong: PropTypes.func,
  onSongClicked: PropTypes.func,
  isPlaying: PropTypes.bool
};
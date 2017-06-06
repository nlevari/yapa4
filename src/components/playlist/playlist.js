import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Video from '../video/video';
import Search from '../search/search';
import { playlistsStore } from '../../stores/playlists-store'

@observer
export default class Playlist extends React.Component {

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		return (nextProps.playlist != this.props.playlist) || ((nextProps.isPlaying != this.props.isPlaying));
	}

	onSongClicked = (video) => {
		this.props.onSongClicked(video, this.props.order);
	}

	onAddSong = (video) => {
		this.props.onAddSong(video, this.props.order);
	}

	onRemoveSong = (video, key) => {
		this.props.onRemoveSong(video, this.props.order, key);
	}

	renameTitle = (e) => {
		if(e.key == 'Enter' || (e.target.value && e.target.value.length < 1)){
                this.props.updateTitle(e.target.value, this.props.order)
        } 
		else {
			console.log('not Enter');
		}
	}

	isItPlaying = (key) => {
		return this.props.isPlaying && this.props.playlist.videos[key] == playlistsStore.currentSong;
	}

	render() {
		let playlist = this.props.playlist;
		let {isPlaying} = this.props;
		return (
			<div className={`playlist ${isPlaying && 'is-playing'}`}>
				<div className="playlist-name-wrapper">
					<input className='playlist-name' defaultValue={playlist.name} onKeyUp={this.renameTitle}/>
				</div>
				{playlist.videos && Object.keys(playlist.videos).map((key, i) => <Video key={i} videoKey={key} video={playlist.videos[key]}
						onRemoveSong={this.onRemoveSong} onSongClicked={this.onSongClicked} isPlaying={this.isItPlaying(key)}/>)}
				<Search onSongClicked={this.onSongClicked} onAddSong={this.onAddSong}/>
			</div>
		);
	}
}

Playlist.propTypes = {
  order: PropTypes.number,
  onRemoveSong: PropTypes.func,
  onAddSong: PropTypes.func,
  onSongClicked: PropTypes.func,  
  updateTitle: PropTypes.func,
  playlist: PropTypes.object,
  isPlaying: PropTypes.bool
};

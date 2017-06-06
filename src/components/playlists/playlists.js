import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Playlist from '../playlist/playlist';
import { playlistsStore } from '../../stores/playlists-store'

const N = 5;

@observer
export default class Playlists extends React.Component {

	constructor(props) {
		super(props);
		this.previousLength = 0;
	}

	componentWillMount() {
		playlistsStore.getAllPlaylists();
		// playlistsStore.addToPlaylistsListener(() => this.currentPlaylists = playlistsStore.playlists)
	}

	onSongClicked(video, plIndex) {
		playlistsStore.setCurrentSong(video, plIndex);
	}

	onAddSong(id, order) {
		playlistsStore.addVideo(id, order);
	}

	onRemoveSong(id, order, key) {
		playlistsStore.removeVideo(id, order, key);
	}
	createPlaylists = (playlists) => {
		let plHtml = [];
		for (let i = 0; i < N; i++) {
			let currentPlaylist = playlistsStore.playlists.get(i.toString())
			if (playlistsStore.playlists.has(i.toString())) {
				plHtml.push(<Playlist key={i} order={i} onRemoveSong={this.onRemoveSong} onAddSong={this.onAddSong} 
				onSongClicked={this.onSongClicked} updateTitle={this.updateTitle}
				playlist={currentPlaylist} 
				isPlaying={playlistsStore.currentPlaylist == i}/>);
			}
			else {
				playlistsStore.addPlaylistListener(i);
			}
		}
		return plHtml;
	}

	addPlaylist = () => {
		playlistsStore.addPlaylist()
	}

	updateTitle = (newName, index) => {
		playlistsStore.updateTitle(newName, index)
	}

	render() {
		console.log("renderd master")
		let { playlists } = playlistsStore;
		return (
			<div className="playlists">
				{this.createPlaylists(playlists)}
				<h3 className="add-playlist" onClick={this.addPlaylist}>+ Add a playlist</h3>
			</div>
		);
	}
}

Playlists.propTypes = {
};
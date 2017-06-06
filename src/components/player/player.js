import React from 'react';
import PropTypes from 'prop-types';
import fetchJsonp from 'fetch-jsonp';
import { observer } from 'mobx-react';
import { playlistsStore } from '../../stores/playlists-store'


@observer
export default class Player extends React.Component {

	constructor(props) {
		super(props);
	}

	playNextVideo = (event) => {
		if (event.data == YT.PlayerState.ENDED || (this.perviousState == YT.PlayerState.BUFFERING & event.data ==  YT.PlayerState.UNSTARTED)) {
			let VideosObject = playlistsStore.playlists.get(playlistsStore.currentPlaylist).videos
			let allVideos2 = Object.values(VideosObject)
			let currentIndex = allVideos2.indexOf(playlistsStore.currentSong)
			if (currentIndex === allVideos2.length - 1){
				playlistsStore.setCurrentSong(allVideos2[0], playlistsStore.currentPlaylist)
			}
			else {
				playlistsStore.setCurrentSong(allVideos2[currentIndex + 1], playlistsStore.currentPlaylist)
			}
		}
		this.perviousState = event.data
	}

	render() {
		let currentSong = playlistsStore.currentSong;
		console.log('rendered player')
		if (window.embededPlayer) {
			window.embededPlayer.loadVideoById(currentSong.videoId);
		}
		else {
			window.onYouTubePlayerAPIReady = () => {
				window.embededPlayer = new YT.Player('player', {
					playerVars: { 'autoplay': 0, 'controls': 1, 'autohide': 1, 'wmode': 'opaque' },
					videoId: currentSong,
					events: {
						'onStateChange': this.playNextVideo.bind(this)
					}
				});
			}
			fetchJsonp('https://www.youtube.com/player_api').catch(()=> {
				gapi.client.load('youtube', 'v3', function(){
					gapi.client.setApiKey('AIzaSyBqpr4ZyWFW_5DSMYYUfexk5QETtMgZ2P8');
				});
			})
		}
		return (
			<div id="player"></div>
		);
	}
}

Player.propTypes = {
};
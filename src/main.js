import React from 'react';
import ReactDOM from 'react-dom';
import Playlists from './components/playlists/playlists';
import Player from './components/player/player';


import './styles/style.scss'

ReactDOM.render((
	<div>
		<h1>Share playlists</h1>
		<Playlists />
		<Player/>
	</div>
), document.querySelector('#app'));
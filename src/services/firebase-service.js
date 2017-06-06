// import PlaylistsStore from './stores/playlists-store'

const firebase = require("firebase/app");
// require("firebase/auth");
require("firebase/database");

const config = {
	apiKey: "AIzaSyBqpr4ZyWFW_5DSMYYUfexk5QETtMgZ2P8",
	authDomain: "yapa2project.firebaseapp.com",
	databaseURL: "https://yapa2project.firebaseio.com",
	projectId: "yapa2project",
	storageBucket: "yapa2project.appspot.com",
	messagingSenderId: "947219997841"
};

class FirebaseService {
	constructor() {
		firebase.initializeApp(config);
		this.db = firebase.database();
		this.playlists = this.db.ref('/yapa2/playlists')
		this.liseners = [];
	}

	getAllPlaylists = (callback) => {
		// this.playlists.on('value', callback);
		this.playlists.once('value').then(callback);
	}

	getPagePlaylists = (index) => {
		this.playlists.on('value', function (snapshot) {
		});
	}

	addPlaylistListener(index, callback) {
		if (this.liseners.indexOf(index) == -1) {
			let currentPlaylist = this.db.ref('/yapa2/playlists/' + index);
			currentPlaylist.on('value', callback);
			this.liseners.push(index)
		}
	}

	addVideo = (video, index) => {
		let currentPlaylist = this.db.ref('/yapa2/playlists/' + index + '/videos');
		currentPlaylist.push().set(video);
	}

	updateTitle(newName, index) {
        let currentPlaylist = this.db.ref('/yapa2/playlists/').child(index);
		currentPlaylist.update({name: newName});
    }

	removeVideo = (video, index, key) => {
		let currentPlaylist = this.db.ref('/yapa2/playlists/' + index + '/videos/' + key);
		currentPlaylist.remove();
	}

	addPlaylist = () => {
		let playlists = this.db.ref('/yapa2/playlists/');
		playlists.push().set({name: 'untitled', videos: {}});
	}
}

export let firebaseService = new FirebaseService();
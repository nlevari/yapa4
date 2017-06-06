import { computed, observable, action, reaction, autorun } from 'mobx'
import { firebaseService } from '../services/firebase-service'

class PlaylistsStore {
    playlists = observable.map({});
    @observable currentSong = "";
    @observable currentPlaylist = -1;
    // @observable playlists = [];

    // @computed get numberOfPlaylists() {
    //     return this.playlists.lentgh;
    // }

    constructor() {
    }

    addToPlaylistsListener(callback) {
        reaction(
            () => this.playlists.keys().map(i => i),
            (names) => callback()
        );
    }

    addToPlaylistListener(playlistKey, callback) {
        reaction(
            () => this.playlists[playlistKey].keys().map(i => i),
            (names) => callback()
        );
    }

    @action setCurrentSong = (video, plIndex) => {
        this.currentSong = video;
        this.currentPlaylist = plIndex;
    }

    @action addVideo = (video, index) => {
        firebaseService.addVideo(video, index)
    }

    @action removeVideo = (video, index, key) => {
        firebaseService.removeVideo(video, index, key)
    }

    @action playlistHandler = (snapshot) => {
        let currentVal = snapshot.val();
        if (currentVal) {
            this.playlists.set(snapshot.key, currentVal);
        }
    }

    @action playlistsRecievedHandler = (snapshot) => {
        let snapshotVal = snapshot.val();
        // this.playlists.merge(snapshot);
        Object.keys(snapshotVal).forEach((key, i) => {
            this.playlists.set(i, snapshotVal[key]);
        }, this);
    }

    getAllPlaylists() {
        firebaseService.getAllPlaylists(this.playlistsRecievedHandler)
    }

    addPlaylistListener(index) {
        firebaseService.addPlaylistListener(index, this.playlistHandler)
    }

    addPlaylist(index) {
        firebaseService.addPlaylist()
    }

    updateTitle(newName, index) {
        firebaseService.updateTitle(newName, index)
    }
}

export let playlistsStore = new PlaylistsStore();

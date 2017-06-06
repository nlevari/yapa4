import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Video from '../video/video';
// import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';


@observer
export default class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = {searchResult: [], autocompletes: []}
	}

	searchVideo = (e) => {
		if(e.key == 'Enter' || (e.target.value && e.target.value.length < 3)){
        
        } 
		else {
			if (this.timerId) {
				clearTimeout(this.timerId)
			}
			this.timerId = setTimeout(this.searchCall.bind(this,e.target.value),300)
		}
	}

	searchCall = (q) => {
				let request = gapi.client.youtube.search.list(
				{
				part: 'snippet',
				type: 'video',
				maxResults: 10,
				safeSearch: 'strict',
				q: q,
				});
				
				request.execute(this.onSearchResponse);
	}

	onSearchResponse = (response) =>{
		
		let searchResult = response.items.map((video) => {
			return {
				'videoId': video.id.videoId,
				'url': `https://www.youtube.com/watch?v=${video.id.videoId}`,
				'name': video.snippet.title
			}
		})
		this.setState({searchResult: searchResult, show: true})
	}

	onSongClicked = (id) => {
		this.props.onSongClicked(id);
	}

	addVideo = (video, index) => {
		index = this.state.searchResult.indexOf(video)
		this.state.searchResult.splice(index, 1)
		this.setState({searchResult:this.state.searchResult})
		this.props.onAddSong(video, index);

	}

	resetSearchResults = (e) => {
		if(!e.relatedTarget || e.relatedTarget.className != 'search-results') {
			this.setState({searchResult: []})
		}
	}

	render() {
		let {searchResult, autocompletes} = this.state;
		return (
			<div tabIndex="2" className="search" onBlur={(event) => this.resetSearchResults(event)}>
				<input type="text" id="one" onKeyUp={this.searchVideo}/>
					{ autocompletes && 
					<ul>
						{autocompletes.map((auto, i) => <li key={i} onAutoClicked={this.onSongClicked}>auto</li>) }
					</ul>}
				<div tabIndex="1" className="search-results" onBlur={() => this.resetSearchResults('lili')}>
					{ searchResult && searchResult.map((video, i) => <Video key={i} video={video} onSongClicked={this.onSongClicked} onAddSong={(video) => this.addVideo(video)}/>) }
				</div>
			</div>
		);
	}
}

Search.propTypes = {
  onSongClicked: PropTypes.func,
  onAddSong: PropTypes.func
};

import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './search_bar';
import VideoList from './video_list';
import VideoDetail from './video_detail';
const API_KEY = 'AIzaSyBn7awoZqb307RdorC__3Iq4iAg-ccmsqg';




export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
       videos: [],
       selectedVideo: null
     };
     this.videoSearch();


  }

  videoSearch(term='surfboards'){
    YTSearch({key: API_KEY, term: term},
                videos => this.setState({
                                        videos: videos,
                                        selectedVideo: videos[0]
                                    })
            );
  }
  render() {
    const videoSearch = _.debounce( term => this.videoSearch(term), 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
              onVideoSelect = { selectedVideo => this.setState({selectedVideo: selectedVideo})}
              videos={this.state.videos} />
      </div>
    );
  }
}

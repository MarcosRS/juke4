import React, {Component} from 'react';
import Lyrics from '../components/Lyrics';
import axios from 'axios';

import {setLyrics} from '../action-creators/lyrics';
import {fetchLyrics} from '../action-creators/lyrics';
import store from '../store';

export default class extends Component {

  constructor() {

    super();

    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState());

    this.handleArtistInput = this.handleArtistInput.bind(this);
    this.handleSongInput = this.handleSongInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleArtistInput(artist) {
    this.setState({ artistQuery: artist });
  }

  handleSongInput(song) {
    this.setState({ songQuery: song });
  }

  // handleSubmit(event) {

  //   event.preventDefault();
  //   if (this.state.artistQuery && this.state.songQuery) {

  //     axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
  //       .then(response => {
  //         const setLyricsAction = setLyrics(response.data.lyric);
  //         store.dispatch(setLyricsAction);           
  //       })
  //       .catch(function(){
  //         const setLyricsAction = setLyrics('Song not Found')
  //         store.dispatch(setLyricsAction);  
  //       });

  //   }

  // }


  handleSubmit(event) {
    event.preventDefault();
    if (this.state.artistQuery && this.state.songQuery) {
      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));
    }
  }

  render() {
    return <Lyrics
      text={this.state.text}
      setArtist={this.handleArtistInput}
      setSong={this.handleSongInput}
      artistQuery={this.state.artistQuery}
      songQuery={this.state.songQuery}
      handleSubmit={this.handleSubmit}
    />
  }

}
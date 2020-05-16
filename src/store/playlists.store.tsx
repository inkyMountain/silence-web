import {observable, action} from 'mobx';

class PlaylistStore {
  @observable
  playlists: Array<Playlist> = [];

  @action
  setPlaylists(playlists: Array<Playlist>) {
    this.playlists = playlists;
  }

  @observable
  selectedPlaylist: Partial<Playlist> = {};

  @action
  setSelectedPlaylist(playlist: Playlist) {
    this.selectedPlaylist = playlist;
  }

  @observable
  playlistDetail: Partial<PlaylistDetail> = {};

  @action
  setPlaylistDetail(playlistDetail: PlaylistDetail) {
    this.playlistDetail = playlistDetail;
  }


  @observable
  track: Partial<Track> = {};

  @action
  setTrack(track: Track) {
    this.track = track;
  }
}

export default new PlaylistStore();

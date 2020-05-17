import {observable, action} from 'mobx';

class PlaylistStore {
  @observable
    // 歌单列表
  playlists: Array<Playlist> = [];

  @action
  setPlaylists(playlists: Array<Playlist>) {
    this.playlists = playlists;
  }

  @observable
    // 当前选中的歌单，Main组件展示用。
  selectedPlaylist: Partial<Playlist> = {};

  @action
  setSelectedPlaylist(playlist: Playlist) {
    this.selectedPlaylist = playlist;
  }

  @observable
    // 歌单包含的歌曲
  playlistDetail: Partial<PlaylistDetail> = {};

  @action
  setPlaylistDetail(playlistDetail: Partial<PlaylistDetail>) {
    this.playlistDetail = playlistDetail;
  }

  @observable
    // 歌单包含的歌曲
  playlistDetailInUse: Partial<PlaylistDetail> = {};

  @action
  setPlaylistDetailInUse(playlistDetailInUse: Partial<PlaylistDetail>) {
    this.playlistDetailInUse = playlistDetailInUse;
  }

  @observable
    // track即歌曲信息
  track: Partial<Track> = {};

  @action
  setTrack(track: Track) {
    this.track = track;
  }

  @observable
    // 歌曲链接数组
  songs: Array<Song> = [];

  @action
  setSongs(songs: Array<Song>) {
    this.songs = songs;
  }

  @observable
    // 歌曲链接数组
  songsInUse: Array<Song> = [];

  @action
  setSongsInUse(songs: Array<Song>) {
    this.songs = songs;
  }

  @observable
  howler: Howl | undefined;

  @action
  setHowler(howler: Howl) {
    this.howler = howler;
  };
}

export default new PlaylistStore();

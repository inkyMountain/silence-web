interface Playlist {
  adType: number;
  anonimous: boolean;
  artists: null;
  backgroundCoverId: number;
  backgroundCoverUrl: string;
  cloudTrackCount: number;
  commentThreadId: string;
  coverImgId: number;
  coverImgUrl: string;
  createTime: number;
  creator: {
    accountStatus: number;
    authStatus: number;
    authority: number;
    avatarImgId: number;
    avatarImgIdStr: string;
    avatarImgId_str: string;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundImgIdStr: string;
    backgroundUrl: string;
    birthday: number;
    city: number;
    defaultAvatar: false
    description: string;
    detailDescription: string;
    djStatus: number;
    expertTags: null
    experts: null
    followed: false
    gender: number;
    mutual: false
    nickname: string;
    province: number;
    remarkName: null
    signature: string;
    userId: number;
    userType: number;
    vipType: number;
  }
  description: string;
  englishTitle: string;
  highQuality: boolean;
  id: number;
  name: string;
  newImported: boolean;
  opRecommend: boolean;
  ordered: boolean;
  playCount: number;
  privacy: number;
  recommendInfo: string;
  specialType: number;
  status: number;
  subscribed: boolean;
  subscribedCount: number;
  subscribers: Array<any>;
  tags: Array<string>;
  titleImage: number;
  titleImageUrl: null
  totalDuration: number;
  trackCount: number;
  trackNumberUpdateTime: number;
  trackUpdateTime: number;
  tracks: null;
  updateFrequency: null;
  updateTime: number;
  userId: number;
}

interface UserAccount {
  id?: number;
  userName?: string;
  type?: number;
  status?: number;
  whitelistAuthority?: number;
  createTime?: number;
  salt?: string;
  tokenVersion?: number;
  ban?: number;
  baoyueVersion?: number;
  vipType?: number;
  vipTypeVersion?: number;
  anonimousUser?: boolean;
}

interface UserProfile {
  nickname?: string;
  accountStatus?: number
  authStatus?: number;
  authority?: number;
  avatarImgId?: number;
  avatarImgIdStr?: string;
  avatarImgId_str?: string;
  avatarUrl?: string;
  backgroundImgId?: number;
  backgroundImgIdStr?: string;
  backgroundUrl?: string;
  birthday?: number;
  city?: number;
  defaultAvatar?: false
  description?: string;
  detailDescription?: string;
  djStatus?: number;
  eventCount?: number;
  expertTags?: null;
  followed?: boolean;
  followeds?: number;
  follows?: number;
  gender?: number;
  mutual?: boolean;
  playlistBeSubscribedCount?: number;
  playlistCount?: number;
  province?: number;
  remarkName?: null
  signature?: string;
  userId?: number;
  userType?: number;
  vipType?: number;
}

interface User {
  account: UserAccount;
  profile: UserProfile;
  isLogin: boolean;
}

interface Track {
  al: {
    id: number;
    name: string;
    pic: number;
    picUrl: string;
    pic_str: string;
  }
  alia: Array<string>;
  ar: Array<{
    id: number;
    name: string;
  }>
  h: { br: number, fid: number, size: number, vd: number }
  id: number;
  l: { br: number, fid: number, size: number, vd: number }
  m: { br: number, fid: number, size: number, vd: number }
  name: string;
  publishTime: number;
}

interface PlaylistDetail {
  playlist: {
    backgroundCoverUrl: string;
    coverImgUrl: string;
    createTime: number;
    id: number;
    description: string;
    name: string;
    playCount: number;
    tags: Array<string>;
    titleImageUrl: string;
    tracks: Array<Track>
  }
}

interface Song {
  br: number;
  canExtend: boolean;
  code: number;
  encodeType: string;
  fee: number;
  flag: number;
  freeTrialInfo: null
  gain: number;
  id: number;
  level: string;
  md5: string;
  size: number;
  // 如 mp3
  type: string;
  url: string;
}

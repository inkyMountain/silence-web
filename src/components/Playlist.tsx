import React, {ButtonHTMLAttributes, FunctionComponent} from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface PlaylistProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const Playlist: FunctionComponent<PlaylistProps> = (props) => {
  const {className} = props;
  return (
    <div className={classNames('playlist', className)}>
      播放列表
    </div>
  );
};

const styledPlaylist = styled(Playlist)`
  display: inline-flex;
  padding: 10px 20px;
`;


export default (styledPlaylist);

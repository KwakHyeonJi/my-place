import { MdMusicNote, MdMusicOff } from 'react-icons/md';
import styled from 'styled-components';

import music from '@assets/sounds/Rinne - Precious you.mp3';
import useAudio from '@hooks/useAudio';

const MusicButtonLayout = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.black};
  box-shadow: -2px 6px 6px rgba(50, 50, 93, 0.5);
  color: #fff;
`;

const MusicButton = () => {
  const [playing, toggle] = useAudio(music);
  return (
    <MusicButtonLayout onClick={toggle}>
      {playing ? <MdMusicNote size={20} /> : <MdMusicOff size={20} />}
    </MusicButtonLayout>
  );
};

export default MusicButton;

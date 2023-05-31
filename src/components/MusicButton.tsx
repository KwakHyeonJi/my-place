import { MdMusicNote, MdMusicOff } from 'react-icons/md';
import styled from 'styled-components';

import music from '@assets/sounds/Rinne - Precious you.mp3';
import Checkbox from '@components/common/Checkbox';
import useAudio from '@hooks/useAudio';

const MusicButtonLayout = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
`;

const MusicButton = () => {
  const [playing, toggle] = useAudio(music);
  return (
    <MusicButtonLayout>
      <Checkbox name="music" checked={playing} handleChange={toggle}>
        {playing ? <MdMusicNote size={20} /> : <MdMusicOff size={20} />}
      </Checkbox>
    </MusicButtonLayout>
  );
};

export default MusicButton;

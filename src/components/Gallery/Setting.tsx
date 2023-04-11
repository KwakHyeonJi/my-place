import styled from 'styled-components';

import ChangeImage from '@components/Gallery/ChangeImage';
import ChangeRatio from '@components/Gallery/ChangeRatio';

const SettingLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 110px;
  right: 30px;

  .setting-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const Setting = () => {
  return (
    <SettingLayout>
      <ChangeImage />
      <ChangeRatio />
    </SettingLayout>
  );
};

export default Setting;

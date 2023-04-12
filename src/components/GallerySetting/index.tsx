import styled from 'styled-components';

import ChangeImage from '@components/GallerySetting/ChangeImage';
import ChangeRatio from '@components/GallerySetting/ChangeRatio';

const GallerySettingLayout = styled.section`
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

const GallerySetting = () => {
  return (
    <GallerySettingLayout>
      <ChangeImage />
      <ChangeRatio />
    </GallerySettingLayout>
  );
};

export default GallerySetting;

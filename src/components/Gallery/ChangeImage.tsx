import { TbReplace } from 'react-icons/tb';
import styled from 'styled-components';

import { setMode } from '@store/features/gallerySlice';
import { useAppDispatch, useAppSelecter } from '@store/store';

const ChangeImageButton = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) =>
    active ? theme.color.black : '#ececec'};
  color: ${({ active, theme }) =>
    active ? theme.color.white : theme.color.black};
`;

const ChangeImage = () => {
  const mode = useAppSelecter((state) => state.gallery.mode);
  const dispatch = useAppDispatch();

  const handleToggleMode = () => {
    if (mode !== 'changeImage') {
      dispatch(setMode({ mode: 'changeImage' }));
    } else {
      dispatch(setMode({ mode: 'default' }));
    }
  };

  return (
    <ChangeImageButton
      className="setting-button"
      onClick={handleToggleMode}
      active={mode === 'changeImage'}
    >
      <TbReplace size={20} />
    </ChangeImageButton>
  );
};

export default ChangeImage;

import { TbReplace } from 'react-icons/tb';
import styled from 'styled-components';

import Checkbox from '@components/common/Checkbox';
import { MODES, changeMode } from '@store/features/gallerySlice';
import { useAppDispatch, useAppSelecter } from '@store/store';

const EditModeButtonLayout = styled.div`
  position: absolute;
  top: 80px;
  right: 30px;
`;

const EditModeButton = () => {
  const mode = useAppSelecter((state) => state.gallery.mode);
  const dispatch = useAppDispatch();

  const handleToggleMode = () => {
    const nextMode = mode === MODES.EDIT ? MODES.DEFAULT : MODES.EDIT;
    dispatch(changeMode({ mode: nextMode }));
  };

  return (
    <EditModeButtonLayout>
      <Checkbox
        name="edit"
        checked={mode === MODES.EDIT}
        handleChange={handleToggleMode}
      >
        <TbReplace size={20} />
      </Checkbox>
    </EditModeButtonLayout>
  );
};

export default EditModeButton;

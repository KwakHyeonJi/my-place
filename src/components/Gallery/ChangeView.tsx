import { VIEWS, ViewValue } from '@constants/gallery';
import React from 'react';
import styled from 'styled-components';

import Radio from '@components/common/Radio';
import RadioGroup from '@components/common/RadioGroup';
import { setView } from '@store/features/gallerySlice';
import { useAppDispatch, useAppSelecter } from '@store/store';

const ChangeViewLayout = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 80px;

  legend,
  span {
    display: none;
  }

  fieldset {
    display: flex;
    gap: 10px;
  }

  [type='radio'] {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ececec;
    box-shadow: -2px 4px 4px rgba(50, 50, 93, 0.5);
    cursor: pointer;
  }
  [type='radio']:checked {
    box-shadow: inset -1px 3px 4px rgba(50, 50, 93, 0.5);
  }
`;

const ChangeView = () => {
  const currentView = useAppSelecter((state) => state.gallery.view);
  const dispatch = useAppDispatch();

  const handleChangeView = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(setView({ view: target.value as ViewValue }));
  };

  return (
    <ChangeViewLayout>
      <RadioGroup
        label="View"
        name="view"
        value={currentView}
        onChange={handleChangeView}
      >
        {Object.values(VIEWS).map((view) => (
          <Radio key={view} value={view}>
            {view}
          </Radio>
        ))}
      </RadioGroup>
    </ChangeViewLayout>
  );
};

export default React.memo(ChangeView);

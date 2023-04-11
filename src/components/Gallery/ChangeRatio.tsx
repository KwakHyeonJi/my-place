import React, { useEffect, useState, useRef } from 'react';
import { IoMdResize } from 'react-icons/io';
import styled from 'styled-components';

import Radio from '@components/common/Radio';
import RadioGroup from '@components/common/RadioGroup';
import { setAspectRatio } from '@store/features/gallerySlice';
import { useAppDispatch, useAppSelecter } from '@store/store';

const ChangeRatioBox = styled.div`
  position: absolute;
  right: 0;
  padding: 20px 60px 20px 25px;
  border-radius: 30px;
  background: #ececec;
  color: ${({ theme }) => theme.color.black};
  transition: opacity 0.5s;

  legend {
    padding: 0 0 5px 0;
    font-weight: 600;
    white-space: nowrap;
  }

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 0 0 0;
    cursor: pointer;
  }

  [type='radio'] {
    appearance: none;
    width: 14px;
    height: 14px;
    border: 1px solid #c3c3c3;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.white};
    transition: border 0.2s ease;
  }
  [type='radio']:checked {
    border: 4px solid ${({ theme }) => theme.color.black};
  }
  [type='radio']:hover {
    box-shadow: 0 0 0 4px #c3c3c3;
  }
`;

const ChangeRatioButton = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) =>
    active ? theme.color.black : '#ececec'};
  color: ${({ active, theme }) =>
    active ? theme.color.white : theme.color.black};
`;

const ratios = [
  [3, 4],
  [9, 16],
  [1, 1],
];

const ChangeRatio = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const aspectRatio = useAppSelecter((state) => state.gallery.aspectRatio);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleChangeRatio = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const [x, y] = target.value.split(':');
    dispatch(setAspectRatio({ x: Number(x), y: Number(y) }));
  };

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (open && !ref.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [open]);

  return (
    <div ref={ref}>
      {open && (
        <ChangeRatioBox>
          <RadioGroup
            label="Aspect ratio"
            name="aspect ratio"
            value={`${aspectRatio.x}:${aspectRatio.y}`}
            onChange={handleChangeRatio}
          >
            {ratios.map((ratio) => (
              <Radio
                key={`${ratio[0]}:${ratio[1]}`}
                value={`${ratio[0]}:${ratio[1]}`}
              >{`${ratio[0]} : ${ratio[1]}`}</Radio>
            ))}
          </RadioGroup>
        </ChangeRatioBox>
      )}
      <ChangeRatioButton
        className="setting-button"
        onClick={handleToggleOpen}
        active={open}
      >
        <IoMdResize size={20} />
      </ChangeRatioButton>
    </div>
  );
};

export default React.memo(ChangeRatio);

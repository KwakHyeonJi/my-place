import { useState } from 'react';
import { IoMdResize } from 'react-icons/io';
import { MdScreenRotation } from 'react-icons/md';
import styled from 'styled-components';

import Radio from '@components/common/Radio';
import RadioGroup from '@components/common/RadioGroup';

const ChangeRatioLayout = styled.div`
  position: absolute;
  top: 90px;
  right: 30px;
`;

const ChangeRatioBox = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  padding: 20px 60px 20px 25px;
  border-radius: 30px;
  background: #ececec;
  color: ${({ theme }) => theme.color.black};
  transition: opacity 0.5s;

  legend {
    padding: 0 0 5px 0;
    font-weight: 600;
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

const ChangeRatioButton = styled.button<{ open: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : '')};
  border-radius: 50%;
  background: ${({ open, theme }) => (open ? theme.color.black : '#ececec')};
  color: ${({ open, theme }) => (open ? theme.color.white : theme.color.black)};
  transition: 0.1s ease;
`;

const ReverseButton = styled.button<{ reverse: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0 0 0;
  padding: 5px 10px;
  border: 1px solid #c3c3c3;
  border-radius: 30px;
  background: ${({ reverse, theme }) =>
    reverse ? '#cbcbcb' : theme.color.white};
  color: ${({ theme }) => theme.color.black};
  transition: background 0.2s ease;
`;

const ratios = [
  [4, 3],
  [16, 9],
  [21, 9],
];

const ChangeRatio = () => {
  const [ratioIndex, setRatioIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [open, setOpen] = useState(true);

  const handleChangeRatio = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setRatioIndex(Number(target.value));
  };

  const handleToggleReverse = () => {
    setReverse(!reverse);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <ChangeRatioLayout>
      <ChangeRatioBox open={open}>
        <RadioGroup
          label="Aspect ratio"
          name="Aspect ratio"
          value={ratioIndex}
          onChange={handleChangeRatio}
        >
          {ratios.map((ratio, index) => (
            <Radio
              key={index}
              value={index}
            >{`${ratio[0]} : ${ratio[1]}`}</Radio>
          ))}
        </RadioGroup>
        <ReverseButton
          type="button"
          reverse={reverse}
          onClick={handleToggleReverse}
        >
          <MdScreenRotation size={20} />
          Reverse
        </ReverseButton>
      </ChangeRatioBox>
      <ChangeRatioButton onClick={handleOpen} open={open}>
        <IoMdResize size={20} />
      </ChangeRatioButton>
    </ChangeRatioLayout>
  );
};

export default ChangeRatio;

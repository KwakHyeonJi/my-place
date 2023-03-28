import { useContext } from 'react';

import RadioContext from '@contexts/RadioContext';

interface RadioProps {
  children: string;
  value: string | number;
  disabled?: boolean;
}

const Radio = ({ children, value, disabled }: RadioProps) => {
  const {
    name,
    value: groupValue,
    disabled: groupDisabled,
    onChange,
  } = useContext(RadioContext);

  return (
    <label>
      <input
        type="radio"
        value={value}
        name={name}
        disabled={disabled || groupDisabled}
        checked={value === groupValue}
        onChange={onChange}
      />
      <span>{children}</span>
    </label>
  );
};

Radio.defaultProps = {
  disabled: false,
};

export default Radio;

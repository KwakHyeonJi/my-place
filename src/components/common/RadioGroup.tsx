import RadioContext from '@contexts/RadioContext';

interface RadioGroupProps {
  children: React.ReactNode;
  label: string;
  name: string;
  value: string | number;
  disabled?: boolean;
  onChange: (e: React.SyntheticEvent) => void;
}

const RadioGroup = ({ label, children, ...rest }: RadioGroupProps) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
    </fieldset>
  );
};

RadioGroup.defaultProps = {
  disabled: false,
};

export default RadioGroup;

import { createContext } from 'react';

interface Radio {
  name: string;
  value: string | number;
  disabled?: boolean;
  onChange: (e: React.SyntheticEvent) => void;
}

const RadioContext = createContext<Radio>({
  name: '',
  value: '',
  onChange: () => {},
});

export default RadioContext;

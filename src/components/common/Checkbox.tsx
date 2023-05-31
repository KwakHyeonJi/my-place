import styled from 'styled-components';

const CheckboxLayout = styled.input`
  appearance: none;

  & + label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ececec;
    box-shadow: -2px 4px 4px rgba(50, 50, 93, 0.5);
    color: ${({ theme }) => theme.color.black};
    cursor: pointer;
  }

  &:checked + label {
    box-shadow: inset -1px 3px 4px rgba(50, 50, 93, 0.5);
  }
`;

interface CheckedProps {
  children: React.ReactNode;
  name: string;
  checked: boolean;
  handleChange: () => void;
}

const Checkbox = ({ children, name, checked, handleChange }: CheckedProps) => {
  return (
    <>
      <CheckboxLayout
        type="checkbox"
        onChange={handleChange}
        id={name}
        name={name}
        checked={checked}
      />
      <label htmlFor={name}>{children}</label>
    </>
  );
};

export default Checkbox;

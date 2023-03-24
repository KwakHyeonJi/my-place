import styled from 'styled-components';

const ChangeViewLayout = styled.ul`
  display: flex;
  gap: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 80px;
`;

const ChangeViewButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #ececec;
  box-shadow: -2px 6px 6px rgba(50, 50, 93, 0.5);
`;

interface ChangeViewProps {
  changeType: (e: React.SyntheticEvent) => void;
}

const viewTypes = ['typeA', 'typeB'];

const ChangeView = ({ changeType }: ChangeViewProps) => {
  return (
    <ChangeViewLayout>
      {viewTypes.map((viewType) => (
        <li key={viewType}>
          <ChangeViewButton data-type={viewType} onClick={changeType} />
        </li>
      ))}
    </ChangeViewLayout>
  );
};

export default ChangeView;

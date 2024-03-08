import { useNavigate } from 'react-router-dom';

import Button from '@components/Button/Button';

const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      purpose="back"
      onClick={(e) => {
        e.preventDefault();

        navigate('..');
      }}
    >
      &larr; Back
    </Button>
  );
};

export default ButtonBack;

import React, { useState } from 'react';
import Authorization from '../components/Authorization';
import { TypeForm } from '../utils/enum/enum';

const Auth: React.FC = () => {
  const [mode, setMode] = useState(TypeForm.Authorization);

  const handlerSelectForm = (formType: TypeForm) => {
    setMode(formType);
  };

  const activeForm =
    mode === TypeForm.Authorization ? (
      <Authorization onSelectForm={handlerSelectForm} />
    ) : (
      <h2>Registration</h2>
    );

  return <>{activeForm}</>;
}

export default Auth;

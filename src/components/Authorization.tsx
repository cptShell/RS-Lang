import React, { MouseEvent, useEffect, useState } from 'react';
import { TypeForm } from '../utils/enum/enum';
import { HandlerSelectForm } from '../utils/types/types';
import { ValuesAuth } from '../utils/interfaces/interfaces';
import { validateAuthorization } from '../utils/functions/validate';
import Button from '../components/Button';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSignInUser } from '../redux/actions/usersCreator';
import { RootState } from '../redux/store';
import { MESSAGE_IS_AUTH } from '../utils/constants/constants';
import { useNavigate } from 'react-router-dom';

const Authorization: React.FC<{ onSelectForm: HandlerSelectForm }> = (props) => {
  const {
    userData: { message },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stateButton, setStateButton] = useState(false);
  useEffect(() => {
    if (message === MESSAGE_IS_AUTH) {
      navigate('/');
    }
  }, [message]);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateAuthorization,
    onSubmit: (values: ValuesAuth) => {
      dispatch(asyncSignInUser(values, setStateButton));
    },
  });

  const handlerSelectRegistration = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    props.onSelectForm(TypeForm.Registration);
  };

  return (
    <div className='form-auth-wrap'>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className='form-group'>
          <label htmlFor='email-auth'>Email</label>
          <input
            type='email'
            name='email'
            className='form-control'
            id='email-auth'
            placeholder='Введите email'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? <div className='form-error'>{formik.errors.email}</div> : ''}
        </div>
        <div className='form-group'>
          <label htmlFor='password-auth'>Пароль</label>
          <input
            type='password'
            name='password'
            className='form-control'
            id='password-auth'
            autoComplete='on'
            placeholder='Введите пароль'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='form-error'>{formik.errors.password}</div>
          ) : (
            ''
          )}
        </div>
        <div className='form-buttons'>
          <Button name='Войти' className='btn btn-primary' type='submit' disabled={stateButton} />
          <a href='/' onClick={handlerSelectRegistration}>
            Регистрация
          </a>
        </div>
      </form>
    </div>
  );
};

export default Authorization;
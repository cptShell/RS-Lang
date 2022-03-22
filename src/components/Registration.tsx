import React, { MouseEvent, useEffect, useState } from 'react';
import { TypeForm } from '../utils/enum/enum';
import { HandlerSelectForm } from '../utils/types/types';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ValuesRegistration } from '../utils/interfaces/interfaces';
import Button from './Button';
import { validateRegistration } from '../utils/functions/validate';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateUser } from '../redux/actions/usersCreator';
import { RootState } from '../redux/store';
import { MESSAGE_IS_AUTH } from '../utils/constants/constants';

const Registration: React.FC<{ onSelectForm: HandlerSelectForm }> = (props) => {
  const {
    userData: { message },
  } = useSelector((state: RootState) => state);
  const [stateButton, setStateButton] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (message === MESSAGE_IS_AUTH) {
      navigate('/');
    }
  }, [message]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validate: validateRegistration,
    onSubmit: (values: ValuesRegistration) => {
      dispatch(asyncCreateUser(setStateButton, values));
    },
  });

  const handlerSelectRegistration = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    props.onSelectForm(TypeForm.Authorization);
  };

  return (
    <div className='form-registration-wrap'>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className='form-group'>
          <label htmlFor='name-user'>Ваше имя</label>
          <input
            type='name'
            name='name'
            className='form-control'
            id='name-user'
            placeholder='Введите имя'
            autoComplete='on'
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <div className='form-error'>{formik.errors.name}</div>}
        </div>
        <div className='form-group'>
          <label htmlFor='email-registration'>Email</label>
          <input
            type='email'
            name='email'
            className='form-control'
            id='email-registration'
            placeholder='Введите email'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <div className='form-error'>{formik.errors.email}</div>}
        </div>
        <div className='form-group'>
          <label htmlFor='password-reg1'>Пароль</label>
          <input
            type='password'
            name='password'
            className='form-control'
            id='password-reg1'
            placeholder='Введите пароль'
            autoComplete='on'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && <div className='form-error'>{formik.errors.password}</div>}
        </div>
        <div className='form-buttons'>
          <Button name='Регистрация' className='btn btn-dark' type='submit' disabled={stateButton} />
          <Link to='/' onClick={handlerSelectRegistration}>
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;

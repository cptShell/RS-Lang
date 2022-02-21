import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageState } from '../../utils/interfaces/interfaces';


const ListGames = ({pageState}: {pageState: PageState}) => {
  const navigate = useNavigate();
  const { group, page } = pageState;

  const onStartSprint = async () => {
    navigate(`/sprint?group=${group}&page=${page}`);
  }

  const onStartAudiocall = async () => {
    navigate(`/audiocall?group=${group}&page=${page}`);
  }

  return (
    <ul className='btn-group d-flex align-items-center gap-2'>
      Проверьте знания слов этой страницы в минииграх:
      <li><button className='btn btn-success' onClick={onStartSprint}>Спринт</button></li>
      <li><button className='btn btn-success'onClick={onStartAudiocall}>Аудиовызов</button></li>
    </ul>
  )
}

export default ListGames;
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { MESSAGE_IS_AUTH } from '../../utils/constants/constants';
import { excludeLearnedWords, getListWordsByNumberGroup } from '../../utils/functions/sprintGameFunctions';
import { listRoutes } from '../../routes/routes';


const ListGames: React.FC<{pageState: {group: number, page: number}}> = (props) => {
  const { userData } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const { group, page } = props.pageState;

  const onStartSprint = async () => {
    let listWords = await getListWordsByNumberGroup(String(group), String(page));
    if (userData.message === MESSAGE_IS_AUTH && listWords) {
      listWords = await excludeLearnedWords(listWords, userData);
    }
    navigate(listRoutes[4].route);
  }

  return (
    <ul className='btn-group d-flex justify-content-center gap-2'>
      <li><button className='btn btn-success' onClick={onStartSprint}>Спринт</button></li>
      <li><button className='btn btn-success'>Аудиовызов</button></li>
    </ul>
  )
}

export default ListGames;
import React, { useEffect, useState } from 'react';
import { BASE_APP_URL, OREDERED_DIFF_LIST } from '../../utils/constants/constants';
import { UserWordData, WordData } from '../../utils/interfaces/interfaces';
import { getUserWordsUrl } from '../../utils/functions/supportMethods';
import axios, { AxiosRequestConfig } from 'axios';
import { getCurrentUserState } from '../../utils/functions/localStorage';

export const DiffToggler = ({wordData}: {wordData: WordData}) => {
  const [isDifficult, setDifficult] = useState<Boolean | null>(null);

  useEffect(() => {
    getDiff();
  }, [isDifficult]);

  const getDiff = async () => {
    const user = getCurrentUserState();
    const url = `${BASE_APP_URL}/users/${user.userId}/aggregatedWords/${wordData.id}`;
    const response = await axios({method: 'get', url, headers: {Authorization: `Bearer ${user.token}`}});
    setDifficult(response.data.isDifficult);
  }

  const toggleDiffWord = async () => {
    const user = getCurrentUserState();
    const url = getUserWordsUrl(user, wordData);
    const response = await axios({method: 'get', url, headers: {Authorization: `Bearer ${user.token}`}});
    const userWordData: UserWordData = response.data;
    userWordData.optional.isDifficult = !isDifficult;
    const axiosConfig: AxiosRequestConfig = {method: 'put', url, headers: {Authorization: `Bearer ${user.token}`}, data: userWordData};

    await axios(axiosConfig);
    setDifficult(!isDifficult);
  }
  
  return (
    <div>
      {isDifficult !== null && <button className={`btn-${isDifficult ? 'danger' : 'success'} rounded d-flex align-items-center`} onClick={toggleDiffWord}>
        <span className='material-icons'>
          {isDifficult ? 'bookmark' : 'bookmark_border'}
        </span>
      </button>}
    </div>
  )
}
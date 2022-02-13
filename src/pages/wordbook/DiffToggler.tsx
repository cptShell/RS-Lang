import React, { useEffect, useState } from 'react';
import { OREDERED_DIFF_LIST } from '../../utils/constants/constants';
import { UserWordData, WordData } from '../../utils/interfaces/interfaces';
import { getUserWordsUrl } from '../../utils/functions/supportMethods';
import axios, { AxiosRequestConfig } from 'axios';
import { getCurrentUserState } from '../../utils/functions/localStorage';

export const DiffToggler = ({wordData}: {wordData: WordData}) => {
  const [isDifficult, setDifficult] = useState<Boolean>(false);

  /*useEffect(() => {
    getDiff();
  }, [isDifficult]);

  const getDiff = () => {
    const user = getCurrentUserState();
    const url = getUserWordsUrl(user, wordData);
    axios({method: 'get', url, headers: {Authorization: `Bearer ${user.token}`}})
      .then((res) => {
        const { data } = res.data;
        setDifficult(data.isDifficult);
      })
      .catch(() => {
        const userWordData: UserWordData = {
          difficulty: OREDERED_DIFF_LIST[wordData.group],
          optional: {
            isLearned: false
          },
        }
        axios({method: 'post', url, headers: {Authorization: `Bearer ${user.token}`}, data: userWordData});
        setDifficult(false);
      });
  }*/

  const toggleDiffWord = async () => {
    const method = isDifficult ? 'delete' : 'post';
    const user = getCurrentUserState();
    const url = getUserWordsUrl(user, wordData);
    const axiosConfig: AxiosRequestConfig = {method, url, headers: {Authorization: `Bearer ${user.token}`}};
    const userWordData: UserWordData = {
      difficulty: OREDERED_DIFF_LIST[wordData.group],
      optional: {
        isLearned: false
      },
    };

    if (!isDifficult) axiosConfig.data = userWordData;

    await axios(axiosConfig);
    setDifficult(!isDifficult);
  }
  
  return (
    <button className={`btn-${isDifficult ? 'danger' : 'success'} rounded d-flex align-items-center`} onClick={toggleDiffWord}>
      <span className='material-icons'>
        {isDifficult ? 'bookmark' : 'bookmark_border'}
      </span>
    </button>
  )
}
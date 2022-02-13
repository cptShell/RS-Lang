import React, { useEffect, useState } from 'react';
import { OREDERED_DIFF_LIST } from '../../utils/constants/constants';
import { UserWordData, WordData } from '../../utils/interfaces/interfaces';
import { getUserWordsUrl } from '../../utils/functions/supportMethods';
import axios, { AxiosRequestConfig } from 'axios';
import { getCurrentUserState } from '../../utils/functions/localStorage';

export const LearnToggler = () => {
  const [isLearned, setLearned] = useState<boolean>(false);

  return (
    <button className='btn-success rounded d-flex align-items-center'>
      <span className='material-icons'>
        {`radio_button_${isLearned ? '' : 'un'}checked`}
      </span>
    </button>
  )
}
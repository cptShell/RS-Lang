import React from "react";
import { MAX_WORDS_PER_PAGE } from '../../utils/constants/constants';

export const PageStatus = ({learnedCount}: {learnedCount: number}) => {
  return (
    <span>
      {
        learnedCount === MAX_WORDS_PER_PAGE ?
          ': все слова изучены!':
          `: изучено ${learnedCount} из ${MAX_WORDS_PER_PAGE} слов`
      }
    </span>
  );
}
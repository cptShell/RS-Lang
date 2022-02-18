import React from "react";
import { MAX_WORDS_PER_PAGE } from '../../utils/constants/constants';

export const PageStatus = ({learnedCount}: {learnedCount: number}) => {
  return (
    <span className="d-flex align-items-center">
      {
        learnedCount === MAX_WORDS_PER_PAGE ?
          'Все слова на этой странице изучены!':
          `Изучено слов на странице ${learnedCount} из ${MAX_WORDS_PER_PAGE}`
      }
    </span>
  );
}
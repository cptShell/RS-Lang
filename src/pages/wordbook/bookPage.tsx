import React, { useEffect, useState } from "react";
import { createWordsUrl } from "../../utils/functions/supportMethods";
import { PageState, WordData } from "../../utils/interfaces/interfaces";
import { Card } from "./word";

export const BookPage = ({pageState}: {pageState: PageState}): JSX.Element | null => {
  const [wordsData, setWordsData] = useState<Array<WordData> | null>(null);
  const {page, group}: PageState = pageState;

  const getData = async () => {
    const url: string = createWordsUrl(page, group);
    const response: Response = await fetch(url, {method: 'GET'});
    const wordsData: Array<WordData> = await response.json();
    setWordsData(wordsData);
  }

  useEffect(() => {
    getData();
  }, [pageState]);

  return (
    <ul className="d-flex flex-column gap-3">
      {wordsData && wordsData.map((wordData) => (
        <Card key={wordData.id} wordData={wordData}/>
      ))}
    </ul>
  );
};

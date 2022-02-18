import React from "react";
import { BASIC_GROUP_AMOUNT, ORDERED_BTN_STYLE_LIST } from '../../utils/constants/constants';
import { PageState } from "../../utils/interfaces/interfaces";

export const GroupList = ({isAuthorized, pageState, setPageState, setMergedDataList}: {
  isAuthorized: boolean,
  pageState: PageState,
  setPageState: (state: PageState) => void,
  setMergedDataList: (mergedDataList: null) => void,
}): JSX.Element => {
  const { group }: PageState = pageState;
  const groupCount = BASIC_GROUP_AMOUNT + Number(isAuthorized);
  const changeGroup = (nextGroup: number) => {
    const nextState = {page: 0, group: nextGroup};
    setPageState(nextState);
    setMergedDataList(null);
  }

  const groupBullets: Array<JSX.Element> = new Array(groupCount).fill(0).map((_, index) => {
    const isActive: string = index !== group ? '' : '-outline';
    const className = `btn btn${isActive}-${ORDERED_BTN_STYLE_LIST[index]}`;
    return (
      <li key={index}>
        <button onClick={() => changeGroup(index)} className={className}>
          {index === BASIC_GROUP_AMOUNT ? 'Сложные слова' : index + 1}
        </button>
      </li>
    );
  });
  return (
    <ul className="btn-group d-flex justify-content-center gap-2">{groupBullets}</ul>
  );
};
import React from "react";
import { BASIC_GROUP_AMOUNT } from '../../utils/constants/constants';
import { PageState } from "../../utils/interfaces/inerface";

export const GroupList = ({pageState, setPageState}: {
  pageState: PageState,
  setPageState: (state: PageState) => void, 
}): JSX.Element => {
  const { group }: PageState = pageState;

  const changeGroup = (nextGroup: number) => {
    const nextState = {page: 0, group: nextGroup};
    setPageState(nextState);
  }

  const groupBullets: Array<JSX.Element> = new Array(BASIC_GROUP_AMOUNT).fill(0).map((_, index) => {
    const className = index === group ? 'btn active' : 'btn';
    return (
      <li key={index}>
        <button onClick={() => changeGroup(index)} className={className}>{index + 1}</button>
      </li>
    );
  });
  return (
    <ul>{groupBullets}</ul>
  );
};
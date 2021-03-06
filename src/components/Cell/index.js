import React, { useContext } from "react";
import clsx from "clsx";
import styles from "./Cell.module.scss";
import { GameDataContext } from "../Game";

import { GrFlagFill as FlagIcon } from "react-icons/gr";
import { BsCircleFill as MineIcon } from "react-icons/bs";

export const states = {
  OPEN: "open",
  CLOSED: "closed",
  FLAGGED: "flagged",
  POPPED: "popped",
};

const evenOrOdd = (value) => {
  return value % 2 === 0 ? "even" : "odd";
};

const Cell = ({ isMine, state, value, row, col, onClick }) => {
  const { gameMode } = useContext(GameDataContext);

  const renderContent = () => {
    const visibleClass = (targetState) => {
      return state !== targetState && styles.invisible;
    };

    return (
      <>
        <span
          className={clsx(styles[`value-${value}`], visibleClass(states.OPEN))}
        >
          {value !== 0 && value}
        </span>
        <span className={clsx(styles.flag, visibleClass(states.FLAGGED))}>
          {<FlagIcon />}
        </span>
        <span className={clsx(styles.mine, visibleClass(states.POPPED))}>
          {<MineIcon />}
        </span>
      </>
    );
  };

  return (
    <div
      className={clsx(
        styles.cell,
        styles[`${evenOrOdd(row)}-${evenOrOdd(col)}`],
        styles[state],
        styles[`gamemode-${gameMode.NAME.toLowerCase()}`]
      )}
      onClick={(e) => onClick(e)(row, col)}
      onContextMenu={(e) => onClick(e)(row, col)}
      onMouseDown={(e) => e.nativeEvent.button === 1 && onClick(e)(row, col)}
    >
      {renderContent()}
    </div>
  );
};

export default Cell;

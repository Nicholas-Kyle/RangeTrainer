import React from "react";
import ACTIONS from "./ACTIONS";
// import "./ActionButtonGroup.css";

const ActionButtonGroup = ({ onAction }) => (
  <div className="actionButtonGroup">
    <button onClick={onAction.bind(null, ACTIONS.LIMP)}>Limp</button>
    <button onClick={onAction.bind(null, ACTIONS.RAISE_FOLD)}>
      Raise Fold
    </button>
    <button onClick={onAction.bind(null, ACTIONS.RAISE_DEFEND)}>
      Raise Defend
    </button>
    <button onClick={onAction.bind(null, ACTIONS.FOLD)}>Fold</button>
  </div>
);

export default ActionButtonGroup;

import React, { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setHistory } from "../../../store/homeSlice";
export const SearchHistory = () => {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.home);
  const [userHistory, setUserHistory] = useState(history);
  const handleRemoveItem = (index) => {
    const new_history = userHistory.filter((data, i) => {
      return i !== index;
    });

    dispatch(setHistory(new_history));
    setUserHistory(new_history);
  };
  return (
    <div>
      {userHistory.map((his, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between ",
            paddingLeft: "17.7%",
            lineHeight: "2em",
            fontWeight: "bold",
            paddingRight: "16.2%",
            backgroundColor: "white",
          }}
        >
          <div
            key={`${his.id}`}
            style={{
              fontSize: "22px",
              backgroundColor: "white",
              display: "flex",
            }}
          >
            {his}
          </div>
          <div
            key={`${index}${his.id}`}
            onClick={() => handleRemoveItem(index)}
          >
            <VscChromeClose />
          </div>
        </div>
      ))}
    </div>
  );
};

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addflightNo, removeflightNo } from "../../redux/flightNo";

const StopsFilter = () => {
  const dispatch = useDispatch();
  const selectedNoOfStops = useSelector((state) => state.flightNo.flightNoArray)
  const stops = [1, 2, 3];

  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(addflightNo(+e.target.value));
    } else {
      dispatch(removeflightNo(+e.target.value));
    }
  }

  return (
    <div className="flex flex-col gap-3 flex-1  min-w-[120px]">
      <h3 className="text-xl">No. of Stops :</h3>
      <div className="flex flex-col gap-1">
        {stops.map((noOfStops, key) => {
          return (
            <div key={key} className="flex gap-3">
              {selectedNoOfStops.includes(noOfStops) === true ? (
                <input type="checkbox" id={noOfStops + "stop"} value={noOfStops} checked={true} onChange={(e) => handleChange(e)} />
              ) : (
                <input type="checkbox" value={noOfStops} id={noOfStops + "stop"} onChange={(e) => handleChange(e)} />
              )}
              {noOfStops >= 3 ? (
                <label htmlFor={noOfStops + "stop"}>2+</label>
              ) : (
                <label htmlFor={noOfStops + "stop"}>{noOfStops}</label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StopsFilter;

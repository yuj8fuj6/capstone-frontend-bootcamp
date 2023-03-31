import React, { useContext } from "react";
import { CircularContext } from "../contexts/CircularContext";

const CircularList = () => {
  const { uraData, bcaData, scdfData } = useContext(CircularContext);

  return (
    <div className="text-darkgreen grid grid-cols-3 gap-8">
      <div className="bg-white rounded-xl h-[750px] drop-shadow-lg p-6">
        <div className="text-left text-xl font-bold">URA</div>
        <div className="grid grid-cols-1 overflow-auto h-[650px] mt-4 gap-4">
          {uraData.map((item) => (
            <div className="grid grid-cols-3 text-left gap-10 text-sm border-1 rounded-xl p-3 bg-white drop-shadow-md hover:bg-lightgreen">
              <div>{item.date}</div>
              <a
                href={`https://${item.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2"
              >
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl h-[750px] drop-shadow-lg p-6">
        <div className="text-left text-xl font-bold">BCA</div>
        <div className="grid grid-cols-1 overflow-auto h-[650px] mt-4 gap-4">
          {bcaData.map((item) => (
            <div className="grid grid-cols-3 text-left gap-5 text-sm border-1 rounded-xl p-3 bg-white drop-shadow-md hover:bg-lightgreen">
              <div>{item.date}</div>
              <a
                href={`${item.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2"
              >
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl h-[750px] drop-shadow-lg p-6">
        <div className="text-left text-xl font-bold">SCDF</div>
        <div className="grid grid-cols-1 overflow-auto h-[650px] mt-4 gap-4">
          {scdfData.map((item) => (
            <div className="grid grid-cols-3 text-left gap-5 text-sm border-1 rounded-xl p-3 bg-white drop-shadow-md hover:bg-lightgreen">
              <div>{item.date}</div>
              <a
                href={`${item.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2"
              >
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircularList;

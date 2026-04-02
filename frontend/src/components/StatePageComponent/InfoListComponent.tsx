import React from "react";
import Info from "./InfoComponent";
import "./StateComponent.css";

interface InfoData {
  name: string;
  location: string;
  description: string;
}

interface InfoListProps {
  infos: InfoData[];
  currentIndex: number;
}

const InfoList = ({ infos, currentIndex }: InfoListProps) => {
  const states = ["previous--info", "current--info", "next--info"];
  return (
    <div className="infoList">
      <div className="info__wrapper">
        {infos.map((info, index) => (
          <Info
            current_state={states[index]}
            key={index}
            name={info.name}
            location={info.location}
            description={info.description}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoList;

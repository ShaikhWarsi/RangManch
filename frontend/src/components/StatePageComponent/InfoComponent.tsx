import React from 'react';
import './StateComponent.css';

interface InfoProps {
  name: string;
  location: string;
  description: string;
  current_state: string;
}

const Info = ({ name, location, description, current_state }: InfoProps) => {
    return (
        <div className={"info " + current_state}>
            <h1 className="text name">{name}</h1>
            <h4 className="text location">{location}</h4>
            <p className="text description">{description}</p>
        </div>
    );
}

export default Info;

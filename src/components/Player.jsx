import { useState } from "react";

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    setIsEditing(prev=> !prev);

    if(isEditing){
      onChangeName(symbol, name)
    }
  };

  const handleChangingName = (e) => {
    setName(e.target.value);
  };

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            defaultValue={name}
            required
            onChange={handleChangingName}
          />
        ) : (
          <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleToggle}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;

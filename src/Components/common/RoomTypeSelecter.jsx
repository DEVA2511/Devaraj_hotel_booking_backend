import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunction";

export const RoomTypeSelecter = ({ handleRoomInputChange, newRoom }) => {
  // this componet is used for select the room type using the dropdown.
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  // uset he useEffort
  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  // handdle the new changes function
  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };
  // handle room type function
  const handleAddNewRoomType = (e) => {
    console.log(e.target.value);
    if (newRoomType !== " ") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType(" ");
      setShowNewRoomTypeInput(false);
    }
  };
  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            id="roomType"
            name="roomType"
            className="form-control"
            value={newRoom.roomTypes}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
          >
            <option value={""}>Select a room type</option>
            <option value={"Add New"}>Add new</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter a new Room type"
                onChange={handleNewRoomTypeInputChange}
              />
              <button
                className="btn btn-hotel"
                type="button"
                onClick={handleAddNewRoomType}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

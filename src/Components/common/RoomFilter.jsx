import React, { useState } from "react";

// this componet created for apply the filete method
export const RoomFilter = ({ data, setFilteredData }) => {
  // the data have the all datas ffrom data base
  const [filter, setFilter] = useState("");
  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);
    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    );
    setFilteredData(filteredRooms);
  };

  // clear the filter
  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  // get the unique room types
  const roomType = data
    ? ["", ...new Set(data.map((room) => room.roomType))]
    : [];
  return (
    <div className="input-group mb-3">
      <span className="input-group-text " id="room-type-filter">
        Filter Rooms by Type
      </span>

      <select
        className="form-select"
        aria-label="Default select example"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value={""}>Select a room type to filter...</option>
        {roomType.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        Click Filter
      </button>
    </div>
  );
};

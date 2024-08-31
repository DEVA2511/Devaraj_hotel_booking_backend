import React, { useEffect, useState } from "react";
import { RoomFilter } from "../common/RoomFilter";
import { RoomPaginator } from "../common/RoomPaginator";
import { Col } from "react-bootstrap";
import { getAllRooms } from "../utils/ApiFunction";

// check the room is alrady bookrd or not?
export const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  // in this sate managment is no need to want the function because this state hold the default value.
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([""]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // create the useEffect for get the data
  useEffect(() => {
    fetchRooms();
  }, []);

  // function for get the all room from DB
  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result.data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  // this is for check the selected room type method
  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);
  // handle the pagination btn click event
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // here the we calaculate the pagegination page calacuter
  const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms =
      filteredRooms.length > 0
        ? filteredRooms.length
        : rooms
        ? rooms.length
        : 0;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfLastRoom, indexOfFirstRoom);
  return (
    <>
      {isLoading ? (
        <p>Loding exiting rooms</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-center mb-3 mt-5 ">
              <h2>Existing Rooms</h2>
            </div>
            <Col md={6} className="mb-3 mb-md-0">
              {/* here we pass the data to the room filter component data and setFilterdata */}
              <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
            </Col>
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th className="">ID</th>
                  <th className="">Room Type</th>
                  <th className="">Room Price</th>
                  <th className="">Actions</th>
                </tr>
              </thead>
              {/* this is for table body coneted what we can display in table formate this will display */}
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className="text-center">
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}</td>
                    <td>
                      <button>View / Edit</button>
                      <button>Delete</button>
                      {/* <button></button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* here the pagination control , also pass the props */}
            <RoomPaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(
                filteredRooms,
                roomsPerPage,
                rooms
              )}
              onPageChange={handlePaginationClick}
            />
          </section>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      )}
    </>
  );
};

// here create the all api
import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// this function is crteated for add the room in database using the api
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  // heere we create the room api with room creating
  const reponse = await api.post("/rooms/add/new-room", formData);
  if (reponse.status == 201) {
    return true;
    // console.log("room added");
  } else {
    return false;
  }
}
// this function for created for get all room types from data base useing api
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types ");
  }
}
// this function is get all rooms from the database

export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all-rooms");
    return result.data;
  } catch (error) {
    throw new Error("Error fetching rooms.");
  }
}

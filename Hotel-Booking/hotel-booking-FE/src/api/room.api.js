import http from "../utils/http";
export const roomApi = {
  createRoom(data) {
    return http.post("/hotels/{hotelId}/create-room", data);
  },
  getRoomByHotelId(config) {
    // return http.get("/hotel/room/searchAll", config);
    return http.get("/hotels/{hotelId}/rooms", config);
    
  },
  searchRoomById(config) {
    return http.get("/hotel/room/search", config);
  },
  deleteRoomById(id) {
    // return http.delete(`/hotel/room/${id}`);
    return http.delete(`/hotels/{hotelId}/delete-room/{roomId}`);

  },
  updateRoomById(data) {
    // return http.put(`/hotel/room`, data);
    return http.put(`/hotels/{hotelId}/update-room/{roomId}`, data);

  },
};

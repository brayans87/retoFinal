package com.mitocode.sistemaReservas.service;

import com.mitocode.sistemaReservas.dto.RoomDTO;
import com.mitocode.sistemaReservas.model.Room;

import java.util.List;

public interface IRoomService extends ICRUD<Room, Integer> {

   RoomDTO update (RoomDTO room, Integer id) throws Exception;

    List<Room>getRoomAvailable() throws Exception;
}

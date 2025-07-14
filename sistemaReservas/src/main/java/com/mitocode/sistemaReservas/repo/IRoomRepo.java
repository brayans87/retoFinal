package com.mitocode.sistemaReservas.repo;

import com.mitocode.sistemaReservas.model.Room;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface IRoomRepo extends IGenericRepo<Room, Integer> {

    @Query(" from Room r where r.available = true ")
    List<Room> findRoomAvailable();

}

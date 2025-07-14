package com.mitocode.sistemaReservas.service.impl;

import com.mitocode.sistemaReservas.dto.RoomDTO;
import com.mitocode.sistemaReservas.model.Room;
import com.mitocode.sistemaReservas.repo.IRoomRepo;
import com.mitocode.sistemaReservas.service.IRoomService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements IRoomService {

    private final IRoomRepo roomRepo;

    @Override
    public List<Room> findAll() throws Exception {
        return this.roomRepo.findAll();
    }

    @Override
    public Room findById(Integer integer) throws Exception {
        return this.roomRepo.findById(integer).orElseThrow();
    }


    @Override
    public Room save(Room room) throws Exception {
        return this.roomRepo.save(room);
    }

    @Override
    public void delete(Integer integer) throws Exception {
        this.roomRepo.deleteById(integer);
    }

    @Override
    public Page<Room> listPage(Pageable pageable) {
        return this.roomRepo.findAll(pageable);
    }

    @Override
    public RoomDTO update(RoomDTO roomDto, Integer id) throws Exception {

        var roomUpdate = this.roomRepo.findById(id).orElseThrow();
        roomUpdate.setAvailable(roomDto.isAvailable());
        var roomPersisted = this.roomRepo.save(roomUpdate);
        return this.entityToDto(roomPersisted);

    }

    @Override
    public List<Room> getRoomAvailable() throws Exception {
        return this.roomRepo.findRoomAvailable();
    }

    public RoomDTO entityToDto(Room room) {

        RoomDTO roomDto = new RoomDTO();
        BeanUtils.copyProperties(room, roomDto);
        return roomDto;

    }


    public Room dtoToEntity(RoomDTO roomDTO){

        Room room = new Room();

        BeanUtils.copyProperties(roomDTO, room);

        return room;

    }

}

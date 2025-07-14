package com.mitocode.sistemaReservas.controller;

import com.mitocode.sistemaReservas.dto.RoomDTO;
import com.mitocode.sistemaReservas.model.Room;
import com.mitocode.sistemaReservas.service.ICRUD;
import com.mitocode.sistemaReservas.service.IRoomService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "rooms")
@AllArgsConstructor
public class RoomController extends GenericController<Room, Integer> {

    private final IRoomService roomService;

    @Override
    protected ICRUD<Room, Integer> getServiceInterface() {
        return roomService;
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<RoomDTO> updateRoom(@PathVariable Integer id, @RequestBody RoomDTO roomDto) throws Exception {

        roomDto.setId(id);
        var obj = this.roomService.update(roomDto, id);
        return ResponseEntity.ok(obj);
    }

    @GetMapping(path = "/roomAvailable")
    public ResponseEntity<List<Room>> roomAvailable() throws Exception{

        return ResponseEntity.ok(this.roomService.getRoomAvailable());
    }



}

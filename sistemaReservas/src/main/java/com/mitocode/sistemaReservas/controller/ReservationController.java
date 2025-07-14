package com.mitocode.sistemaReservas.controller;

import com.mitocode.sistemaReservas.model.Reservation;
import com.mitocode.sistemaReservas.service.ICRUD;
import com.mitocode.sistemaReservas.service.IReservationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "reservations")
@AllArgsConstructor
public class ReservationController extends GenericController<Reservation, Integer> {

    private final IReservationService reservationService;

    @Override
    protected ICRUD<Reservation, Integer> getServiceInterface() {
        return reservationService;
    }





}

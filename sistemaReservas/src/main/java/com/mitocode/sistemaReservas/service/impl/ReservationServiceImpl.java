package com.mitocode.sistemaReservas.service.impl;

import com.mitocode.sistemaReservas.exception.OutDateInvalidaException;
import com.mitocode.sistemaReservas.exception.ReservationDateNotAvailable;
import com.mitocode.sistemaReservas.exception.RoomNotAvailableException;
import com.mitocode.sistemaReservas.model.Reservation;
import com.mitocode.sistemaReservas.repo.IReservationRepo;
import com.mitocode.sistemaReservas.repo.IRoomRepo;
import com.mitocode.sistemaReservas.service.IReservationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements IReservationService {

    private final IReservationRepo reservationRepo;
    private final IRoomRepo roomRepo;

    @Override
    public List<Reservation> findAll() {
        return this.reservationRepo.findAll();
    }

    @Override
    public Reservation findById(Integer id) throws Exception {
        return this.reservationRepo.findById(id).orElseThrow();
    }

    @Override
    public Reservation save(Reservation reservation) {

        var room = this.roomRepo.findById(reservation.getRoom().getId()).orElseThrow();

        if (!Boolean.TRUE.equals(room.isAvailable())){
            throw new RoomNotAvailableException(room.getNumber());
        }

        validationLocalDate(reservation.getCheckInDate(), reservation.getCheckOutDate());

        var reservationPersisted = this.reservationRepo.save(reservation);

         room.setAvailable(Boolean.FALSE);
         this.roomRepo.save(room);

        return reservationPersisted;
    }

    @Override
    public void delete(Integer integer) throws Exception {

        var reservation = this.reservationRepo.findById(integer).orElseThrow();
        var room = this.roomRepo.findById(reservation.getRoom().getId()).orElseThrow();

        room.setAvailable(Boolean.TRUE);
        this.roomRepo.save(room);

        this.reservationRepo.deleteById(integer);
    }

    @Override
    public Page<Reservation> listPage(Pageable pageable) {
        return this.reservationRepo.findAll(pageable);
    }


    private void validationLocalDate(LocalDate checkInDate, LocalDate checkOutDate) {

        if( !Boolean.FALSE.equals(this.reservationRepo.existReservationInDate(checkInDate, checkOutDate))){
            throw  new ReservationDateNotAvailable("reservation date not available");
        }

        if (!checkInDate.isBefore(checkOutDate)) {
            throw new OutDateInvalidaException("La fecha de salida debe ser mayor a la fecha de entrada.");
        }

    }


}

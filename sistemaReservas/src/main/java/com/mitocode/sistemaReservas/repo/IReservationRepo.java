package com.mitocode.sistemaReservas.repo;

import com.mitocode.sistemaReservas.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;


public interface IReservationRepo extends IGenericRepo<Reservation, Integer> {

    @Query("select count(r) > 0  from Reservation r where r.checkInDate =:inDate or r.checkOutDate =:outDate")
    boolean existReservationInDate ( @Param("inDate")  LocalDate inDate, @Param("outDate") LocalDate outDate);




}

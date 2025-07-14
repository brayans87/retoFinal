package com.mitocode.sistemaReservas;

import com.mitocode.sistemaReservas.model.Reservation;
import com.mitocode.sistemaReservas.repo.IReservationRepo;
import com.mitocode.sistemaReservas.repo.IRoomRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;

@SpringBootApplication
@AllArgsConstructor
@Slf4j
public class SistemaReservasApplication implements CommandLineRunner {


	private final IRoomRepo roomRepo;
	private final IReservationRepo reservationRepo;

	public static void main(String[] args) {
		SpringApplication.run(SistemaReservasApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {

	 //log.info(String.valueOf(this.reservationRepo.findById(14).orElseThrow().getCustomerName()));



	}
}

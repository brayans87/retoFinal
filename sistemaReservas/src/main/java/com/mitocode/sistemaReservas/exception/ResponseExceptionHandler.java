package com.mitocode.sistemaReservas.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.net.URI;

@RestControllerAdvice
public class ResponseExceptionHandler {

    @ExceptionHandler(RoomNotAvailableException.class)
    public ProblemDetail handleRoomNotAvailableException(RoomNotAvailableException e, WebRequest request) {

        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
        pd.setTitle("Room Not Available");
        pd.setType(URI.create(request.getDescription(false)));

        return pd;

    }

    @ExceptionHandler(ReservationDateNotAvailable.class)
    public ProblemDetail handleReservationDateNotAvailableException(ReservationDateNotAvailable e, WebRequest request) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
        pd.setTitle("Reservation Date Not Available");
        pd.setType(URI.create(request.getDescription(false)));
        return pd;
    }

    @ExceptionHandler(OutDateInvalidaException.class)
    public ProblemDetail handleOutDateInvalidaException(OutDateInvalidaException e, WebRequest request) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
        pd.setTitle("Out Date Invalida");
        pd.setType(URI.create(request.getDescription(false)));
        return pd;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleMethodArgumentNotValidException(MethodArgumentNotValidException e, WebRequest request) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
        pd.setTitle("Method Argument Not Valid");
        pd.setType(URI.create(request.getDescription(false)));
        return pd;

    }









}

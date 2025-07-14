package com.mitocode.sistemaReservas.exception;

public class RoomNotAvailableException extends RuntimeException {

    private static final String ERROR_MESSAGE = "Room not available number %s";

    public RoomNotAvailableException(String numberRoom) {
        super(String.format(ERROR_MESSAGE, numberRoom)  );

    }

}

package com.mitocode.sistemaReservas.service;

import com.mitocode.sistemaReservas.model.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICRUD<T, ID> {

    List<T> findAll() throws Exception;

    T findById(ID id) throws Exception;

    T save(T t) throws Exception;

    void delete(ID id) throws Exception;

    Page<T> listPage(Pageable pageable);

}

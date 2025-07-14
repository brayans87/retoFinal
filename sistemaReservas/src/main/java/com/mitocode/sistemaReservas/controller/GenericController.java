package com.mitocode.sistemaReservas.controller;

import com.mitocode.sistemaReservas.model.Room;
import com.mitocode.sistemaReservas.service.ICRUD;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

public abstract class GenericController<T, ID> {

    protected abstract ICRUD<T, ID> getServiceInterface();

    @GetMapping
    public ResponseEntity<List<T>> getAll() throws Exception {

        List<T> obj = this.getServiceInterface().findAll();
        return ResponseEntity.ok(obj);

    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<T> getById(@PathVariable ID id) throws Exception {
        return ResponseEntity.ok(this.getServiceInterface().findById(id));
    }

    @PostMapping()
    public ResponseEntity<T> save(@Valid @RequestBody T t) throws Exception {

        T obj = this.getServiceInterface().save(t);

        return ResponseEntity.ok(obj);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable ID id) throws Exception {

        this.getServiceInterface().delete(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping(path = "/pageable")
    public ResponseEntity<Page<T>> listPageable(Pageable pageable) {

        Page<T> page = this.getServiceInterface().listPage(pageable);
        return ResponseEntity.ok(page);
    }

}

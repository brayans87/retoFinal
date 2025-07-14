package com.mitocode.sistemaReservas.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
public class Room implements Serializable {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Integer id;

     @NotNull
     @Column(unique = true)
     private String number;

     @NotNull
     @Size(min = 3, max = 70)
     private String type;

     @NotNull
     private BigDecimal price;

     @NotNull
     private boolean available;



}

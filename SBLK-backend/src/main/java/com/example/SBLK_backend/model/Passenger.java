package com.example.SBLK_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "passengers")
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String mobileNumber;
    private String email;

    private String addressLine1;
    private String addressLine2;

    private String dateOfBirth;
    private String gender;
    private String district;
    private String city;

    @Column(unique = true)
    private String username;

    private String password;
}

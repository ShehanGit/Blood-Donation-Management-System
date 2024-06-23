package com.blood_donation_system.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hospitals")
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hospitalId;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "contact_info")
    private String contactInfo;

    @OneToMany(mappedBy = "medicalCenter")
    private List<Recipient> recipients;
}

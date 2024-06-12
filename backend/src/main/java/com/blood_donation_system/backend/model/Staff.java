package com.blood_donation_system.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "staff")
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long staffId;

    @Column(name = "name")
    private String name;

    @Column(name = "role")
    private String role;

    @Column(name = "contact_number")
    private String contactNumber;

    @ManyToOne  // Establishing Many-To-One relationship with Hospital
    @JoinColumn(name = "assigned_location_id", nullable = false)  // Foreign Key from Hospitals
    private Hospital assignedLocation;
}
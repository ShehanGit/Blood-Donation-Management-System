package com.blood_donation_system.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;  // Import Date for handling date fields

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "blood_inventory")
public class BloodInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventoryId;

    @Column(name = "blood_type")
    private String bloodType;

    @Column(name = "quantity_available")
    private Integer quantityAvailable;

    @Column(name = "expiration_date")
    @Temporal(TemporalType.DATE)  // Ensuring only the date is stored
    private Date expirationDate;

    @Column(name = "status")
    private String status;
}
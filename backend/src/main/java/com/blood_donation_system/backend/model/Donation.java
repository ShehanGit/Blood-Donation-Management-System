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
@Table(name = "donations")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationId;

    @ManyToOne  // Establishing Many-To-One relationship with Donor
    @JoinColumn(name = "donor_id", nullable = false)  // Donor_ID as a foreign key
    private Donor donor;

    @Column(name = "date_of_donation")
    @Temporal(TemporalType.DATE)
    private Date dateOfDonation;

    @Column(name = "location")
    private String location;

    @Column(name = "volume_donated")
    private Double volumeDonated;

    @Column(name = "blood_type")
    private String bloodType;

    @Column(name = "status")
    private String status;
}
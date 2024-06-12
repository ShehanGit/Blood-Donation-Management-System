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
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    @ManyToOne  // Establishing Many-To-One relationship with Donor
    @JoinColumn(name = "donor_id", nullable = false)  // Donor_ID as a foreign key
    private Donor donor;

    @Column(name = "scheduled_date")
    @Temporal(TemporalType.TIMESTAMP)  // Adjusted to handle both date and time
    private Date scheduledDate;

    @Column(name = "location")
    private String location;

    @Column(name = "appointment_status")
    private String appointmentStatus;
}
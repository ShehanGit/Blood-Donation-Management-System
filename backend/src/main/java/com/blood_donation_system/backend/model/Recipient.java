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
@Table(name = "recipients")
public class Recipient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipientId;

    @Column(name = "name")
    private String name;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(name = "blood_type_needed")
    private String bloodTypeNeeded;

    @Column(name = "urgency_level")
    private String urgencyLevel;

    @Column(name = "receiving_date")
    @Temporal(TemporalType.DATE)  // Ensuring only the date is stored
    private Date receivingDate;
}

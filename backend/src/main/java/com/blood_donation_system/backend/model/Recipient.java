package com.blood_donation_system.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

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

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "contact_number", nullable = false)
    private String contactNumber;

    @Column(name = "blood_type_needed", nullable = false)
    private String bloodTypeNeeded;

    @Column(name = "required_blood_volume", nullable = false)
    private Double requiredBloodVolume;

    @Column(name = "urgency_level", nullable = false)
    private String urgencyLevel;

    @Column(name = "receiving_date")
    @Temporal(TemporalType.DATE)
    private Date receivingDate;

    @ManyToOne
    @JoinColumn(name = "hospital_id", nullable = false)
    @JsonBackReference
    private Hospital hospital;
}

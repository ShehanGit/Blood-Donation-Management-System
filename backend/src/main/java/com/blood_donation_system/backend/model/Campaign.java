package com.blood_donation_system.backend.model;

import jakarta.persistence.*;
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
@Table(name = "campaigns")
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long campaignId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "start_date")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column(name = "location")
    private String location;

    @Column(name = "organizer")
    private String organizer;

    @Column(name = "total_donations")
    private Integer totalDonations;

    @Column(name = "status")
    private String status;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

//    Upcoming: The campaign is planned and will take place in the future.
//    Ongoing: The campaign is currently in progress.
//    Completed: The campaign has finished.
//    Cancelled: The campaign was planned but has been cancelled.
//    Postponed: The campaign has been delayed to a later date.
//    Suspended: The campaign is temporarily halted but may resume later.

}

package com.blood_donation_system.backend.repsitory;

import com.blood_donation_system.backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT COUNT(a) FROM Appointment a WHERE DATE(a.scheduledDate) = :date")
    long countByScheduledDate(@Param("date") LocalDate date);

    @Query("SELECT COUNT(a) FROM Appointment a WHERE DATE(a.scheduledDate) BETWEEN :startDate AND :endDate")
    long countByScheduledDateBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}

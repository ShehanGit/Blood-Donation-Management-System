package com.blood_donation_system.backend.repsitory;

import com.blood_donation_system.backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}

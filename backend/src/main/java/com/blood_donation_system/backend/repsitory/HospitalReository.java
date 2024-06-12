package com.blood_donation_system.backend.repsitory;

import com.blood_donation_system.backend.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalReository extends JpaRepository<Hospital, Long> {
}

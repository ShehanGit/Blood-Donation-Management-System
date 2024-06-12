package com.blood_donation_system.backend.repsitory;

import com.blood_donation_system.backend.model.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonorRepository extends JpaRepository<Donor, Long> {
}

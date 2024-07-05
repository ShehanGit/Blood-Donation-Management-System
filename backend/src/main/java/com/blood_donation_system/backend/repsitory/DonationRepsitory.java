package com.blood_donation_system.backend.repsitory;

import com.blood_donation_system.backend.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepsitory extends JpaRepository<Donation, Long> {
}

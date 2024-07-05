package com.blood_donation_system.backend.repsitory;

import com.blood_donation_system.backend.model.Recipient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipientRepository extends JpaRepository<Recipient, Long> {
}

package com.blood_donation_system.backend.repsitory;

import com.blood_donation_system.backend.model.BloodInventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BloodInventoryReposrtory extends JpaRepository<BloodInventory, Long> {
}

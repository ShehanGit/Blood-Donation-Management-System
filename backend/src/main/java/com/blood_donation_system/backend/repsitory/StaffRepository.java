package com.blood_donation_system.backend.repsitory;

import com.blood_donation_system.backend.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Long> {

}

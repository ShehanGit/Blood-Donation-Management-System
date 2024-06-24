package com.blood_donation_system.backend.repsitory;

        import com.blood_donation_system.backend.model.BloodInventory;
        import com.blood_donation_system.backend.model.Campaign;
        import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}

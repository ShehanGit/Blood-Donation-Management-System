package com.blood_donation_system.backend.controller;

import com.blood_donation_system.backend.model.Campaign;
import com.blood_donation_system.backend.repsitory.CampaignRepository;
import com.blood_donation_system.backend.exception.ResourseNotFoundExeption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/campaigns")
public class CampaignController {

    @Autowired
    private CampaignRepository campaignRepository;

    // Get all campaigns
    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    // Create a new campaign
    @PostMapping
    public Campaign createCampaign(@RequestBody Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    // Get a campaign by ID
    @GetMapping("{id}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable Long id) {
        Campaign campaign = campaignRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Campaign not found with id: " + id)
        );
        return ResponseEntity.ok(campaign);
    }

    // Update campaign details
    @PutMapping("{id}")
    public ResponseEntity<Campaign> updateCampaign(@PathVariable Long id, @RequestBody Campaign campaignDetails) {
        Campaign campaign = campaignRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Campaign not found with id: " + id)
        );

        campaign.setName(campaignDetails.getName());
        campaign.setDescription(campaignDetails.getDescription());
        campaign.setStartDate(campaignDetails.getStartDate());
        campaign.setEndDate(campaignDetails.getEndDate());
        campaign.setLocation(campaignDetails.getLocation());
        campaign.setOrganizer(campaignDetails.getOrganizer());
        campaign.setTotalDonations(campaignDetails.getTotalDonations());
        campaign.setStatus(campaignDetails.getStatus());
        campaign.setLatitude(campaignDetails.getLatitude());
        campaign.setLongitude(campaignDetails.getLongitude());

        Campaign updatedCampaign = campaignRepository.save(campaign);
        return ResponseEntity.ok(updatedCampaign);
    }

    // Delete a campaign
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteCampaign(@PathVariable Long id) {
        Campaign campaign = campaignRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Campaign not found with id: " + id)
        );
        campaignRepository.delete(campaign);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package com.blood_donation_system.backend.controller;

import com.blood_donation_system.backend.model.Donation;
import com.blood_donation_system.backend.repsitory.DonationRepsitory;
import com.blood_donation_system.backend.exception.ResourseNotFoundExeption;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/donations")
public class DonationController {

    @Autowired
    private DonationRepsitory donationRepository;

    // Get all donations
    @GetMapping
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    // Create a new donation
    @PostMapping
    public Donation createDonation(@RequestBody Donation donation) {
        return donationRepository.save(donation);
    }

    // Get a donation by ID
    @GetMapping("{id}")
    public ResponseEntity<Donation> getDonationById(@PathVariable Long id) {
        Donation donation = donationRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Donation not found with id: " + id)
        );
        return ResponseEntity.ok(donation);
    }

    // Update donation details
    @PutMapping("{id}")
    public ResponseEntity<Donation> updateDonation(@PathVariable Long id, @RequestBody Donation donationDetails) {
        Donation updatedDonation = donationRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Donation not exist with id: " + id)
        );

        updatedDonation.setDonor(donationDetails.getDonor());
        updatedDonation.setDateOfDonation(donationDetails.getDateOfDonation());
        updatedDonation.setLocation(donationDetails.getLocation());
        updatedDonation.setVolumeDonated(donationDetails.getVolumeDonated());
        updatedDonation.setBloodType(donationDetails.getBloodType());
        updatedDonation.setStatus(donationDetails.getStatus());

        donationRepository.save(updatedDonation);
        return ResponseEntity.ok(updatedDonation);
    }

    // Delete a donation
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteDonation(@PathVariable Long id) {
        Donation donation = donationRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Donation not exist with id: " + id)
        );
        donationRepository.delete(donation);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

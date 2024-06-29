package com.blood_donation_system.backend.controller;

import com.blood_donation_system.backend.Email.EmailService;
import com.blood_donation_system.backend.exception.ResourseNotFoundExeption;
import com.blood_donation_system.backend.model.Donation;
import com.blood_donation_system.backend.model.Recipient;
import com.blood_donation_system.backend.repsitory.DonationRepsitory;
import com.blood_donation_system.backend.repsitory.RecipientRepository;

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

    @Autowired
    private RecipientRepository recipientRepository;

    @Autowired
    private EmailService emailService;

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

    // Send recipient details to donor email
    @GetMapping("/notifyDonor")
    public ResponseEntity<String> sendRecipientDetailsToDonor(@RequestParam Long recipientId, @RequestParam Long donationId) {
        Donation donation = donationRepository.findById(donationId).orElseThrow(
                () -> new ResourseNotFoundExeption("Donation not found with id: " + donationId)
        );

        Recipient recipient = recipientRepository.findById(recipientId).orElseThrow(
                () -> new ResourseNotFoundExeption("Recipient not found with id: " + recipientId)
        );

        String donorEmail = donation.getDonor().getEmail();
        String subject = "Details of the Recipient for Your Donation";
        String text = "Dear " + donation.getDonor().getName() + ",\n\n" +
                "Thank you for your generous donation. Here are the details of the recipient:\n\n" +
                "Name: " + recipient.getName() + "\n" +
                "Blood Type Needed: " + recipient.getBloodTypeNeeded() + "\n" +
                "Urgency Level: " + recipient.getUrgencyLevel() + "\n\n" +
                "Thank you for your support.\n\n" +
                "Best regards,\n" +
                "Blood Donation Management System";

        emailService.sendSimpleEmail(donorEmail, subject, text);

        return ResponseEntity.ok("Email sent successfully to donor with ID: " + donation.getDonor().getDonorId());
    }
}

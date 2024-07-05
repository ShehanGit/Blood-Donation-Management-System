package com.blood_donation_system.backend.controller;

import com.blood_donation_system.backend.model.Donor;
import com.blood_donation_system.backend.repsitory.DonorRepository;
import com.blood_donation_system.backend.exception.ResourseNotFoundExeption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/donors")
public class DonorController {

    @Autowired
    private DonorRepository donorRepository;

    // Retrieve all donors
    @GetMapping
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    // Create a new donor
    @PostMapping
    public Donor createDonor(@RequestBody Donor donor) {
        return donorRepository.save(donor);
    }

    // Get a donor by ID
    @GetMapping("{id}")
    public ResponseEntity<Donor> getDonorById(@PathVariable Long id) {
        Donor donor = donorRepository.findById(id).orElseThrow(() -> new ResourseNotFoundExeption("Donor not exist with id: " + id));
        return ResponseEntity.ok(donor);
    }

    // Update donor details
    @PutMapping("{id}")
    public ResponseEntity<Donor> updateDonor(@PathVariable Long id, @RequestBody Donor donorDetails) {
        Donor updateDonor = donorRepository.findById(id).orElseThrow(() -> new ResourseNotFoundExeption("Donor not exist with id: " + id));

        updateDonor.setName(donorDetails.getName());
        updateDonor.setContactNumber(donorDetails.getContactNumber());
        updateDonor.setEmail(donorDetails.getEmail());
        updateDonor.setAddress(donorDetails.getAddress());
        updateDonor.setDateOfBirth(donorDetails.getDateOfBirth());
        updateDonor.setBloodType(donorDetails.getBloodType());
        updateDonor.setGender(donorDetails.getGender());
        updateDonor.setLastDonationDate(donorDetails.getLastDonationDate());

        donorRepository.save(updateDonor);

        return ResponseEntity.ok(updateDonor);
    }

    // Delete a donor
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteDonor(@PathVariable Long id) {
        Donor donor = donorRepository.findById(id).orElseThrow(() -> new ResourseNotFoundExeption("Donor not exist with id: " + id));
        donorRepository.delete(donor);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

package com.blood_donation_system.backend.controller;

import com.blood_donation_system.backend.model.Hospital;
import com.blood_donation_system.backend.repsitory.HospitalReository;
import com.blood_donation_system.backend.exception.ResourseNotFoundExeption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/hospitals")
public class HospitalController {

    @Autowired
    private HospitalReository hospitalRepository;

    // Get all hospitals
    @GetMapping
    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    // Create a new hospital
    @PostMapping
    public Hospital createHospital(@RequestBody Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    // Get a hospital by ID
    @GetMapping("{id}")
    public ResponseEntity<Hospital> getHospitalById(@PathVariable Long id) {
        Hospital hospital = hospitalRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Hospital not found with id: " + id)
        );
        return ResponseEntity.ok(hospital);
    }

    // Update hospital details
    @PutMapping("{id}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable Long id, @RequestBody Hospital hospitalDetails) {
        Hospital updatedHospital = hospitalRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Hospital not exist with id: " + id)
        );

        updatedHospital.setName(hospitalDetails.getName());
        updatedHospital.setAddress(hospitalDetails.getAddress());
        updatedHospital.setContactInfo(hospitalDetails.getContactInfo());

        hospitalRepository.save(updatedHospital);
        return ResponseEntity.ok(updatedHospital);
    }

    // Delete a hospital
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteHospital(@PathVariable Long id) {
        Hospital hospital = hospitalRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Hospital not exist with id: " + id)
        );
        hospitalRepository.delete(hospital);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

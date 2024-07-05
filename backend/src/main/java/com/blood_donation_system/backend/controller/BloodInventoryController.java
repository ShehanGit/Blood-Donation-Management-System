package com.blood_donation_system.backend.controller;

import com.blood_donation_system.backend.model.BloodInventory;
import com.blood_donation_system.backend.repsitory.BloodInventoryReposrtory;
import com.blood_donation_system.backend.exception.ResourseNotFoundExeption;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/blood_inventory")
public class BloodInventoryController {

    @Autowired
    private BloodInventoryReposrtory bloodInventoryRepository;

    // Get all blood inventory entries
    @GetMapping
    public List<BloodInventory> getAllBloodInventory() {
        return bloodInventoryRepository.findAll();
    }

    // Create a new blood inventory entry
    @PostMapping
    public BloodInventory createBloodInventory(@RequestBody BloodInventory bloodInventory) {
        return bloodInventoryRepository.save(bloodInventory);
    }

    // Get a blood inventory entry by ID
    @GetMapping("{id}")
    public ResponseEntity<BloodInventory> getBloodInventoryById(@PathVariable Long id) {
        BloodInventory bloodInventory = bloodInventoryRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Blood inventory not found with id: " + id)
        );
        return ResponseEntity.ok(bloodInventory);
    }

    // Update a blood inventory entry
    @PutMapping("{id}")
    public ResponseEntity<BloodInventory> updateBloodInventory(@PathVariable Long id, @RequestBody BloodInventory bloodInventoryDetails) {
        BloodInventory updatedBloodInventory = bloodInventoryRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Blood inventory not exist with id: " + id)
        );

        updatedBloodInventory.setBloodType(bloodInventoryDetails.getBloodType());
        updatedBloodInventory.setQuantityAvailable(bloodInventoryDetails.getQuantityAvailable());
        updatedBloodInventory.setExpirationDate(bloodInventoryDetails.getExpirationDate());
        updatedBloodInventory.setStatus(bloodInventoryDetails.getStatus());

        bloodInventoryRepository.save(updatedBloodInventory);
        return ResponseEntity.ok(updatedBloodInventory);
    }

    // Delete a blood inventory entry
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteBloodInventory(@PathVariable Long id) {
        BloodInventory bloodInventory = bloodInventoryRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Blood inventory not exist with id: " + id)
        );
        bloodInventoryRepository.delete(bloodInventory);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

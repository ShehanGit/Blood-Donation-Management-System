package com.blood_donation_system.backend.controller;

import com.blood_donation_system.backend.exception.ResourseNotFoundExeption;
import com.blood_donation_system.backend.model.Recipient;
import com.blood_donation_system.backend.repsitory.RecipientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/recipients")
public class RecipientController {

    @Autowired
    private RecipientRepository recipientRepository;

    // Get all recipients
    @GetMapping
    public List<Recipient> getAllRecipients() {
        return recipientRepository.findAll();
    }

    // Create a new recipient
    @PostMapping
    public Recipient createRecipient(@RequestBody Recipient recipient) {
        return recipientRepository.save(recipient);
    }

    // Get a recipient by ID
    @GetMapping("{id}")
    public ResponseEntity<Recipient> getRecipientById(@PathVariable Long id) {
        Recipient recipient = recipientRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Recipient not found with id: " + id)
        );
        return ResponseEntity.ok(recipient);
    }

    // Update recipient details
    @PutMapping("{id}")
    public ResponseEntity<Recipient> updateRecipient(@PathVariable Long id, @RequestBody Recipient recipientDetails) {
        Recipient updatedRecipient = recipientRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Recipient not exist with id: " + id)
        );

        updatedRecipient.setName(recipientDetails.getName());
        updatedRecipient.setContactNumber(recipientDetails.getContactNumber());
        updatedRecipient.setBloodTypeNeeded(recipientDetails.getBloodTypeNeeded());
        updatedRecipient.setUrgencyLevel(recipientDetails.getUrgencyLevel());
        updatedRecipient.setReceivingDate(recipientDetails.getReceivingDate());
        updatedRecipient.setRequiredBloodVolume(recipientDetails.getRequiredBloodVolume());
        

        
        recipientRepository.save(updatedRecipient);
        return ResponseEntity.ok(updatedRecipient);
    }

    // Delete a recipient
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteRecipient(@PathVariable Long id) {
        Recipient recipient = recipientRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Recipient not exist with id: " + id)
        );
        recipientRepository.delete(recipient);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

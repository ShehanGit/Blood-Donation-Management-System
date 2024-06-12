package com.blood_donation_system.backend.controller;

import com.blood_donation_system.backend.exception.ResourseNotFoundExeption;
import com.blood_donation_system.backend.model.Staff;
import com.blood_donation_system.backend.repsitory.StaffRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/staff")
public class StaffController {

    @Autowired
    private StaffRepository staffRepository;

    // Get all staff members
    @GetMapping
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    // Create a new staff member
    @PostMapping
    public Staff createStaff(@RequestBody Staff staff) {
        return staffRepository.save(staff);
    }

    // Get a staff member by ID
    @GetMapping("{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable Long id) {
        Staff staff = staffRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Staff not found with id: " + id)
        );
        return ResponseEntity.ok(staff);
    }

    // Update staff details
    @PutMapping("{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable Long id, @RequestBody Staff staffDetails) {
        Staff updatedStaff = staffRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Staff not exist with id: " + id)
        );

        updatedStaff.setName(staffDetails.getName());
        updatedStaff.setRole(staffDetails.getRole());
        updatedStaff.setContactNumber(staffDetails.getContactNumber());
        updatedStaff.setAssignedLocation(staffDetails.getAssignedLocation());

        staffRepository.save(updatedStaff);
        return ResponseEntity.ok(updatedStaff);
    }

    // Delete a staff member
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteStaff(@PathVariable Long id) {
        Staff staff = staffRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Staff not exist with id: " + id)
        );
        staffRepository.delete(staff);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package com.blood_donation_system.backend.controller;

import com.blood_donation_system.backend.model.Appointment;
import com.blood_donation_system.backend.repsitory.AppointmentRepository;
import com.blood_donation_system.backend.exception.ResourseNotFoundExeption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Get all appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Create a new appointment
    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    // Get an appointment by ID
    @GetMapping("{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Appointment not found with id: " + id)
        );
        return ResponseEntity.ok(appointment);
    }

    // Update appointment details
    @PutMapping("{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment appointmentDetails) {
        Appointment updatedAppointment = appointmentRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Appointment not found with id: " + id)
        );

        updatedAppointment.setDonor(appointmentDetails.getDonor());
        updatedAppointment.setScheduledDate(appointmentDetails.getScheduledDate());
        updatedAppointment.setLocation(appointmentDetails.getLocation());
        updatedAppointment.setAppointmentStatus(appointmentDetails.getAppointmentStatus());

        appointmentRepository.save(updatedAppointment);
        return ResponseEntity.ok(updatedAppointment);
    }

    // Delete an appointment
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(
                () -> new ResourseNotFoundExeption("Appointment not found with id: " + id)
        );
        appointmentRepository.delete(appointment);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Get appointment statistics
    @GetMapping("/stats")
    public ResponseEntity<?> getAppointmentStats() {
        long totalAppointments = appointmentRepository.count();
        long donationsToday = appointmentRepository.countByScheduledDate(LocalDate.now());
        long upcomingAppointments = appointmentRepository.countByScheduledDateBetween(LocalDate.now(), LocalDate.now().plusWeeks(1));

        return ResponseEntity.ok(new AppointmentStats(totalAppointments, donationsToday, upcomingAppointments));
    }

    private static class AppointmentStats {
        private final long totalAppointments;
        private final long donationsToday;
        private final long upcomingAppointments;

        public AppointmentStats(long totalAppointments, long donationsToday, long upcomingAppointments) {
            this.totalAppointments = totalAppointments;
            this.donationsToday = donationsToday;
            this.upcomingAppointments = upcomingAppointments;
        }

        public long getTotalAppointments() {
            return totalAppointments;
        }

        public long getDonationsToday() {
            return donationsToday;
        }

        public long getUpcomingAppointments() {
            return upcomingAppointments;
        }
    }
}

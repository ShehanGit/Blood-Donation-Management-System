package com.blood_donation_system.backend;

import com.blood_donation_system.backend.repsitory.AppointmentRepository;
import com.blood_donation_system.backend.repsitory.DonorRepository;
import com.blood_donation_system.backend.repsitory.HospitalReository;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	private DonorRepository donorRepository;

	@Autowired
	private  HospitalReository hospitalReository;

	@Autowired
	private AppointmentRepository appointmentRepository;


	@Override
	public void run(String... args) throws Exception {
		
	}
}

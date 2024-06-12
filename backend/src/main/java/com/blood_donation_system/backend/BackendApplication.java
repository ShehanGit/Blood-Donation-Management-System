package com.blood_donation_system.backend;

import com.blood_donation_system.backend.repsitory.DonationRepsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	private DonationRepsitory donationRepsitory;

	@Override
	public void run(String... args) throws Exception {

	}
	
}

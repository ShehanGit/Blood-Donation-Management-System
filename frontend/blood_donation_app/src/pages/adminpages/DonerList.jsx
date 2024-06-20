import React from "react";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import { Table, Button } from "flowbite-react";

export default function DonorList() {
  // Sample data
  const donors = [
    {
      donorId: 1,
      name: "John Doe",
      contactNumber: "+1234567890",
      email: "johndoe@example.com",
      address: "123 Elm Street, Metropolis",
      dateOfBirth: "1990-01-01",
      bloodType: "A+",
      gender: "Male",
      lastDonationDate: "2024-01-01",
    },
    // Add more donor objects here as needed
  ];

  const handleUpdate = (donorId) => {
    console.log(`Update donor with ID: ${donorId}`);
    // Implement update logic here
  };

  const handleDelete = (donorId) => {
    console.log(`Delete donor with ID: ${donorId}`);
    // Implement delete logic here
  };

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <Sidebar style={{ flex: "0 0 250px" }} /> {/* Sidebar width */}
        <div style={{ flex: "1", padding: "20px" }}> {/* Content area */}
          <div className="overflow-x-auto">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Contact Number</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
                <Table.HeadCell>Date of Birth</Table.HeadCell>
                <Table.HeadCell>Blood Type</Table.HeadCell>
                <Table.HeadCell>Gender</Table.HeadCell>
                <Table.HeadCell>Last Donation Date</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {donors.map((donor) => (
                  <Table.Row
                    key={donor.donorId}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {donor.name}
                    </Table.Cell>
                    <Table.Cell>{donor.contactNumber}</Table.Cell>
                    <Table.Cell>{donor.email}</Table.Cell>
                    <Table.Cell>{donor.address}</Table.Cell>
                    <Table.Cell>{donor.dateOfBirth}</Table.Cell>
                    <Table.Cell>{donor.bloodType}</Table.Cell>
                    <Table.Cell>{donor.gender}</Table.Cell>
                    <Table.Cell>{donor.lastDonationDate}</Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Button
                          size="xs"
                          onClick={() => handleUpdate(donor.donorId)}
                        >
                          Update
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(donor.donorId)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

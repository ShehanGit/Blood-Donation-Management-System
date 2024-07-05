import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import { Table, Button } from "flowbite-react";
import { getDonorList, deleteDonor } from "../../services/DoneerServices"; // Assuming you have these service functions
import Footer1 from "../../component/Footer";

export default function DonorList() {
  const [donors, setDonors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorDetails = async () => {
      try {
        const response = await getDonorList();
        if (response.status === 200) {
          setDonors(response.data);
        } else {
          console.error("Error fetching donor details", response.status);
        }
      } catch (error) {
        console.error("Error fetching donor details:", error);
      }
    };

    fetchDonorDetails();
  }, []);

  const handleUpdate = (donorId) => {
    navigate(`/donorupdate/${donorId}`);
  };

  const handleDelete = async (donorId) => {
    try {
      await deleteDonor(donorId);
      const response = await getDonorList();
      if (response.status === 200) {
        setDonors(response.data);
      } else {
        console.error("Error refetching donors after deletion", response.status);
      }
    } catch (error) {
      console.error("Error deleting donor:", error);
    }
  };

  

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <Sidebar style={{ flex: "0 0 250px" }} />
        <div style={{ flex: "1", padding: "20px" }}>
          <div className="title">
            <div className="mt-4 mx-5" style={{ marginBottom: "-40px" }}>
            </div>
          </div>
          
           
          </div>
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
        <Footer1/>
      </div>

  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import { Table, Button } from "flowbite-react";
import { getDonationList, deleteDonation } from "../../services/DonationServices"; // Assuming you have these service functions

export default function DonationList() {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        const response = await getDonationList();
        if (response.status === 200) {
          setDonations(response.data);
        } else {
          console.error("Error fetching donation details", response.status);
        }
      } catch (error) {
        console.error("Error fetching donation details:", error);
      }
    };

    fetchDonationDetails();
  }, []);

  const handleUpdate = (donationId) => {
    navigate(`/donationupdate/${donationId}`);
  };

  const handleadddonation = () => {
    navigate(`/Adddonation`);
  };

  const handleDelete = async (donationId) => {
    try {
      await deleteDonation(donationId);
      const response = await getDonationList();
      if (response.status === 200) {
        setDonations(response.data);
      } else {
        console.error("Error refetching donations after deletion", response.status);
      }
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <Sidebar style={{ flex: "0 0 250px" }} />
        <div style={{ flex: "1", padding: "20px" }}>
          <div className="overflow-x-auto">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>Donor ID</Table.HeadCell>
                <Table.HeadCell>Date of Donation</Table.HeadCell>
                <Table.HeadCell>Location</Table.HeadCell>
                <Table.HeadCell>Volume Donated (ml)</Table.HeadCell>
                <Table.HeadCell>Blood Type</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {donations.map((donation) => (
                  <Table.Row
                    key={donation.donationId}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {donation.donor.donorId}
                    </Table.Cell>
                    <Table.Cell>{formatDate(donation.dateOfDonation)}</Table.Cell>
                    <Table.Cell>{donation.location}</Table.Cell>
                    <Table.Cell>{donation.volumeDonated}</Table.Cell>
                    <Table.Cell>{donation.bloodType}</Table.Cell>
                    <Table.Cell>{donation.status}</Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Button
                          size="xs"
                          onClick={() => handleUpdate(donation.donationId)}
                        >
                          Update
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(donation.donationId)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>


            <Button size="xl" onClick={() => handleadddonation()}
                    style={{ marginTop: '20px', marginRight: '20px', float: 'right' }}
                    >
                        Add new Donation 
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
}

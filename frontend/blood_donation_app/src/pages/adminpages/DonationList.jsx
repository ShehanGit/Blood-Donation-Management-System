import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import { Table, Button, Modal } from "flowbite-react";
import axios from "axios";
import { getDonationList, deleteDonation } from "../../services/DonationServices"; // Assuming you have these service functions
import Footer1 from "../../component/Footer";

export default function DonationList() {
  const [donations, setDonations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [recipientId, setRecipientId] = useState("");
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
    setSelectedDonationId(donationId);
    setIsModalOpen(true);
  };

  const handleadddonation = () => {
    navigate(`/Adddonation`);
  };

  const handleDelete = async (donationId) => {
    setSelectedDonationId(donationId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDonation(selectedDonationId);
      const response = await getDonationList();
      if (response.status === 200) {
        setDonations(response.data);
        alert(`Donation with ID: ${selectedDonationId} deleted successfully`);
      } else {
        console.error("Error refetching donations after deletion", response.status);
      }
    } catch (error) {
      console.error("Error deleting donation:", error);
      alert("Error deleting donation. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedDonationId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDonationId(null);
    setRecipientId("");
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/donations/notifyDonor`, {
        params: {
          recipientId,
          donationId: selectedDonationId,
        },
      });
      alert(`Email sent successfully to donor with ID: ${selectedDonationId}`);
      handleModalClose();
    } catch (error) {
      alert("Error sending notification. Please try again.");
      console.error("Error sending notification:", error);
    }
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
                          Edit
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

            <Button
              size="xl"
              onClick={handleadddonation}
              style={{ marginTop: "20px", marginRight: "20px", float: "right" }}
            >
              Add new Donation
            </Button>
          </div>
        </div>
      </div>
      <Footer1 />

      <Modal show={isModalOpen} onClose={handleModalClose}>
        <Modal.Header>Update Donation</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <label htmlFor="recipientId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Recipient ID
              </label>
              <input
                type="number"
                id="recipientId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleFormSubmit}>Submit</Button>
          <Button color="failure" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this donation?
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={confirmDelete}>
            Delete
          </Button>
          <Button onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

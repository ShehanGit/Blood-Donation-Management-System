import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import { Table, Button } from "flowbite-react";
import { listBloodInventory, deleteBloodInventoryItem } from "../../services/BloodInventoryServices";
import Footer1 from "../../component/Footer";

export default function BloodInventory() {
  const [bloodInventory, setBloodInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBloodInventory = async () => {
      try {
        const response = await listBloodInventory();
        if (response.status === 200) {
          setBloodInventory(response.data);
        } else {
          console.error("Error fetching blood inventory details", response.status);
        }
      } catch (error) {
        console.error("Error fetching blood inventory details:", error);
      }
    };

    fetchBloodInventory();
  }, []);

  const handleUpdate = (itemId) => {
    navigate(`/bloodinventoryupdate/${itemId}`);
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteBloodInventoryItem(itemId);
      const response = await listBloodInventory();
      if (response.status === 200) {
        setBloodInventory(response.data);
      } else {
        console.error("Error refetching blood inventory after deletion", response.status);
      }
    } catch (error) {
      console.error("Error deleting blood inventory item:", error);
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
                <Table.HeadCell>Blood Type</Table.HeadCell>
                <Table.HeadCell>Quantity Available</Table.HeadCell>
                <Table.HeadCell>Expiration Date</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {bloodInventory.map((item) => (
                  <Table.Row
                    key={item.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.bloodType}
                    </Table.Cell>
                    <Table.Cell>{item.quantityAvailable}</Table.Cell>
                    <Table.Cell>{formatDate(item.expirationDate)}</Table.Cell>
                    <Table.Cell>{item.status}</Table.Cell>
                    
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Button
                          size="xs"
                          onClick={() => handleUpdate(item.inventoryId)}
                        >
                          Update
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(item.inventoryId)}
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
      <Footer1/>

    </div>
  );
}

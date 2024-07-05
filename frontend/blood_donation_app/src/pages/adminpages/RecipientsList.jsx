import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import { Table, Button, Flowbite, useThemeMode } from "flowbite-react";
import { getRecipientList, deleteRecipient } from "../../services/ResipientService";
import '../../css/ResipiantList.css';
import Footer1 from "../../component/Footer";


export default function RecipientsList() {
  const [recipients, setRecipients] = useState([]);
  const navigate = useNavigate();
  const { mode } = useThemeMode();

  useEffect(() => {
    const fetchRecipientDetails = async () => {
      try {
        const response = await getRecipientList();
        if (response.status === 200) {
          setRecipients(response.data);
        } else {
          console.error("Error fetching recipient details", response.status);
        }
      } catch (error) {
        console.error("Error fetching recipient details:", error);
      }
    };

    fetchRecipientDetails();
  }, []);

  const handleUpdate = (recipientId) => {
    navigate(`/recipientupdate/${recipientId}`);
  };

  const handleDelete = async (recipientId) => {
    try {
      await deleteRecipient(recipientId);
      const response = await getRecipientList();
      if (response.status === 200) {
        setRecipients(response.data);
      } else {
        console.error("Error refetching recipients after deletion", response.status);
      }
    } catch (error) {
      console.error("Error deleting recipient:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleAddRecipients = () => {
    navigate(`/addrecipients`);
  };

  return (
    <Flowbite>
      <div className={mode === "dark" ? "dark bg-gray-900 text-white" : ""}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <Sidebar style={{ flex: "0 0 250px" }} />
          <div style={{ flex: "1", padding: "20px" }}>
            <div className="overflow-x-auto">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Contact Number</Table.HeadCell>
                  <Table.HeadCell>Blood Type Needed</Table.HeadCell>
                  <Table.HeadCell>Required Blood Volume (ml)</Table.HeadCell>
                  <Table.HeadCell>Urgency Level</Table.HeadCell>
                  <Table.HeadCell>Receiving Date</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {recipients.map((recipient) => (
                    <Table.Row
                      key={recipient.recipientId}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {recipient.name}
                      </Table.Cell>
                      <Table.Cell>{recipient.contactNumber}</Table.Cell>
                      <Table.Cell>{recipient.bloodTypeNeeded}</Table.Cell>
                      <Table.Cell>{recipient.requiredBloodVolume}</Table.Cell>
                      <Table.Cell>{recipient.urgencyLevel}</Table.Cell>
                      <Table.Cell>{formatDate(recipient.receivingDate)}</Table.Cell>
                      <Table.Cell>
                        <div className="flex space-x-2">
                          <Button
                            size="xs"
                            onClick={() => handleUpdate(recipient.recipientId)}
                          >
                            Update
                          </Button>
                          <Button
                            size="xs"
                            color="failure"
                            onClick={() => handleDelete(recipient.recipientId)}
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
                onClick={handleAddRecipients}
                style={{ marginTop: '20px', marginRight: '20px', float: 'right' }}
              >
                Add new recipient
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer1/>
    </Flowbite>
  );
}

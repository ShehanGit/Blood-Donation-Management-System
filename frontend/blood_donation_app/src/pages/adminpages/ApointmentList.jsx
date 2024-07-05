import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import { Table, Button } from "flowbite-react";
import { listAppointments, deleteAppointment } from "../../services/AppointmentServices";
import Footer1 from "../../component/Footer";



export default function ApoinmentList() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await listAppointments();
        if (response.status === 200) {
          setAppointments(response.data);
        } else {
          console.error("Error fetching appointment details", response.status);
        }
      } catch (error) {
        console.error("Error fetching appointment details:", error);
      }
    };

    fetchAppointmentDetails();
  }, []);

  const handleUpdate = (appointmentId) => {
    navigate(`/appointmentupdate/${appointmentId}`);
  };

  const handleDelete = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      const response = await listAppointments();
      if (response.status === 200) {
        setAppointments(response.data);
      } else {
        console.error("Error refetching appointments after deletion", response.status);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
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
                <Table.HeadCell>Donor Name</Table.HeadCell>
                <Table.HeadCell>Scheduled Date</Table.HeadCell>
                <Table.HeadCell>Location</Table.HeadCell>
                <Table.HeadCell>Appointment Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {appointments.map((appointment) => (
                  <Table.Row
                    key={appointment.appointmentId}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {appointment.donor.name}
                    </Table.Cell>
                    <Table.Cell>{formatDate(appointment.scheduledDate)}</Table.Cell>
                    <Table.Cell>{appointment.location}</Table.Cell>
                    <Table.Cell>{appointment.appointmentStatus}</Table.Cell>





                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Button
                          size="xs"
                          onClick={() => handleUpdate(appointment.appointmentId)}
                        >
                          Update
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(appointment.appointmentId)}
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

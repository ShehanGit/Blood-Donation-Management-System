import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Sidebar from "../../component/Sidebar";
import { Table, Button } from "flowbite-react";
import { getHospitalList, deleteHospital } from "../../services/HospitalServices"; // Assuming you have these service functions
import Footer1 from "../../component/Footer";


export default function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await getHospitalList();
        if (response.status === 200) {
          setHospitals(response.data);
        } else {
          console.error("Error fetching hospital details", response.status);
        }
      } catch (error) {
        console.error("Error fetching hospital details:", error);
      }
    };

    fetchHospitalDetails();
  }, []);

  const handleUpdate = (hospitalId) => {
    navigate(`/hospitalupdate/${hospitalId}`);
  };

  const handleAddHospital = () => {
    navigate(`/addhospital`);
  };

  const handleDelete = async (hospitalId) => {
    try {
      await deleteHospital(hospitalId);
      const response = await getHospitalList();
      if (response.status === 200) {
        setHospitals(response.data);
      } else {
        console.error("Error refetching hospitals after deletion", response.status);
      }
    } catch (error) {
      console.error("Error deleting hospital:", error);
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
                <Table.HeadCell>Hospital ID</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
                <Table.HeadCell>Contact Info</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {hospitals.map((hospital) => (
                  <Table.Row
                    key={hospital.hospitalId}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {hospital.hospitalId}
                    </Table.Cell>
                    <Table.Cell>{hospital.name}</Table.Cell>
                    <Table.Cell>{hospital.address || 'N/A'}</Table.Cell>
                    <Table.Cell>{hospital.contactInfo || 'N/A'}</Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Button
                          size="xs"
                          onClick={() => handleUpdate(hospital.hospitalId)}
                        >
                          Update
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(hospital.hospitalId)}
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
              onClick={handleAddHospital}
              style={{ marginTop: '20px', marginRight: '20px', float: 'right' }}
            >
              Add new Hospital
            </Button>

          </div>
        </div>
      </div>
      <Footer1/>
    </div>
  );
}

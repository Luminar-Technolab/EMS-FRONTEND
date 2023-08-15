import React from "react";
import { Card, Row, Table, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/base_url";

function Hometable({ displayData,removeEmployee }) {
  // console.log(displayData);
  return (
    <div className="container mt-5">
      <h1>All Employee List</h1>
      <Row>
        <div className="col">
          <Card className="shadow">
            <Table>
              <thead>
                <tr className="table-warning rounded">
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Profile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayData?.length > 0 ? (
                  displayData?.map((item, index) => (
                    <tr>
                      <td> {index+1} </td>
                      <td>{item.fname} {item.lname}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>
                        <span className={item.status==='Active'?"btn btn-success":"btn btn-danger"}>{item.status}</span>
                      </td>
                      <td>
                        <img
                          width={"50px"}
                          height={"50px"}
                          className="rounded"
                          src={`${BASE_URL}/uploads/${item.profile
                          }`}
                          alt="profile"
                        />
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            {" "}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <Link
                                to={`/view/${item._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                              >
                                <i class="fa-solid fa-eye text-success"></i>{" "}
                                View
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link
                                to={`/edit/${item._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                              >
                                <i class="fa-solid fa-user-pen text-warning"></i>{" "}
                                Edit
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                             <div onClick={()=>removeEmployee(item._id)}>
                                <i class="fa-solid fa-trash text-danger"></i>{" "}
                                Delete
                             </div>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="d-flex justify-content-center align-items-center mt-5 text-danger w-100">
                    Sorry!! Nothing to display.
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </div>
      </Row>
    </div>
  );
}

export default Hometable;

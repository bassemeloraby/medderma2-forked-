import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getComps,
  deleteComp,
  updateComp,
} from "../features/companyReducer/companySlice";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import AddCompany from "../components/AddCompany";

function Companies() {
  const [updateCompanyName, setUpdateCompanyName] = useState("");

  const { comps, loading } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getComps());
  }, [dispatch, comps]);

  const updateHandler = (_id) => {
    console.log(_id);
    dispatch(updateComp({ id: _id, companyName: updateCompanyName }));
  };

  const deletehandler = (_id) => {
    dispatch(deleteComp(_id));
  };

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <div className="container">
      {/* start add company */}
      <AddCompany />
      {/* end add company */}

      <InputGroup className="mb-3">
        <Form.Control
          value={updateCompanyName}
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => setUpdateCompanyName(e.target.value)}
        />
      </InputGroup>

      {/*-------start company show-------*/}
      <section className="col">
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "orange" }}>
              <th>Company</th>
              <th>Update Company</th>
            </tr>
          </thead>
          <tbody>
            {comps.map((comp) => (
              <tr key={comp._id}>
                <td>{comp.companyName}</td>
                <td></td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => updateHandler(comp._id)}
                  >
                    card
                  </Button>{" "}
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => deletehandler(comp._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
      {/*-------end company show-------*/}
    </div>
  );
}

export default Companies;

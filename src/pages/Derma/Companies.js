import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import {
  getComps,
  deleteComp,
} from "../../features/companyReducer/companySlice";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Companies() {
  const { comps, loading } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getComps());
  }, [dispatch]);

  const cardHandler = (_id) => {
    console.log(_id);
    navigate(`/companyCard/${_id}`);
  };

const deletehandler = (_id)=>{
  dispatch(deleteComp(_id))
}

  if (loading) {
    return <h1>Loading...</h1>;
  }



  return (
    <div className="container">
      {/* start add company */}
      <AddCompany/>
      {/* end add company */}
      
      {" "}
      {/*-------start company show-------*/}
      <section className="col">
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "orange" }}>
              <th>Company</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {comps.map((comp) => (
              <tr key={comp._id}>
                <td>{comp.companyName}</td>
                <td>
                  <a
                    href={comp.website}
                    rel="noreferrer"
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                  >
                    {comp.companyName}
                  </a>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => cardHandler(comp._id)}
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

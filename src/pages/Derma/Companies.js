import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComps } from "../../features/companyReducer/companySlice";
import Table from "react-bootstrap/Table";

function Companies() {
  const { comps, loading } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComps());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
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

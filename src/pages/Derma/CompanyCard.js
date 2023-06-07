import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getComps,
  deleteComp,
  updateComp,
} from "../../features/companyReducer/companySlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function CompanyCard() {
  const [companyName, setCompanyName] = React.useState("");
  const { comps, loading } = useSelector((state) => state.company);
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const { _id } = useParams();
  useEffect(() => {
    dispatch(getComps());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateComp({ id: _id, companyName: companyName }));
    console.log(dispatch(updateComp({ id: _id, companyName: companyName })));
    setCompanyName("");
    navigate("/companies")
  };

const deletehandler = ()=>{
  
}

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {" "}
      {comps
        .filter((comp) => comp._id === _id)
        .map((comp) => (
          <div key={comp._id}>
            <h2 className=" d-flex justify-content-center">
              {comp.companyName}
            </h2>
            <div className="container col-10 d-flex mt-1">
              <Form className="shadow col-12 mb-5" onSubmit={onSubmit}>
                <InputGroup className="mb-2">
                  <Form.Control
                    placeholder="Enter a company"
                    type="text"
                    name="text"
                    defaultValue={comp.companyName}
                    autoFocus
                    autoComplete="off"
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </InputGroup>
                {/* <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    name="website"
                    placeholder="Enter website link"
                    value={comp.website}
                    autoComplete="off"
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </InputGroup> */}
                <Button variant="primary" type="submit">
                  Update
                </Button>{" "}
                
              </Form>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CompanyCard;

import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Companies from "./pages/Derma/Companies";
import CompanyCard from "./pages/Derma/CompanyCard"

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/companies" element={<Companies />} />
         <Route path="/companyCard/:_id" element={<CompanyCard/>} />
      </Routes>
    </div>
  );
}

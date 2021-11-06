import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [year, setYear] = useState([]);
  const [email, setEmail] = useState([]);
  const [enteredBranch, setenteredBranch] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const [section, setSection] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [period, setPeriod] = useState([]);
  const [periodData, setPeriodData] = useState([]);
  const [areaD, setAreaD] = useState([]);
  const [selarea, setSelArea] = useState([]);
  const [subject, setSubject] = useState([]);
  const [typeD, setTypeD] = useState([]);
  const [studD,setStudD] = useState([]);

  // const changeBranchHandler = (e) => {
  //   e.preventDefault();
  //   setenteredBranch(e.target.value);
  //   if (e.target.value === "SLESBP") {
  //     setEmail("admin.bp@sas.com");
  //   } else if (e.target.value === "SLESKS") {
  //     setEmail("admin.Ks@sas.com");
  //   } else {
  //     setEmail("admin.Mp@sas.com");
  //   }
  // };

  // const getYear = () => {
  //   const baseurl = `http://183.82.99.10/Ae-Erp-Api_DH/Assessment/GetAssessmentClass?UserMailId=${email}&AcademicYear=${year}&Branch=${enteredBranch}`;
  //   axios.get(`${baseurl}`).then((res) => {
  //     console.log("year", res);
  //     setYear([...res.data]);
  //   });
  // };

  const getenteredBranch = (getYear) => {
    const baseurl = `http://183.82.99.10/Ae-Erp-Api_DH/Assessment/GetAssessmentClass?UserMailId=${email}&AcademicYear=2020-2021&Branch=${enteredBranch}`;
    axios.get(`${baseurl}`).then((res) => {
      console.log("branch ", res);
      setenteredBranch([...res.data]);
    });
  };

  const getClasses = (enteredBranch, email) => {
    console.log("yr", enteredBranch, year, email);

    const baseurl = `http://183.82.99.10/Ae-Erp-Api_DH/Assessment/GetAssessmentClass?UserMailId=${email}&AcademicYear=${year}&Branch=${enteredBranch}`;
    axios.get(`${baseurl}`).then((res) => {
      console.log("clD", res);
      setClassesData([...res.data]);
    });
  };

  const getSection = (Class) => {
    const baseurl = `http://183.82.99.10/Ae-Erp-Api_DH/Assessment/GetAssessmentSection?UserMailId=${email}&AcademicYear=${year}&Branch=${enteredBranch}&AssessClass=${Class}`;
    axios.get(`${baseurl}`).then((res) => {
      console.log("sec ", res);
      setSectionData([...res.data]);;
    });
  };

  const getPeriods = (selectsec) => {
    const baseurl = `http://183.82.99.10/Ae-Erp-Api_DH/Assessment/GetAssessmentPeriods?UserMailId=${email}&AcademicYear=${year}&Branch=${enteredBranch}&AssessClass=${classes}&Section=${selectsec}`;
    axios.get(`${baseurl}`).then((res) => {
      console.log("peri ", res);
      setPeriodData([...res.data]);
    });
  };

  const getArea = (period) => {
    const baseurl = `http://183.82.99.10/Ae-Erp-Api_DH/Assessment/GetAssessmentPeriodSubjects?UserMailId=${email}&AcademicYear=${year}&Branch=${enteredBranch}&AssessClass=${classes}&Section=${section}&Period=${period}`;
    axios.get(`${baseurl}`).then((res) => {
      console.log("selarea", res);
      setSelArea([...res.data]);
    });
  };

  const getSubject = () => {
    const baseurl = `http://183.82.99.10/Ae-Erp-Api_DH/Assessment/GetAssessmentPeriodSubjects?UserMailId=${email}&AcademicYear=${year}&Branch=${enteredBranch}&AssessClass=${classes}&Section=${section}&Period=${period}`;
    axios.get(`${baseurl}`).then((res) => {
      console.log("subj", res);
      setSubject([...res.data]);
    
    });
  };

  const getType = (subject) => {
    const baseurl = `http://183.82.99.10/Ae-Erp-Api_DH/Assessment/GetAssessmentPeriodTestCategories?UserMailId=${email}&AcademicYear=${year}&Branch=${enteredBranch}&AssessClass=${classes}&Section=${section}&Period=${period}&Subject=${subject}`;
    axios.get(`${baseurl}`).then((res) => {
      console.log("type", res);
      setTypeD([...res.data]);
    });
  };



  const getStudD = (type) => {
    const baseurl = `http://183.82.99.10/Ae-Erp-Api_DH/Assessment/GetAssessment?UserMailId=${email}&AcademicYear=${year}&Branch=${enteredBranch}&AssessClass=${classes}&Section=${section}&Period=${period}&Subject=${subject}&catg=${type}`;
    axios.get(`${baseurl}`).then((res) => {
      
      console.log("StudD", res,studD);
      // setStudD([...res.data]);
    });
  };

  // useEffect(() => {
  //   // getClasses();
  //   // getYear();
  // }, []);

  const handleYearOnChange = (e) => {
    console.log("year", e.target.value);
    getenteredBranch(e.target.value);
    setYear(e.target.value);
  };

  const handleBranchOnChange = async (e) => {
    let email;
    if (e.target.value === "SLESBP") {
      setEmail("admin.bp@sas.com");
      email = "admin.bp@sas.com";
    } else if (e.target.value === "SLESKS") {
      setEmail("admin.Ks@sas.com");
      email = "admin.Ks@sas.com";
    } else {
      setEmail("admin.Mp@sas.com");
      email = "admin.Mp@sas.com";
    }
    console.log("branch", e.target.value);

    // getSection(e.target.value);
    setenteredBranch(e.target.value);
    getClasses(e.target.value, email);
  };

  const handleClassOnChange = (value) => {
    setClasses(value.target.value);
    console.log("class", value.target.value);
    getSection(value.target.value);
  };

  const hadleSectionOnChange = (value) => {
    setSection(value.target.value);
    console.log("sec", value.target.value);
    getPeriods(value.target.value);
  };

  const hadlePeriodOnChange = (e) => {
    setPeriod(e.target.value);
    console.log("period", e.target.value);
    getArea(e.target.value);
   
  };

  const handleAreaOnChange = (e) => {
    console.log("area", e.target.value);
    // getArea(e.target.value);
    getSubject(e.target.value)
    getType(e.target.value)
  };

  const handleTypeOnChange = (e) => {
    setAreaD(e.target.value);
    console.log("Type", e.target.value);
    getStudD(e.target.value);
  };

  return (
    <div className="student">
      <div className="stu-mang">
        <p> ASSESSMENT- MARKS ENTRY</p>

        <hr></hr>

        <div className="smcontentmarks">
          <div className="dropdown">
            <p id="conn">Academic Year</p>
            <select id="academic" onChange={(e) => handleYearOnChange(e)}>
              <option value="0">Select AcademicYear</option>
              <option value="2019-2020">2019-2020</option>
              <option value="2020-2021">2020-2021</option>
              <option value="2021-2022">2021-2022</option>
            </select>
          </div>
          <div className="dropdown">
            <p id="conn">Branch</p>
            <select id="academic" onChange={(e) => handleBranchOnChange(e)}>
            <option value="0">Please select branch </option>
              <option value="SLESBP">St. Andrews School, Bowenpally</option>
              <option value="SLESKS">St. Andrews School, Keesara</option>
              <option value="LEETMP">St. Andrews School, Marredpally</option>
            </select>
          </div>
          <div className="dropdown">
            <p id="conn">Class</p>
            <select id="academic" onChange={(e) => handleClassOnChange(e)}>
            <option value="0">Select Class</option>
              {classesData.map((option) => (
                <option value={option.U_VALUS}>{option.U_VALUS}</option>
              ))}
            </select>
          </div>
          <div className="dropdown">
            <p id="conn">Section</p>
            
            <select id="academic" onChange={(e) => hadleSectionOnChange(e)}>
            <option value="0">Select Section</option>
              {sectionData.map((option) => (
                <option value={option.U_VALUS}>{option.U_VALUS}</option>
              ))}
            </select>
          </div>
          <div className="dropdown">
            <p id="conn">Assessment Cycle</p>
            <select id="academic" onChange={(e) => hadlePeriodOnChange(e)}>
            <option value="0">Select Assessment Cycle</option>
              {periodData.map((option) => (
                <option value={option.U_VALUS}>{option.U_VALUS}</option>
              ))}
            </select>
          </div>
          &nbsp;
          
          <div className="dropdown">
            <p id="conn">Assessment Area</p>
            <select id="academic" onChange={(e) => handleAreaOnChange(e)}>
            <option value="0">Select Assessment Area</option>
              {selarea.map((option) => (
                <option value={option.StudFee}>{option.StudFee}</option>
              ))}
            </select>
          </div>
          <div className="dropdown">
            <p id="conn">Assessment Subject</p>
            <select id="academic" onChange={(e) => handleAreaOnChange(e)}>
            <option value="0">Select Assessment Subject</option>
              {selarea.map((option) => (
                <option value={option.U_VALUS}>{option.U_VALUS}</option>
              ))}
            </select>
          </div>
          <div className="dropdown">
            <p id="conn">Assessment Type</p>
            <select id="academic" onChange={(e) => handleTypeOnChange(e)}>
               <option value="0">Select Assessment Type</option>
          
              {typeD.map((option) => (
                <option value={option.U_VALUS}>{option.U_VALUS}</option>
              ))}
            </select>
          </div>
          <div className="dropdown">
            <p id="conn">Students</p>
            <select id="academic" onChange={(e) => handleTypeOnChange(e)}>
              <option value="0">Select Student</option>
              {studD.map((option) => (
                <option value={option.U_VALUS}>{option.U_VALUS}</option>
              ))}
            </select>
          </div>
          <form id="form1">
            <input id="btnad" type="submit" value="Search" />
          </form>
          
        </div>
        <div className="card-body"></div>
      </div>
    </div>
  );
}

export default App;

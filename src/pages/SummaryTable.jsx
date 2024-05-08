import { useRef } from "react"
import { useReactToPrint } from 'react-to-print';
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProfiles } from "../features/applications/applicationsSlice"
import PrintableTable from "../components/PrintableTable"


const SummaryTable = () => {
  const {id}= useParams()
  const dispatch= useDispatch()
  const {profiles}= useSelector(state=>state.applications)
  //console.log(id)
  const componentRef = useRef();
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);

    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  console.log('Age ',calculateAge('1993-01-20'))
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

   //console.log(profiles)
    useEffect(()=>{
      dispatch(fetchProfiles(parseInt(id)))
    }, [dispatch, id])
  return (
    <>
    <div className="container">
      <div className="row">
      <div className="d-flex justify-content-between ">
        <h1>Summary Table</h1>
      <button className="btn btn-outline-info my-3" onClick={handlePrint}>
        Print Summary Table
      </button>
      </div>
      </div>
      
      <div ref={componentRef} className="row">
        <div className="col-md-12">
        <PrintableTable calculateAge={calculateAge} profiles={profiles} />
        </div>
      </div>
    </div>
    </>
  )
}

export default SummaryTable

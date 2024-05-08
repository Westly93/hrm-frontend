import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { allShortListed } from "../apis/AdvertsFunction";
import ShortList from "../features/ShortList";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import ShortlistedTable from "../components/ShortlistedTable";

const ShortListing = () => {
  const [searchQuery, setSearchQuery] = useState()
  const [filteredShortlist, setFilteredShortlist] = useState()
  const [timer, setTimer] = useState()

  const { isLoading, isError, error, data: shortlisted } = useQuery({
    queryKey: ['shortlisted'],
    queryFn: allShortListed
  });

  console.log(shortlisted);

  //filter searched shortlisted
  const handleSearch = (e) => {
    clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        if (Array.isArray(shortlisted)) {
          const filtered = shortlisted.filter((shortlisted) =>
          shortlisted.firstnames
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
          );
        const sortedandfiltered = filtered.sort(
          (a, b) =>
            new Date(b.closing_date) - new Date(a.closing_date)
          );
        setFilteredShortlist(sortedandfiltered);
        }
      }, 1000)
    )   
  }

  // conditions
  if (isLoading) return <p><LoadingSpinner /></p>

  if (isError) return <p>Error: {error.message}</p>


  console.log("list", shortlisted)


  return (
    <>
         <div className="container">
           <div className="row pt-2 mt-4 mb-2">
             <div>
            <PageTitle icon="bi bi-people-fill" title="Applicants Shortlist" />

               <div className="col-md-12 d-flex justify-co6ntent-center">
                 {/* <form className="my-2">
                   <div class="input-group mb-3 rounded-pill"> 
                   <input
                    type="text"
                    placeholder="Search candidate..."
                    className="form-control form-control-lg roundedd-pill"                   
                    onChange={handleSearch}
                  />
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container">        
        <div className="card-body">
              
          { filteredShortlist ? (
              filteredShortlist.map((shortlisted) => (
                <ShortlistedTable shortlisted={shortlisted} />
              ))
            ) : (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Gender</th>
                  <th>National ID</th>
                  <th>Contact</th>
                  <th>Advert</th>
                  <th>Total Scores</th>
                </tr>
              </thead>
              <tbody>

                {Array.isArray(shortlisted) ? (
                  shortlisted.map((person, index) => (
                    <tr key={index}>
                      <td>{person.firstnames}</td>
                      <td>{person.surname}</td>
                      <td>{person.sex}</td>
                      <td>{person.national_id}</td>
                      <td>{person.Cell}</td>
                      <td>{person.title}</td>
                      <td>{person.totalscore}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default ShortListing;

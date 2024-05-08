import { useInfiniteQuery,useQuery  } from "@tanstack/react-query";
import { fetchAdverts, fetchFilteredAdverts } from "../apis/AdvertsFunction";
import AdvertsList from "../features/AdvertsList";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import PageButton from "../components/PageButton";
import Pagination from "../components/Pagination";


const PAGE_SIZE = 50; // Number of items per page



const AdvertListings = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('');
  // const [filteredAdverts, setFilteredAdverts] = useState();
  const [timer, setTimer] = useState()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  

  // fetch adverts from server
    const {
        isLoading, 
        isError,
        error,
        data: adverts,
        isFetching,
        isPreviousData,
    } = useQuery(['/adverts', currentPage], () => fetchAdverts(currentPage), {
        keepPreviousData: true
    })
    // console.log(adverts)

    //fetch filtered adverts
      const { data: filteredAdverts } = useQuery(
        ['filteredAdverts', searchQuery],
        () => fetchFilteredAdverts(searchQuery),
        {
          enabled: searchQuery !== '', // Disable the query when searchQuery is empty
        }
      );

    // conditions
    if (isLoading) return <p><LoadingSpinner /></p>

    if (isError) return <p>Error: {error.message}</p>

    //map adverts and paginate
    const content = adverts.data.map((advert) => {
        return <AdvertsList advert={advert} key={advert.id} />;
    });

  

  return (
    <div>
      <PageTitle icon="bi bi-journals" title="Job Adverts" />
         <div className="container">
           <div className="row pt-2">
             <div>
               <div className="col-md-12 d-flex justify-co6ntent-center">
                 <form className="my-2">
                   <div class="input-group mb-3 rounded-pill"> 
                   <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search adverts..."
                    className="form-control form-control-lg roundedd-pill"                   
                    onChange={handleSearch}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Pagination currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} isPreviousData={isPreviousData} />


      {isFetching && <span className="loading"><LoadingSpinner /></span>}

            {filteredAdverts ? (
              filteredAdverts.data.map((advert) => (
                <AdvertsList advert={advert} key={advert.id} />
              ))
            ) : content ? (
              <div>
                {content}
              </div>
            ) : null}
    </div>
  );
}
export default AdvertListings

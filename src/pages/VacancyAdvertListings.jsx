import { useQuery } from "@tanstack/react-query";
import { fetchAdverts } from "../apis/AdvertsFunction";
import VacancyList from "../features/VacancyList";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import PageButton from "../components/PageButton";


const VacancyAdvertListings = () => {
    const [page, setPage] = useState(1)
    const [filteredAdverts, setFilteredAdverts] = useState();
    const [timer, setTimer] = useState()
    const [searchTerm, setSearchTerm] = useState("")

    //fetch adverts from provided endpoint
    const {
        isLoading,
        isError,
        error,
        data: adverts,
        isFetching,
        isPreviousData,
    } = useQuery(['/adverts', page], () => fetchAdverts(page), {
        keepPreviousData: true
    })
    console.log(adverts)


    //filter searched adverts
    const handleSearch = (e) => {
      clearTimeout(timer)
      setTimer(
        setTimeout(() => {
          const filtered = adverts.data.filter((advert) =>
          advert.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
          );
          const sortedandfiltered = filtered.sort(
          (a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        );
        setFilteredAdverts(sortedandfiltered);
        }, 2000)
      )   
    }

      //conditions
    if (isLoading) return <p><LoadingSpinner /></p>

    if (error) return <p>Error: {error.message}</p>


    //map adverts and paginate
    const content = adverts.data.map(advert => <VacancyList advert={advert} key={advert.id} />)

    const nextPage = () => setPage(prev => prev + 1)

    const prevPage = () => setPage(prev => prev - 1)

    const pagesArray = Array(adverts.total_pages).fill().map((_, index) => index + 1).reverse()

    const nav = (
      <div className="container">
        <div className="row">
          <div className="column-md-8">
          <nav className="nav-ex2">
            <button className="btn btn-sm btn-secondary" onClick={prevPage} disabled={isPreviousData || page === 1}>&lt;&lt;</button>
            {pagesArray.map(pg => <PageButton key={pg} pg={pg} setPage={setPage} isPreviousData={isPreviousData}/>)}
            <button className="btn btn-sm btn-secondary" onClick={nextPage} disabled={isPreviousData || page === adverts.total_pages}>&gt;&gt;</button>
        </nav>
          </div>
        </div>
      </div>
        
    )

    

    return (
        <>
        <PageTitle icon="bi bi-journals" title="Job Adverts" />
        <div className="container">
          <div className="row pt-2">
            <div>
              <div className="col-md-12 d-flex justify-co6ntent-center">
                <form className="my-2">
                  <div class="input-group mb-3 rounded-pill"> 
                  <input
                    type="text"
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
            {nav}
            
            {isFetching && <span className="loading"><LoadingSpinner /></span>}

            {filteredAdverts ? (
              filteredAdverts.map((advert) => (
                <VacancyList advert={advert} key={advert.id} />
              ))
            ) : content ? (
              <div>
                {content}
              </div>
            ) : null}
        </>
    )
}
export default VacancyAdvertListings

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplications,
  fetchApplicationScores,
  deleteApplication,
} from "../features/applications/applicationsSlice";
import PageTitle from "../components/PageTitle";
import DataTable from 'react-data-table-component';

const ApplicantList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useSelector(state => state.users);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [appscores, setAppscores] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      if (!user.roles.some(role => role.name === "admin")) {
        navigate('/login');
      }
    }
    dispatch(fetchApplicationScores())
      .then((data) => {
        setAppscores(data.payload);
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, [dispatch, isAuthenticated, navigate, user.roles]);

  const columns = [
    {
      name: 'First Names',
      selector: (row) => row.firstnames,
      sortable: true,
    },
    {
      name: 'Surname',
      selector: (row) => row.surname,
      sortable: true,
    },
    {
      name: 'Gender',
      selector: (row) => row.sex,
      sortable: true,
    },
    {
      name: 'Nationality',
      selector: (row) => row.national_id,
      sortable: true,
    },
    // {
    //   name: 'DOB',
    //   selector: (row) => row.dob,
    //   sortable: true,
    // },
  
    {
      name: 'Total Scores',
      selector: (row) => row.totalscore,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <Link
          to={`/adverts/${id}/applications/${row.application_id}`}
          className="btn btn border-2 border-primary-subtle btn-light font-medium me-2"
        >
          <i className="bi bi-eye-fill text-muted"></i> Details
        </Link>
      ),
    },
  ];
  
  

  const filteredApplications = appscores || [];

  const advertApplications = filteredApplications.length && filteredApplications?.filter(
    (app) => app.advert_id === parseInt(id)
  );

  const applicantsWithScoreAbove50 = advertApplications && advertApplications?.reduce((result, app) => {
    const existingApplicant = result.find((item) => item.applicant_id === app.applicant_id);
    if (existingApplicant) {
      existingApplicant.totalscore += app.totalscore;
    } else {
      result.push({ ...app });
    }
    return result;
  }, []);
console.log("final ress:", applicantsWithScoreAbove50)
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <PageTitle icon="bi bi-people-fill" title="Applicants List/Pre-Shortlisted" />
        <div className="mt-3">
          <Link className="btn btn-outline-info" to={`/adverts/${id}/summary-table`}>
            View Summary table
          </Link>
        </div>
      </div>

      <div className="card card-primary">
        <div className="card-header fw-medium ">Advert Details</div>
        <div className="card-body">
          <DataTable
            search
            columns={columns}
            data={loading ? [] : applicantsWithScoreAbove50 || []}
            noDataComponent={<div>No data available</div>}
            pagination
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantList;

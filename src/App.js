import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  userVerification,
  fetchQualifications,
  fetchExperience,
} from "./features/users/usersSlice";
import { Provider } from "react-redux";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewAdvert from "./pages/NewAdvert";
import AdvertListings from "./pages/AdvertListings";
import AdvertDetails from "./pages/AdvertDetails";
import AdvertPostDetails from "./pages/AdvertPostDetails";
import AdvertApplicationDetails from "./pages/AdvertApplicationDetails";
import ApplicantAdvertListings from "./pages/ApplicantAdvertListings";
import JobRequirements from "./pages/JobRequirements";
import UploadDocuments from "./pages/UploadDocuments";
import ApplicantList from "./pages/ApplicantsList";
import ApplicationDetail from "./pages/ApplicationDetail";
import NewContactType from "./pages/NewContactType";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PreviewAdvert from "./pages/PreviewAdvert";
import Qualification from "./components/Qualification";
import Qualifications from "./pages/Qualifications";
import Experience from "./components/Experience";
import ApplicantExperience from "./pages/Experience";
import ShortListing from "./pages/ShortListing";
// import AdvertShortlist from "./pages/AdvertShortlist";
import Application from "./pages/Application";
import Layout from "./Layouts/Layout";

import ApplicantDetails from "./pages/ApplicantDetails";
import NewDocumentType from "./pages/NewDocumentType";
import NewNationality from "./pages/NewNationality";
import AdvertScores from "./pages/AdvertScores";
import { store } from "./app/store";
import AdvertShortlist from "./pages/AdvertShortlist";
import IntervewCandidatesByAdvert from "./pages/IntervewCandidatesByAdvert";

import InterviewCandidates from "./pages/InterviewCandidates";
import InterviewResults from "./pages/InterviewResults";
import InterviewScoresForm from "./components/InterviewScoresForm";
import QualificationsAndExperience from "./pages/QualificationsAndExperience";
import {
  fetchDocumentTypes,
  fetchApplicantDocuments,
} from "./features/applications/applicationsSlice";
import { fetchAppliedAdverts } from "./features/adverts/advertsSlice";
import AppliedJobs from "./pages/AppliedJobs";
import SummaryTable from "./pages/SummaryTable";
import Dashboard from "./pages/Dashboard";
import { fetchContacts } from "./features/users/usersSlice";
import AddContacts from "./pages/AddContacts";
import VacancyAdvertListings from "./pages/VacancyAdvertListings";
import VacancyApplicationDetails from "./pages/VacancyApplicationDetails";
import AdvertRequirements from "./pages/AdvertRequirements";
import PasswordReset from "./pages/PasswordReset";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";
import Activate from "./pages/Activate";
function App() {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { status, isAuthenticated, user } = useSelector((state) => state.users);
  //const applicant_id = user?.user?.profile.id;
  useEffect(() => {
    dispatch(userVerification());
    dispatch(fetchApplicantDocuments());
    dispatch(fetchQualifications());
    dispatch(fetchExperience());
    dispatch(fetchDocumentTypes());
    dispatch(fetchAppliedAdverts());
    if (isAuthenticated) {
      dispatch(fetchContacts(user?.user?.profile?.id));
    }
  }, [dispatch, isAuthenticated, user?.user?.profile?.id]);

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Provider store={store}>
          <Layout>
            {status === "loading" ? (
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                {isAuthenticated && (
                  <Routes>
                    <Route
                      path="/new-document-type"
                      element={<NewDocumentType />}
                    />
                    <Route path="/applied" element={<AppliedJobs />} />
                    <Route
                      path="/qualification-experience"
                      element={<QualificationsAndExperience />}
                    />
                    <Route
                      path="/new-contact-type"
                      element={<NewContactType />}
                    />
                    <Route
                      path="/new-nationality"
                      element={<NewNationality />}
                    />

                    <Route path="/new-advert" element={<NewAdvert />} />

                    <Route
                      path="/adverts/:id/preview"
                      element={<PreviewAdvert />}
                    />
                    <Route
                      path="/adverts/:id"
                      element={<AdvertPostDetails />}
                    />
                    <Route
                      path="/interviewapplicants/:id"
                      element={<IntervewCandidatesByAdvert />}
                    />
                    <Route
                      path="/applicant-adverts-list"
                      element={<ApplicantAdvertListings />}
                    />
                    <Route
                      path="/adverts/:id/summary-table"
                      element={<SummaryTable />}
                    />
                    <Route
                      path="/applications/:id"
                      element={<ApplicantList />}
                    />
                    <Route path="/short-listing" element={<ShortListing />} />
                    <Route
                      path="/adverts/:id/applications/:pk"
                      element={<ApplicationDetail />}
                    />
                    <Route
                      path="/adverts/:id/scores"
                      element={<AdvertScores />}
                    />
                    <Route
                      path="/applicant-adverts/:id"
                      element={<AdvertApplicationDetails />}
                    />

                    <Route path="/adverts-list" element={<AdvertListings />} />

                    <Route path="/advert/:id" element={<AdvertDetails />} />

                    <Route
                      path="/adverts/:id/requirements"
                      element={<JobRequirements />}
                    />

                    <Route
                      path="/add-requirements/:id"
                      element={<AdvertRequirements />}
                    ></Route>

                    <Route
                      path="/applicant-info"
                      element={<ApplicantDetails />}
                    />
                    <Route
                      path="/applicant-uploads"
                      element={<UploadDocuments />}
                    />
                    <Route
                      path="/advert-shortlist/:id"
                      element={<AdvertShortlist />}
                    />

                    <Route
                      path="/interview-candidates/"
                      element={<InterviewCandidates />}
                    />

                    <Route
                      path="/interview-scores-form/:id/candidate/:candidateId"
                      element={<InterviewScoresForm />}
                    />

                    <Route
                      path="/interview-results/"
                      element={<InterviewResults />}
                    />

                    <Route
                      path="/qualifications/"
                      element={<Qualification />}
                    />

                    <Route
                      path="/applicant-qualifications/"
                      element={<Qualifications />}
                    />

                    <Route path="/experience/" element={<Experience />} />
                    <Route
                      path="/applicant-experience/"
                      element={<ApplicantExperience />}
                    />
                    <Route
                      path="/applicant-contacts/"
                      element={<AddContacts />}
                    />

                    <Route path="/application/:id" element={<Application />} />

                    <Route
                      path="/applicant-adverts/:id"
                      element={<AdvertApplicationDetails />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                )}
                <Routes>
                  <Route path="/signup" element={<SignUp />} />

                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />

                  <Route
                    path="/vacancies"
                    element={<VacancyAdvertListings />}
                  />

                  <Route
                    path="/applicant-vacancy/:id"
                    element={<VacancyApplicationDetails />}
                  />
                </Routes>
              </>
            )}
            <Routes>
              <Route path="/reset-password" element={<PasswordReset />} />
              <Route
                path="/password/reset/confirm/:uid/:token"
                element={<PasswordResetConfirm />}
              />
              <Route path="/activate/:uid/:token" element={<Activate />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Layout>
        </Provider>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;

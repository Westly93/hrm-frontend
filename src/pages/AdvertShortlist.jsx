import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import { ApplicantInterview } from "../features/applications/applicationsSlice";
import { InviteInterviewCandidate } from "../features/interviews/interviewSlice";
import { advertShortList } from "../apis/AdvertsFunction";

const AdvertShortlist = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.users);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');

    const { isLoading: shortlistedLoading, isError, error, data: shortlisted } = useQuery(
        {
            queryKey: ['shortlisted', id],
            queryFn: () => advertShortList(id)
        }
    );

    const dispatch = useDispatch();

    const handleOpenModal = (applicant) => {
        setSelectedApplicant(applicant);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedApplicant(null);
        setShowModal(false);
        setMessage('');
    };

    const handleInviteInterview = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const inviteInterview = await dispatch(
                InviteInterviewCandidate({
                    application_id: selectedApplicant.application_id,
                    message: message,
                })
            );
            // console.log("Email sent:", inviteInterview);

            const interview = await dispatch(
                ApplicantInterview({
                    application_id: selectedApplicant.application_id,
                    status: 'pending',
                })
            );
            // console.log("Interview data sent:", interview);

            if (interview.payload.status === "success") {
                setSuccessMessage(interview.payload.message);
                // console.log('Interview Invite:', interview.payload.message);
            }
        } catch (error) {
            // console.error('Error while inviting for interview:', error.message);
        } finally {
            setIsLoading(false);
            handleCloseModal();
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            if (!user.roles.some(role => role.name === "admin")) {
                navigate('/');
            }
        }
    }, []);

    return (
        <>
            <div className="container">
                <PageTitle icon="bi bi-people-fill" title="Advert Shortlist" />
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}
                <div className="card shadow border-0 rounded mt-4">
                    <h5 className="card-header fw-medium">Shortlists</h5>
                    <div className="card-body">
                        <Table className="table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Gender</th>
                                    <th>National ID</th>
                                    <th>Phone</th>
                                    <th>Total Scores</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shortlistedLoading ? (
                                    <tr>
                                        <td colSpan="8"><LoadingSpinner /></td>
                                    </tr>
                                ) : isError ? (
                                    <tr>
                                        <td colSpan="8">Error: {error.message}</td>
                                    </tr>
                                ) : (
                                    Array.isArray(shortlisted) && shortlisted.length > 0 ? (
                                        shortlisted.map((person) => (
                                            <tr key={person.id}>
                                                <td>{person.application_id}</td>
                                                <td>{person.firstnames}</td>
                                                <td>{person.surname}</td>
                                                <td>{person.sex}</td>
                                                <td>{person.national_id}</td>
                                                <td>{person.Cell}</td>
                                                <td>{person.totalscore}</td>
                                                <td>
                                                    <Button onClick={() => handleOpenModal(person)}>Invite Interview</Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8">No Shortlists For This Advert.</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </Table>
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                            <Modal.Title>Invite Interview for {selectedApplicant && selectedApplicant.firstnames}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleInviteInterview}>
                                    <Form.Group controlId="message">
                                        <Form.Label>Interview Message:</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseModal}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit" disabled={isLoading}>
                                            {isLoading ? 'Submitting...' : 'Submit'}
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};


export default AdvertShortlist;



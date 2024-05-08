import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Qualification from '../components/Qualification'
import Experience from '../components/Experience'
import EditExperienceModal from '../components/EditExperienceModal'
import EditQualificationModal from '../components/EditQualificationModal'


const QualificationsAndExperience = () => {
    const {user}= useSelector(state=>state.users)
    const {qualifications, experience}= useSelector(state=>state.users)
   const myExperience= experience?.filter(exp=>exp.applicant_id=== user?.user?.profile?.id)
   const myQualifications= qualifications?.filter(q=> q.applicant_id === user?.user?.profile?.id)
  return (
    <div>
            <div className='shadow p-4'>
                <div className='d-flex justify-content-between'>
                    <h3 className='mb-3 text-uppercase'>Qualifications</h3>
                    <i data-bs-toggle="modal" data-bs-target="#addQualificationModal" style={{cursor:'pointer'}} class="bi bi-plus h3"></i>
                </div>
            
            { myQualifications?.length ?  myQualifications?.map(q=>(
                <div key={q.id} className='border-bottom my-3'>
                    <div className='d-flex justify-content-between'>
                        <h5>{q.institution}</h5>
                        <i style={{cursor: "pointer"}} data-bs-toggle="modal" data-bs-target={`#edit-qualification${q.id}`} class="bi bi-pencil-square"></i>
                    </div>
                    
                    <p>{q.qualification}</p>
                    <p>{q.start_date} - {q.end_date}</p>
                    <p>Grade: {q.grade}</p>
                    <EditQualificationModal id= {`edit-qualification${q.id}`} object={q} />
                </div>
            )) : (<strong>No Qualifications yet.. </strong>)}
            
        </div>
        {/* Experience portion */}
            <div className='shadow p-4 my-5'>
                <div className='d-flex justify-content-between'>
                    <h3 className='mb-3 text-uppercase'>Experience</h3>
                    <i data-bs-toggle="modal" data-bs-target="#addExperienceModal" style={{cursor:'pointer'}} class="bi bi-plus h3"></i>

                </div>
            
            {myExperience?.length ? myExperience?.map(q=>(
                <div key={q.id} className='border-bottom my-3'>
                    <div className='d-flex justify-content-between'>
                        <h5>{q.company}</h5>
                        <i style={{cursor: "pointer"}} data-bs-toggle="modal" data-bs-target={`#edit${q.id}`} class="bi bi-pencil-square"></i>
                    </div>
                    
                    <p>{q.title}</p>
                    <p>{q.description}</p>
                    <p>{q.start_date} - {q.end_date ? (<span>{q.end_date}</span>) : (<span>Present</span>)}</p>
                    <p>{q.location}</p>
                    <EditExperienceModal id= {`edit${q.id}`} object={q}/>
                </div>
            )) : (<strong>No experience yet .. </strong>)}
            
        </div>
        <Link to="/applicant-uploads" className='btn btn-primary mb-3'>Next <i class="bi bi-arrow-right"></i></Link>
      <Qualification/>
      <Experience/>
    </div>
  )
}

export default QualificationsAndExperience

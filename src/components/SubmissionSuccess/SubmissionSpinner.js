import React from 'react'
import "./SubmissionSpinner.css" 

export default function () {
  return (
    <div>
        <div className="preloader">
        <div className="spinner"></div>
        <div className="loading-text">Processing...</div>
    </div>
    </div>
  )
}

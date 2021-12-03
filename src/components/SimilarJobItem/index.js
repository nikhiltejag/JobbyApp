import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {details} = props

  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = details

  return (
    <li className="similar-job-item">
      <div className="similar-logo-name-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="job-item-similar-logo"
        />
        <div className="similar-name-rating-container">
          <h1 className="similar-job-item-name">{title}</h1>
          <div className="similar-rating-container">
            <AiFillStar className="similar-rating-star" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      {/* work on below css and jsx */}
      <div>
        <div className="description-visit-container">
          <h1 className="similar-description-head">Description</h1>
        </div>

        <p className="similar-description">{jobDescription}</p>
      </div>
      <div className="similar-location-salary-container">
        <div className="similar-location-employment">
          <div className="similar-location-container">
            <MdLocationOn />
            <p className="similar-location">{location}</p>
          </div>
          <div className="similar-employment-type-container">
            <MdWork />
            <p className="similar-employment-type">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem

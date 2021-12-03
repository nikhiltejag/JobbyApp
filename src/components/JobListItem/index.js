import {withRouter} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'

import './index.css'

const JobListItem = props => {
  //   console.log(props)
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    rating,
  } = details

  const onClickJobItem = () => {
    const {history} = props

    history.push(`/jobs/${id}`)
  }

  return (
    <li className="job-list-item">
      <button
        type="button"
        className="job-list-item-button"
        onClick={onClickJobItem}
      >
        <div className="item-logo-name-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-list-item-logo"
          />
          <div className="item-name-rating-container">
            <h1 className="item-job-list-item-name">{title}</h1>
            <div className="item-rating-container">
              <AiFillStar className="rating-star" />
              <p className="item-rating">{rating}</p>
            </div>
          </div>
        </div>
        {/* work on below css and jsx */}
        <div className="item-location-salary-container">
          <div className="item-location-employment">
            <div className="item-location-container">
              <MdLocationOn />
              <p className="item-location">{location}</p>
            </div>
            <div className="item-employment-type-container">
              <MdWork />
              <p className="item-employment-type">{employmentType}</p>
            </div>
          </div>
          <p className="item-salary">{packagePerAnnum}</p>
        </div>
        <hr />
        <div>
          <h1 className="item-description-head">Description</h1>
          <p className="item-description">{jobDescription}</p>
        </div>
      </button>
    </li>
  )
}

export default withRouter(JobListItem)

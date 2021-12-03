import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn, MdWork} from 'react-icons/md'

import NavBar from '../NavBar'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const jobDetailApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetail extends Component {
  state = {
    jobDetail: {},
    similarJobs: [],
    apiStatus: jobDetailApiStatus.initial,
  }

  componentDidMount() {
    this.getJobDetail()
  }

  getJobDetail = async () => {
    this.setState({apiStatus: jobDetailApiStatus.inProgress})

    const {match} = this.props

    const {params} = match
    const {id} = params

    const jwtToken = Cookie.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    // console.log(url)

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    // console.log(data)
    if (response.ok) {
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        id: data.job_details.id,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
      }
      const similarJobs = data.similar_jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetail: updatedData,
        similarJobs,
        apiStatus: jobDetailApiStatus.success,
      })
    } else {
      this.setState({apiStatus: jobDetailApiStatus.failure})
    }
  }

  //   renderSkillItem = details => {
  //     const {name, imageUrl} = details

  //     return (
  //       <li className="skill-list-item">
  //         <img src={imageUrl} alt={name} className="skill-image" />
  //         <p className="skill-name">{name}</p>
  //       </li>
  //     )
  //   }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state

    return (
      <div className="similar-jobs-container">
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(each => (
            <SimilarJobItem key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetail = () => {
    const {jobDetail} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      jobDescription,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobDetail

    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <div className="job-item-detail">
          {/* <button
          type="button"
          className="job-item-detail-button"
          onClick={onClickJobItem}
        > */}
          <div className="detail-logo-name-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-item-detail-logo"
            />
            <div className="detail-name-rating-container">
              <h1 className="detail-job-item-name">{title}</h1>
              <div className="detail-rating-container">
                <AiFillStar className="detail-rating-star" />
                <p className="detail-rating">{rating}</p>
              </div>
            </div>
          </div>
          {/* work on below css and jsx */}
          <div className="detail-location-salary-container">
            <div className="detail-location-employment">
              <div className="detail-location-container">
                <MdLocationOn />
                <p className="detail-location">{location}</p>
              </div>
              <div className="detail-employment-type-container">
                <MdWork />
                <p className="detail-employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="detail-salary">{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <div className="description-visit-container">
              <h1 className="detail-description-head">Description</h1>
              <a href={companyWebsiteUrl} className="visit">
                Visit <BiLinkExternal />
              </a>
            </div>

            <p className="detail-description">{jobDescription}</p>
          </div>
          <h1 className="job-detail-skills">Skills</h1>
          <ul className="skills-list">
            {skills.map(each => (
              <SkillItem key={each.name} details={each} />
            ))}
          </ul>
          <h1 className="detail-life-at-company">Life at company</h1>
          <div className="life-at-company-description-image-container">
            <p className="detail-life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
          {/* </button> */}
        </div>
        {this.renderSimilarJobs()}
      </>
    )
  }

  onClickJobDetailRetry = () => {
    this.getJobDetail()
  }

  renderDetailFailureView = () => (
    <div className="job-detail-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-detail-failure-image"
      />
      <h1 className="job-detail-failure-head">Oops! Something Went Wrong</h1>
      <p className="job-detail-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-detail-failure-retry-button"
        onClick={this.onClickJobDetailRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderDetailApp = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case jobDetailApiStatus.success:
        return this.renderJobDetail()
      case jobDetailApiStatus.failure:
        return this.renderDetailFailureView()
      case jobDetailApiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-route-container">
        <NavBar />
        {this.renderDetailApp()}
      </div>
    )
  }
}

export default JobItemDetail

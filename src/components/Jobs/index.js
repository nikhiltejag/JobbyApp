import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import Profile from '../Profile'
import EmploymentTypeItem from '../EmploymentTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'
// import JobsList from '../JobsList'
import JobListItem from '../JobListItem'

import './index.css'

const jobsListApisConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noData: 'NO_DATA',
  inProgress: 'IN_PROGRESS',
}

//  These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentTypeIdList: [],
    salaryRange: '',
    jobsListApiStatus: jobsListApisConst.initial,
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({jobsListApiStatus: jobsListApisConst.inProgress})

    const {searchInput, salaryRange, employmentTypeIdList} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeIdList.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`

    console.log(url)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const updatedData = data.jobs.map(each => ({
      id: each.id,
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      title: each.title,
      rating: each.rating,
    }))
    // console.log(url, updatedData)

    if (response.ok) {
      if (updatedData.length === 0) {
        this.setState({jobsListApiStatus: jobsListApisConst.noData})
      } else {
        this.setState({
          jobsListApiStatus: jobsListApisConst.success,
          jobsList: updatedData,
        })
      }
    } else {
      this.setState({jobsListApiStatus: jobsListApisConst.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsList()
  }

  renderMobileSearchBar = () => {
    const {searchInput} = this.state

    return (
      <div className="mobile-search-bar-container">
        <input
          type="search"
          className="mobile-search-bar"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          testid="searchButton"
          className="search-icon-container"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onSelectEmployment = event => {
    // console.log(event.target.id, event.target.checked, event.target)
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentTypeIdList: [
            ...prevState.employmentTypeIdList,
            event.target.id,
          ],
        }),
        this.getJobsList,
      )
    } else {
      this.setState(
        prevState => ({
          employmentTypeIdList: prevState.employmentTypeIdList.filter(
            each => each !== event.target.id,
          ),
        }),
        this.getJobsList,
      )
    }
  }

  renderEmploymentTypesFilter = () => {
    const {employmentTypeIdList} = this.state

    return (
      <div className="employment-types-container">
        <h1 className="filter-head">Type of Employment</h1>
        <ul className="filter-options-list">
          {employmentTypesList.map(each => (
            <EmploymentTypeItem
              key={each.employmentTypeId}
              details={each}
              onSelectEmployment={this.onSelectEmployment}
            />
          ))}
        </ul>
      </div>
    )
  }

  onSelectSalary = salaryRange => {
    this.setState({salaryRange}, this.getJobsList)
  }

  renderSalaryRange = () => (
    <div className="salary-range-container">
      <h1 className="filter-head">Salary Range</h1>
      <ul className="filter-options-list">
        {salaryRangesList.map(each => (
          <SalaryRangeItem
            key={each.salaryRangeId}
            details={each}
            onSelectSalary={this.onSelectSalary}
          />
        ))}
      </ul>
    </div>
  )

  renderLargeScreenSearchBar = () => {
    const {searchInput} = this.state

    return (
      <div className="search-bar-container">
        <input
          type="search"
          className="search-bar"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          testid="searchButton"
          className="search-icon-container"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  // work on this jobs list and job id
  renderJobsList = () => {
    const {jobsList} = this.state

    return (
      <ul className="jobs-list-container">
        {jobsList.map(each => (
          <JobListItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderNoData = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-data-image"
      />
      <h1 className="no-jobs-head">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  onClickRetryJobs = () => {
    this.getJobsList()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-retry-button"
        onClick={this.onClickRetryJobs}
      >
        Retry
      </button>
    </div>
  )

  fetchAndRenderJobsList = () => {
    const {jobsListApiStatus} = this.state

    switch (jobsListApiStatus) {
      case jobsListApisConst.inProgress:
        return this.renderLoader()
      case jobsListApisConst.success:
        return this.renderJobsList()
      case jobsListApisConst.noData:
        return this.renderNoData()
      case jobsListApisConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, employmentTypeIdList, salaryRange} = this.state

    return (
      <div className="jobs-route-container">
        <NavBar />
        <div className="filter-jobs-container">
          <div className="filter-container">
            {this.renderMobileSearchBar()}
            <Profile />
            <hr />
            {this.renderEmploymentTypesFilter()}
            <hr />
            {this.renderSalaryRange()}
          </div>
          <div className="search-jobs-container">
            {this.renderLargeScreenSearchBar()}
            {/* <JobsList
              employmentTypeIdList={employmentTypeIdList}
              salaryRange={salaryRange}
              searchInput={searchInput}
            /> */}
            {this.fetchAndRenderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs

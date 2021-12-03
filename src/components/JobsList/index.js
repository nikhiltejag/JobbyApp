// import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const jobsListApisConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noData: 'NO_DATA',
  inProgress: 'IN_PROGRESS',
}

class JobsList extends Component {
  state = {
    apiStatus: jobsListApisConst.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: jobsListApisConst.inProgress})

    const {searchInput, salaryRange, employmentTypeIdList} = this.props

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeIdList.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    console.log(url, data)
  }

  //   renderSearchBar = () => {
  //     const {searchInput} = this.state

  //     return (
  //       <div className="search-bar-container">
  //         <input
  //           type="search"
  //           className="search-bar"
  //           placeholder="Search"
  //           value={searchInput}
  //           onChange={this.onChangeSearchInput}
  //         />
  //         <button
  //           type="button"
  //           testid="searchButton"
  //           className="search-icon-container"
  //         >
  //           <BsSearch className="search-icon" />
  //         </button>
  //       </div>
  //     )
  //   }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case jobsListApisConst.inProgress:
        return this.renderLoader()
      case jobsListApisConst.success:
        return this.renderjobsList()
      default:
        return null
    }
  }
}

export default JobsList

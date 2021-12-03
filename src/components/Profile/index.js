import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const profileApiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    apiStatus: profileApiStatusConst.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: profileApiStatusConst.inProgress})

    const url = 'https://apis.ccbp.in/profile'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }

    if (response.ok) {
      this.setState({
        apiStatus: profileApiStatusConst.success,
        profileDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: profileApiStatusConst.failure})
    }
  }

  onClickRetry = () => {
    this.getProfileDetails()
  }

  renderProfileFailure = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {profileDetails} = this.state

    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case profileApiStatusConst.failure:
        return this.renderProfileFailure()
      case profileApiStatusConst.success:
        return this.renderProfile()
      case profileApiStatusConst.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default Profile

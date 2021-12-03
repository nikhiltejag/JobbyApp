import {Link} from 'react-router-dom'

import NavBar from '../NavBar'

import './index.css'

const Home = () => (
  <>
    <NavBar />
    <div className="home-container">
      <div className="home-responsive-container">
        <h1 className="home-head">Find the job that fits your life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="home-find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home

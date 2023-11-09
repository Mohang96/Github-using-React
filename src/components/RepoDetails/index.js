import {Component} from 'react'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RepoDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, repoDetails: {}}

  componentDidMount() {
    this.getRepoDetails()
  }

  getRepoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {repoId} = params
    const response = await fetch(
      'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc',
    )
    const data = await response.json()
    console.log(data)
    const getReqRepoData = data.items.filter(eachItem => repoId === eachItem.id)
    console.log(getReqRepoData)
    const repoObj = getReqRepoData[0]
    const owner = repoObj.owner.login
    const repo = repoObj.name
    const response1 = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
    )
    const data1 = await response1.json()
    console.log(data1)
    if (response1.ok) {
      this.setState({apiStatus: apiStatusConstants.success, repoDetails: data1})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loading-view-container">
      <p>Loading</p>
    </div>
  )

  renderSuccessView = () => {
    const {repoDetails} = this.state

    return (
      <div className="success-view-container">
        <p>Repo Details Display</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-background">
      <h1>Something went wrong</h1>
    </div>
  )

  renderRepoDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    console.log('routed to repo details route')
    return (
      <div className="repo-details-background">{this.renderRepoDetails()}</div>
    )
  }
}

export default RepoDetails

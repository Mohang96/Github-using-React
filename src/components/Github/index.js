import {Component} from 'react'

import RepoItem from '../RepoItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Github extends Component {
  state = {apiStatus: apiStatusConstants.initial, reposList: []}

  componentDidMount() {
    this.getReposList()
  }

  getFormattedRepo = repoDetails => ({
    avatarUrl: repoDetails.owner.avatar_url,
    repoId: repoDetails.id,
    ownerName: repoDetails.owner.login,
    repoName: repoDetails.name,
    description: repoDetails.description,
    updatedAt: repoDetails.updated_at,
    forksCount: repoDetails.forks_count,
    issuesCount: repoDetails.open_issues_count,
  })

  getReposList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl =
      'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc'
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      const fetchedReposList = data.items
      const updatedReposList = fetchedReposList.map(eachRepo =>
        this.getFormattedRepo(eachRepo),
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        reposList: updatedReposList,
      })
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
    const {reposList} = this.state

    return (
      <div className="success-view-container">
        <ul className="repos-list">
          {reposList.map(eachRepo => (
            <RepoItem key={eachRepo.repoId} repoDetails={eachRepo} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-background">
      <h1>Something went wrong</h1>
    </div>
  )

  renderReposList = () => {
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
    return (
      <div className="app-background">
        <div className="app-responsive-background">
          {this.renderReposList()}
        </div>
      </div>
    )
  }
}

export default Github

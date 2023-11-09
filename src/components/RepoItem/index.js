import {Link} from 'react-router-dom'

import './index.css'

const RepoItem = props => {
  const {repoDetails} = props
  const {
    avatarUrl,
    repoId,
    repoName,
    ownerName,
    description,
    updatedAt,
    forksCount,
    issuesCount,
  } = repoDetails

  return (
    <Link to={`/repos/${repoId}/`} className="link-item">
      <li className="repo-item">
        <div className="avatar-container">
          <img src={avatarUrl} alt="avatar" className="avatar" />
        </div>
        <div className="repo-details-container">
          <h1 className="repo-name">{repoName}</h1>
          <p className="description">{description}</p>
          <div className="repo-bottom-details">
            <h1 className="count">{forksCount}</h1>
            <h1 className="count">{issuesCount}</h1>
            <p className="published-data">
              Last pushed {updatedAt} by {ownerName}
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RepoItem

import './index.css'

const SkillItem = props => {
  const {details} = props
  const {name, imageUrl} = details

  return (
    <li className="skill-list-item">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillItem

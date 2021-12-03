import './index.css'

const EmploymentTypeItem = props => {
  const {details, onSelectEmployment} = props
  const {label, employmentTypeId} = details

  const onClickEmployment = event => {
    onSelectEmployment(event)
  }

  return (
    <li className="employment-item">
      <input
        type="checkbox"
        className="employment-item-checkbox"
        id={employmentTypeId}
        onChange={onClickEmployment}
      />
      <label className="employment-type-label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeItem

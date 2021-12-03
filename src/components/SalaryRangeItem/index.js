import './index.css'

const SalaryRangeItem = props => {
  const {details, onSelectSalary} = props
  //   console.log(details)
  const {label, salaryRangeId} = details

  const onClickSalaryRange = event => {
    onSelectSalary(event.target.id)
  }

  return (
    <li className="salary-range-item">
      <input
        type="radio"
        className="salary-range-input"
        id={salaryRangeId}
        name="salary-range"
        onChange={onClickSalaryRange}
      />
      <label htmlFor={salaryRangeId} className="employment-type-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeItem

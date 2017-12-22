import * as React from 'react'

const FieldItem = ({ field, toggleField, isChecked, i }) => {
  return (
    <div>
      <input
        name={field._id}
        checked={isChecked}
        onChange={e => toggleField.call(null, i, e)}
        type="checkbox"
      />
      <label htmlFor={field._id}>{field.title}</label>
    </div>
  )
}

/** Retrieves list of all fields for a provided collection */
class FieldList extends React.Component {
  render() {
    const { fields, activeFields, toggleField } = this.props
    return fields && fields.length > 0
      ? (
          <div>
            <h3>Field Selector</h3>
            {fields.map((f, i) =>
              <FieldItem
                key={i}
                isChecked={activeFields.indexOf(f._id) !== -1}
                toggleField={toggleField}
                i={i}
                field={f}
              />)}
          </div>
        )
      : <h4>No fields to display.</h4>
  }
}

export default FieldList

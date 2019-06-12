import * as React from "react";

export namespace CategoryField {
  export interface Props {
    isEditField: boolean
    toggleField: () => void
    fieldValue: string
    fieldType: string
    onUpdate: (value: string) => void
    submitCategoryField: (value: () => void) => void;
  }
}

export class CategoryField extends React.Component<CategoryField.Props>{

  render() {

    const toggleField = this.props.toggleField;
    const isEditField = this.props.isEditField;
    const fieldValue = this.props.fieldValue;
    const fieldType = this.props.fieldType;
    const onUpdate = this.props.onUpdate;
    const submitCategoryField = this.props.submitCategoryField;

    return ( fieldValue != null &&
      <div>
        {isEditField ?
          <div>
            {fieldType}:<br/>
            <input type="text" value={fieldValue} onChange={(event) => onUpdate(event.target.value)} />
            <button onClick={() => submitCategoryField(toggleField)}>Submit</button>
          </div>
          :
          <div>
            {fieldType}:<br/>
            {fieldValue}
            <button onClick={() => toggleField()}>Edit</button>
          </div>
        }
      </div>
    )
  }

}

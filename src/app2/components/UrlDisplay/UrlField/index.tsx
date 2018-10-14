import * as React from "react";

export namespace UrlField {
  export interface Props {
    isEditField: boolean
    toggleField: () => void
    fieldValue: string
    fieldType: string
    onUpdate: (value: string) => void;
    submitUrlField: (value: () => void) => void;
  }
}

export class UrlField extends React.Component<UrlField.Props> {

  render() {
    // if (!this.props.displayedUrl)

    const toggleField = this.props.toggleField;
    const isEditField = this.props.isEditField;
    const fieldValue = this.props.fieldValue;
    const fieldType = this.props.fieldType;
    const onUpdate = this.props.onUpdate;
    const submitUrlField = this.props.submitUrlField;

    return ( fieldValue != null &&
      <div>
        {isEditField ?
          <div>
            {fieldType}:<br/>
            <input type="text" value={fieldValue} onChange={(event) => onUpdate(event.target.value)} />
            <button onClick={() => submitUrlField(toggleField)}>Submit</button>
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

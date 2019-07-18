import * as React from "react";
import { CategoryModel } from "app2/models";
import { Dispatch } from "redux";
import { reduxForm, InjectedFormProps, Field } from 'redux-form';


export namespace AddUrlForm {
    export interface Props {
      parentName: String;
      dispatch: Dispatch;
    }
  }
  
  
  export class AddUrlForm extends React.Component<InjectedFormProps<CategoryModel> & AddUrlForm.Props> {

    render() {
      const { pristine, submitting, reset, handleSubmit } = this.props;        
        return (
          <form onSubmit={handleSubmit}>
          <div>{this.props.parentName}</div>
          <div>
            <label>Name</label>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Name"
            />
          </div>
          <div>
            <label>Url</label>
            <Field
              name="url"
              component="input"
              type="text"
              placeholder="Url"
            />
          </div>
          <div>
            <label>Description</label>
            <Field
              name="description"
              component="input"
              type="text"
              placeholder="Description"
            />
          </div>
          <div>
            <label>Rating 0-10</label>
            <Field
              name="rating"
              component="input"
              type=""
              placeholder=""
            />
          </div>
          <div>
            <button type="submit" disabled={pristine || submitting}>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </form>
        )
    }

  }  

  export default reduxForm<CategoryModel, AddUrlForm.Props>({
    form: 'addUrlFom',
  })(AddUrlForm);
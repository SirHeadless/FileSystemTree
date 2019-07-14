import * as React from "react";
import { CategoryModel } from "app2/models";
import { Dispatch } from "redux";
import { reduxForm, InjectedFormProps, Field } from 'redux-form';


export namespace AddCategoryForm {
    export interface Props {
      parentName: String;
      dispatch: Dispatch;
    }
  }
  
  
  export class AddCategoryForm extends React.Component<InjectedFormProps<CategoryModel> & AddCategoryForm.Props> {

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
            <label>Description</label>
            <Field
              name="description"
              component="input"
              type="text"
              placeholder="Description"
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

  export default reduxForm<CategoryModel, AddCategoryForm.Props>({
    form: 'addCategoryFom',
  })(AddCategoryForm);
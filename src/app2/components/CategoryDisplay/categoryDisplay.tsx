import * as React from "react";
import {CategoryModel} from "../../models";
import {CategoryFormFields} from "../../models/CategoryFormFields";
import {Dispatch} from "redux";
import {CategoryField} from "./CategoryField/categoryField";
import {CategoryFormFieldsActions} from "../../actions/categoryFromFields";
import updateCategoryFormFields = CategoryFormFieldsActions.updateCategoryFormFields;
import {MarkedCategoryActions} from "../../actions/markedCategoryActions";
import updateMarkedCategory = MarkedCategoryActions.updateMarkedCategory;
import {CategoryRequests} from "../../utils/categoryRequests/CategoryRequests";
import {FileSystem} from "../../models/FileSystem";
import {FileSystemTreeActions} from "../../actions";
import reloadCategories = FileSystemTreeActions.reloadCategories;

export namespace CategoryDisplay {
  export interface Props {
    displayedCategory: CategoryModel;
    categoryFormFields: CategoryFormFields;
    dispatch: Dispatch;
    categories: CategoryModel[];
  }
}

export class CategoryDisplay extends React.Component<CategoryDisplay.Props>{

  constructor(props: CategoryDisplay.Props) {
    super(props);
  }

  toggleIsNameEditField() {
    this.props.categoryFormFields.isNameEditField = !this.props.categoryFormFields.isNameEditField;
    this.props.dispatch(updateCategoryFormFields(this.props.categoryFormFields));
  }

  toggleIsDescriptionEditField() {
    this.props.categoryFormFields.isDescriptionEditField= !this.props.categoryFormFields.isDescriptionEditField;
    this.props.dispatch(updateCategoryFormFields(this.props.categoryFormFields));
  }

  updateNameField(name: string) {
    this.props.displayedCategory.name = name;
    this.props.dispatch(updateMarkedCategory(this.props.displayedCategory));
  }

  updateDescriptionField(description: string) {
    this.props.displayedCategory.description = description;
    this.props.dispatch(updateMarkedCategory(this.props.displayedCategory));
  }

  submitCategory(toggleField: () => void) {
    toggleField();
    if (this.props.displayedCategory != null) {
      this.updateCategory(this.props.displayedCategory as CategoryModel);
    }
  }

  updateCategory(categoryModelToUpdate: CategoryModel) {
    const categoryUpdateRequest = CategoryRequests.updateCategory(categoryModelToUpdate);

    categoryUpdateRequest.then(response => {
      console.log("Response:" + response.data);
      const responseCategory = response.data as CategoryModel;
      const categoryIndex = this.props.categories.findIndex(category => category.categoryId === responseCategory.categoryId);
      const newCategoryState = this.props.categories;
      newCategoryState[categoryIndex] = responseCategory;

      const fileSystemJustCategories: FileSystem = {
        categoriesState: newCategoryState,
        urlsState: []
      }
      this.props.dispatch(reloadCategories(fileSystemJustCategories));
    }).catch(error => {
      console.log('Error: ' + error);
    });
  }

  render() {

    const category = this.props.displayedCategory;
    const categoryFormFields = this.props.categoryFormFields;

    return (category != null &&
      <div>
        <CategoryField toggleField={this.toggleIsNameEditField} fieldType={"Name"} fieldValue={category.name}
          isEditField={categoryFormFields.isNameEditField} onUpdate={this.updateNameField}
          submitCategoryField={this.submitCategory}/>
        <CategoryField toggleField={this.toggleIsDescriptionEditField} fieldType={"Description"} fieldValue={category.description}
          isEditField={categoryFormFields.isDescriptionEditField} onUpdate={this.updateDescriptionField}
          submitCategoryField={this.submitCategory}/>
      </div>
    )
  }
}

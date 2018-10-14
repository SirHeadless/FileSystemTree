import * as React from "react";

import {UrlModel} from "../../models";
import {UrlFormFields} from "../../models/UrlFormFields";
import {Dispatch} from "redux";
import {UrlFormFieldsActions} from "../../actions/urlFormFields";
import updateUrlFormFields = UrlFormFieldsActions.updateUrlFormFields;
import {UrlField} from "./UrlField";
import {MarkedUrlActions} from "../../actions/markedUrl";
import updateMarkedUrl = MarkedUrlActions.updateMarkedUrl;
import {UrlRequests} from "../../utils/urlRequests/UrlRequests";
import {FileSystem} from "../../models/FileSystem";
import {FileSystemTreeActions} from "../../actions";
import reloadUrls = FileSystemTreeActions.reloadUrls;

export namespace UrlDisplay {
  export interface Props {
    displayedUrl: UrlModel;
    urlFormFields: UrlFormFields
    dispatch: Dispatch;
    urls: UrlModel[]
  }
}

export class UrlDisplay extends React.Component<UrlDisplay.Props> {

  constructor(props: UrlDisplay.Props) {
    super(props);

    this.toggleIsDescriptionEditField = this.toggleIsDescriptionEditField.bind(this);
    this.toggleIsNameEditField = this.toggleIsNameEditField.bind(this);
    this.toggleIsUrlEditField = this.toggleIsUrlEditField.bind(this);
    this.updateNameField = this.updateNameField.bind(this);
    this.updateDescriptionField = this.updateDescriptionField.bind(this);
    this.updateUrlField = this.updateUrlField.bind(this);
    this.submitUrl = this.submitUrl.bind(this);

  }

  handleSubmit(url: UrlModel) {
    console.log(url);
  }

  handleChange() {
    console.log("handle change");
  }

  toggleIsNameEditField() {
    this.props.urlFormFields.isNameEditField = !this.props.urlFormFields.isNameEditField;
    this.props.dispatch(updateUrlFormFields(this.props.urlFormFields))
  }

  toggleIsDescriptionEditField() {
    this.props.urlFormFields.isDescriptionEditField = !this.props.urlFormFields.isDescriptionEditField;
    this.props.dispatch(updateUrlFormFields(this.props.urlFormFields))
  }

  toggleIsUrlEditField() {
    this.props.urlFormFields.isUrlEditField = !this.props.urlFormFields.isUrlEditField;
    this.props.dispatch(updateUrlFormFields(this.props.urlFormFields))
  }

  submitUrl(toggleField: () => void) {
    toggleField();
    if (this.props.displayedUrl != null )
    {
      this.updateUrl(this.props.displayedUrl as UrlModel)
    }
  }

  updateUrl(urlModelToUpdate: UrlModel) {
    const urlUpdateRequest = UrlRequests.updateUrl(urlModelToUpdate);

    urlUpdateRequest.then(response => {
      console.log("Response:" + response.data);
      const responseUrl = response.data as UrlModel;
      const urlIndex = this.props.urls.findIndex(url => url.urlId === responseUrl.urlId);
      const newUrlState = this.props.urls;
      newUrlState[urlIndex] = responseUrl;

      const fileSystemJustWithUrls: FileSystem =
        {
          categoriesState: [],
          urlsState: newUrlState
        };
      this.props.dispatch(reloadUrls(fileSystemJustWithUrls));
    }).catch(error => {
      console.log('Error: ' + error);
    });
  }

  updateNameField(name: string) {
    this.props.displayedUrl.name = name;
    this.props.dispatch(updateMarkedUrl(this.props.displayedUrl))
  }

  updateDescriptionField(description: string) {
    this.props.displayedUrl.description = description;
    this.props.dispatch(updateMarkedUrl(this.props.displayedUrl))
  }

  updateUrlField(url: string) {
    this.props.displayedUrl.url = url;
    this.props.dispatch(updateMarkedUrl(this.props.displayedUrl))
  }

  render() {
    // if (!this.props.displayedUrl)

    const url = this.props.displayedUrl;
    const urlFormFields = this.props.urlFormFields;

    return (url != null &&
      <div>
        <UrlField toggleField={this.toggleIsNameEditField} fieldType={"Name"} fieldValue={url.name}
                  isEditField={urlFormFields.isNameEditField} onUpdate={this.updateNameField}
                  submitUrlField={this.submitUrl}/>
        <UrlField toggleField={this.toggleIsDescriptionEditField} fieldType={"Description"} fieldValue={url.description}
                  isEditField={urlFormFields.isDescriptionEditField} onUpdate={this.updateDescriptionField}
                  submitUrlField={this.submitUrl}/>
        <UrlField toggleField={this.toggleIsUrlEditField} fieldType={"Url"} fieldValue={url.url}
                  isEditField={urlFormFields.isUrlEditField} onUpdate={this.updateUrlField}
                  submitUrlField={this.submitUrl}/>
      </div>
    )
  }
}

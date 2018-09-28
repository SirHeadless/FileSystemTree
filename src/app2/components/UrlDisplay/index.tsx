import * as React from "react";

import {UrlModel} from "../../models";
import {Container, Row, Col} from 'react-grid-system';

export namespace FileSystemEntryDisplay {
  export interface Props {
    displayedUrl?: UrlModel
  }
}

export class UrlDisplay extends React.Component<FileSystemEntryDisplay.Props> {

  render() {
    // if (!this.props.displayedUrl)

    const url = this.props.displayedUrl;

    return ( url != undefined &&
      <div>
        <Container>
          <Row>
            <Col sm={12}>
              Url Name: {url.name}
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              Url: {url.url}
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              Description: {url.description}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

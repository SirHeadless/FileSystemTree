import * as React from "react";

export namespace Url {
  export interface Props {
    name: string;
  }
}

export class Url extends React.Component<Url.Props> {

  render() {
    return (
      <div>
        U[{this.props.name}]
      </div>
    )
  }
}

import * as React from "react";

export namespace Category {
  export interface Props {
    name: string;
    categoryId:number;
  }
}

export class Category extends React.Component<Category.Props> {

  render() {
    return (
      <div>
        C[{this.props.name}{this.props.categoryId}]
      </div>
    )
  }
}

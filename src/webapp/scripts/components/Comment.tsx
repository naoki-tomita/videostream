import * as React from "react";
import { RaisedButton, TextField } from "material-ui";
import { CommentModel } from "../models/Comment";

interface Props {
  id: number;
  now: () => number;
  commentModel: CommentModel;
}

interface State {
  comment: string;
}

export class Comment extends React.Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = { comment: "" };
  }

  render() {
    const { comment } = this.state;
    return (
      <div>
        <TextField 
          type="text" 
          onChange={this.changeText.bind(this)} 
          value={comment}
        />
        <RaisedButton 
          primary={true} 
          onClick={this.send.bind(this)} 
          label="Send Comment"
        />
      </div>
    );
  }

  changeText(e: React.ChangeEvent<HTMLInputElement>) {
    const { value: comment } = e.target;
    this.setState({
      comment,
    });
  }

  async send() {
    const { id, now } = this.props;
    const { comment } = this.state;
    const { commentModel } = this.props;
    await commentModel.postComment({
      comment, 
      time: now(),
    });
  }
}


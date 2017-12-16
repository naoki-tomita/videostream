import * as React from "react";
import { Button, Input, Grid } from "semantic-ui-react";
import { CommentModel } from "../models/Comment";

interface Props {
  id: number;
  now: () => number;
  commentModel: CommentModel;
}

interface State {
  comment: string;
}

export class CommentInput extends React.Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = { comment: "" };
  }

  render() {
    const { comment } = this.state;
    return (
      <>
        <Grid>
          <Grid.Column width={11}>
            <Input
              type="text"
              fluid
              onChange={this.changeText.bind(this)}
              value={comment}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Button
              fluid
              primary
              onClick={this.send.bind(this)} 
            >
              Send
            </Button>
          </Grid.Column>
        </Grid>
      </>
    );
  }

  changeText(data: React.ChangeEvent<HTMLInputElement>) {
    const { value: comment } = data.target;
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
    this.setState({
      comment: "",
    });
  }
}


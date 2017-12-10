import * as React from "react";
import "react-dom";
import { RaisedButton, TextField } from "material-ui";

interface Props {
  id: number;
  now: () => number;
}

interface State {
  comment: string;
}

class Comment extends React.Component<Props, State> {
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
    await sendComment({
      id, 
      comment, 
      time: now(),
    });
  }
}


import * as React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Player } from "./Player";
import { Comment } from "./Comment";
import { CommentModel } from "../models/Comment";

interface Props {
  id: number;
}

export class Root extends React.Component<Props> {
  refs: {
    player: Player;
  }
  commentModel: CommentModel;

  constructor(props: Props, context?: any) {
    super(props, context);
    const { id } = this.props;
    this.commentModel = new CommentModel({ id });
  }

  render() {
    const { id } = this.props;
    const commentModel = this.commentModel;
    return (
      <div>
        <MuiThemeProvider>
          <Player 
            ref="player" 
            src={`/apis/videos/${id}`} 
            commentModel={commentModel}
          />
          <Comment 
            id={id} 
            now={() =>  this.refs.player.now()}
            commentModel={commentModel}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
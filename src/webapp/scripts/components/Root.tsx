import * as React from "react";
import { Container, Grid } from 'semantic-ui-react';
import { Player } from "./Player";
import { CommentInput } from "./CommentInput";
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
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Player
                ref="player" 
                src={`/apis/videos/${id}`} 
                commentModel={commentModel}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <CommentInput 
                id={id} 
                now={() =>  this.refs.player.currentTime}
                commentModel={commentModel}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
import React, {Component} from 'react';
import pusher from './pusher';

class CharacterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    };
  }

  componentDidMount() {
    if (this.props.room) {
      this._bindToChannel();
    }
  }

  _bindToChannel() {
    const channel = pusher.channel(`presence-room-${this.props.room}`);
    channel.bind('pusher:subscription_succeeded', () => {
      channel.bind('pusher:member_added', () => this._updateMembers(channel));
      channel.bind('pusher:member_removed', () => this._updateMembers(channel));
      this._updateMembers(channel);
    });
  }

  _updateMembers(channel) {
    this.setState({
      players: Object.keys(channel.members.members).map(id => ({ ...channel.members.members[id], id }))
    });
  }

  render() {
    const players = this.state.players.map(player => <div key={player.id}>{player.name}</div>);

    return (
      <div>
        <h5>Characters here</h5>
        {players}
      </div>
    );
  }
}

export default CharacterList;
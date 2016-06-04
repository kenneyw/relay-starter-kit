import React from 'react';
import Relay from 'react-relay';

// Mutations
import ToggleWidgetEnableMutation from '../mutations/ToggleWidgetEnableMutation';

class App extends React.Component {
  _handleToggleEnabled(widget) {
    Relay.Store.commitUpdate(new ToggleWidgetEnableMutation({
      widget
    }));
  }

  render() {
    return (
      <div>
        <h1>Widget list</h1>
        <ul>
          {this.props.viewer.widgets.edges.map(edge =>
            <li key={edge.node.id}>
              {edge.node.name}
              (ID: {edge.node.id})
              (ENABLED: {edge.node.enabled ? <span>True</span> : <span>False</span>})
              <button onClick={this._handleToggleEnabled.bind(this, edge.node)} >
                Toggle
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        widgets(first: 10) {
          edges {
            node {
              id,
              name,
              enabled,
              ${ToggleWidgetEnableMutation.getFragment('widget')},
            },
          },
        },
      }
    `,
  },
});

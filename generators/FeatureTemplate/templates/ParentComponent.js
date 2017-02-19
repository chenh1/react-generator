import React from 'react';
import * as <%=  ActionsName %> from '../../../actions/<%= ActionsName %>';

class <%= ComponentName %> extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};

        //bind component functions' "this" context here
    }

    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            this.setState({

            });
        }
    }

    render() {
        <div>
            New Component: <%= ComponentName %>
        </div>
    }
}

function mapStateToProps(state, ownProps) {
  return {
    //state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(<%=  ActionsName %>, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= ComponentName %>);
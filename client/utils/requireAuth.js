import React from 'react';
import {connect} from 'react-redux';
import {addFlashMessage} from '../actions/flashMessages';

/**
 *
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
 */
export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this
          .props
          .addFlashMessage({
            type: 'error', text: 'You need to login to access this page'});
        this
          .context
          .router
          .push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this
          .context
          .router
          .push('/');
      }
    }

    render() {
      return (<ComposedComponent {...this.props}/>);
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

/**
 *
 *
 * @param {any} state
 * @returns {boolean}
 */
  function mapStateToProps(state) {
    return {isAuthenticated: state.auth.isAuthenticated};
  }

  return connect(mapStateToProps, {addFlashMessage})(Authenticate);
}
import React, { PropTypes } from 'react';
// import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.viewUser = this.viewUser.bind(this);
  }

  viewUser(e) {
    e.preventDefault();
    const userId = e.target.id;
    this.props.actions.setSelectedUser(userId);
    this.props.actions.displaySelectedUser(userId);
  }

  editUser(e) {
    e.preventDefault();
    const userId = e.target.id;
    this.props.actions.setSelectedUser(userId);
    this.props.actions.displaySelectedUser();
  }
  deleteUser(e) {
    e.preventDefault();
    const userId = e.target.id;
    const result = confirm('Do you want to delete this user?');
    if (result) {
      this.props.actions.deleteUser(userId)
      .then(() => toastr.success('Document Successfully Deleted'));
    }
  }

  render() {
    return (
      <div>
      {this
        .props
        .allUsers
        .map(user => <div id="card-alert" className="card white"
        key={user.id}>
          <div className="card-content pink-text">
            {user.name} - {user.email}
          </div>
          <div className="fixed-action-btn horizontal click-to-toggle edit">
            <a className="btn-floating pink tooltipped"
              data-position="top" data-delay="50"
              data-tooltip="click to view more"
              >
              <i className="material-icons">more_vert</i>
            </a>
            <ul>
            <li onClick={this.viewUser} className="editDoc">
              <a
              className="btn-floating pink tooltipped"
              data-position="bottom" data-delay="50"
              data-tooltip="edit document">
                <i id={user.id} className="material-icons">view_list</i>
              </a>
            </li>
              <li onClick={this.editUser} className="editDoc">
                <a
                className="btn-floating pink tooltipped"
                data-position="bottom" data-delay="50"
                data-tooltip="edit document">
                  <i id={user.id} className="material-icons">mode_edit</i>
                </a>
              </li>
              <li onClick={this.deleteUser}>
                <a className="btn-floating red darken-1 tooltipped"
                  data-position="bottom" data-delay="50"
                  data-tooltip="delete document"
                  >
                  <i id={user.id} className="material-icons">delete</i>
                </a>
              </li>
            </ul>
          </div>
        </div>)}
      </div>
    );
  }
}

UserList.propsTypes = {
  actions: PropTypes.object.isRequired
};

/**
 *
 * dispatch role actions
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(UserList);

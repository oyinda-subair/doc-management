import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';

class RoleDocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.renderModal = this.renderModal.bind(this);
  }
  renderModal(e) {
    e.preventDefault();
    const documentId = e.target.id;
    this.props.actions.setCurrentDocument(documentId);
    $('#modal1').modal('open');
  }
  render() {
    return (
      <div>

        {this
          .props
          .roleDocuments
          .map(document => <div id="card-alert" className="card white"
          key={document.id}>
            <div className="card-content pink-text">
              <a className="pointer" id={document.id}
                onClick={this.renderModal}>
              Title: {document.title}
              <span className="badge list-badge">
                Author: {document.User.name}</span>
              </a>
            </div>
            <div className="fixed-action-btn horizontal edit">
              <a className="btn-floating btn-flat pink"
                onClick={this.renderModal}>
                <i id={document.id} className="material-icons">view_list</i>
              </a>
            </div>
          </div>)}
      </div>
    );
  }
}

RoleDocumentList.propTypes = {
  roleDocuments: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

/**
 *
 *
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(RoleDocumentList);

const classNames = require('classnames');
const progress = require('nprogress');
const {Formik, Form, Field} = require('formik');
const React = require('react');
const Modal = require('react-bootstrap/Modal').default;
const utils = require('../../core/utils');
const Base = require('../../core/pages/base');
const api = require('../../core/apis/web-api');
const profileSettingsValidator = require('../validatiors/profile-settings-validator');

module.exports = class Home extends Base {
  constructor(props) {
    super(props);
    this.profileSettingsFormNameInputRef = React.createRef();
    this.state.modal = {
      show: true,
    };
  }

  onSubmitProfileSettingsModalForm = async values => {
    try {
      progress.start();
      await api.profile.updateProfileSettings(values);
      this.setState({
        modal: {
          ...this.state.modal,
          show: false,
        },
      });
    } catch (error) {
      utils.renderError(error);
    }

    progress.done();
  }

  renderProfileSettingsForm = ({errors, submitCount}) => {
    const isSubmitted = submitCount > 0;

    return (
      <Form>
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <Modal.Title as="h4">Type your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Name</label>
            <Field
              innerRef={this.profileSettingsFormNameInputRef} name="name" type="text"
              className={classNames('form-control', {'is-invalid': errors.name && isSubmitted})}/>
            {
              errors.name && isSubmitted && (
                <div className="invalid-feedback d-block">{errors.name}</div>
              )
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            disabled={this.state.$isApiProcessing}
            className="btn btn-outline-primary" type="submit"
          >
            OK
          </button>
        </Modal.Footer>
      </Form>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Modal
              autoFocus={false}
              size="lg"
              show={this.state.modal.show}
              onHide={() => {}}
              onEntered={() => this.profileSettingsFormNameInputRef.current.focus()}
            >
              <Formik
                initialValues={{name: ''}}
                validate={utils.makeFormikValidator(profileSettingsValidator)}
                onSubmit={this.onSubmitProfileSettingsModalForm}
              >
                {this.renderProfileSettingsForm}
              </Formik>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
};

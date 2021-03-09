const classNames = require('classnames');
const PropTypes = require('prop-types');
const progress = require('nprogress');
const {Formik, Form, Field} = require('formik');
const React = require('react');
const Modal = require('react-bootstrap/Modal').default;
const utils = require('../../core/utils');
const Base = require('../../core/pages/base');
const api = require('../../core/apis/web-api');
const profileSettingsValidator = require('../validatiors/profile-settings-validator');
const messageValidator = require('../validatiors/message-validator');
const MessageRow = require('../components/message-row');

module.exports = class Home extends Base {
  static get propTypes() {
    return {
      messages: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
        }).isRequired).isRequired,
      }).isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.profileSettingsFormNameInputRef = React.createRef();
    this.messageContentInputRef = React.createRef();
    this.state.messages = props.messages;
    this.state.modal = {
      show: true,
    };
    this.state.user = null;
  }

  onSubmitProfileSettingsModalForm = async values => {
    this.setState({
      user: {
        ...this.state.user,
        name: values.name,
      },
      modal: {
        ...this.state.modal,
        show: false,
      },
    });
    setTimeout(() => {
      this.messageContentInputRef.current.focus();
    }, 800);
  }

  onSubmitMessageForm = async values => {
    try {
      progress.start();
      await api.message.createMessage({
        ...values,
        author: this.state.user.name,
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
          <button className="btn btn-outline-primary" type="submit">OK</button>
        </Modal.Footer>
      </Form>
    );
  }

  renderMessageInputForm = ({errors, submitCount}) => {
    const isSubmitted = submitCount > 0;

    return (
      <Form>
        <div className="form-group">
          <Field
            innerRef={this.messageContentInputRef} name="content" component="textarea"
            placeholder="Please type your message."
            className={classNames('form-control', {'is-invalid': errors.content && isSubmitted})}/>
        </div>
        <button
          disabled={this.state.$isApiProcessing}
          className="btn btn-outline-primary float-right" type="submit"
        >
          Send
        </button>
      </Form>
    );
  }

  render() {
    const userName = this.state.user && this.state.user.name;
    const messages = this.props.messages.items;

    return (
      <div className="container">
        <div className="row justify-content-md-center pt-3">
          <div className="col-10">
            {
              messages.map(message => (
                <MessageRow key={message.id} amIAuthor={message.author === userName} message={message}/>
              ))
            }

            <div className="pt-2">
              <Formik
                initialValues={{content: ''}}
                validate={utils.makeFormikValidator(messageValidator)}
                onSubmit={this.onSubmitMessageForm}
              >
                {this.renderMessageInputForm}
              </Formik>
            </div>

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

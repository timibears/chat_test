const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const utils = require('../../core/utils');

module.exports = class MessageRow extends React.PureComponent {
  static get propTypes() {
    return {
      amIAuthor: PropTypes.bool.isRequired,
      message: PropTypes.shape({
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: utils.generateDatePropTypes(true),
      }).isRequired,
    };
  }

  render() {
    const {amIAuthor, message} = this.props;

    return (
      <div className={classNames('row pb-3', {'justify-content-end': amIAuthor})}>
        <div className="col-8">
          <div className="card border-secondary">
            <div className="card-header">{message.author}</div>
            <div className="card-body">
              <p className="card-text" style={{whiteSpace: 'pre-wrap'}}>{message.content}</p>
              <p className="card-text">
                <small className="text-muted">{utils.formatDate(message.createdAt)}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

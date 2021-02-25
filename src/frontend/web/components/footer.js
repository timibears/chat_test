const React = require('react');

module.exports = class Footer extends React.Component {
  render() {
    return (
      <footer className="container-fluid py-5">
        <div className="row">
          <div className="col-12">
            <p className="text-light text-center">© 2021 Chat</p>
          </div>
        </div>
      </footer>
    );
  }
};

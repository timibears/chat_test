const React = require('react');
const {RouterView, Link} = require('capybara-router');
const Loading = require('../../../core/components/loading');
const Footer = require('../../components/footer');

module.exports = class Layout extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Chat</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-supported-content">
            <span className="navbar-toggler-icon"/>
          </button>

          <div className="collapse navbar-collapse" id="navbar-supported-content">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
            </ul>
          </div>
        </nav>
        <RouterView><Loading/></RouterView>
        <Footer/>
      </>
    );
  }
};

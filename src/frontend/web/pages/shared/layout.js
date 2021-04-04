const React = require('react');
const {RouterView, Link} = require('capybara-router');
const Loading = require('../../../core/components/loading');
const Footer = require('../../components/footer');

module.exports = class Layout extends React.Component {
  render() {
    const {PORT} = window.config;

    return (
      <>
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Chat at :{PORT}</Link>
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

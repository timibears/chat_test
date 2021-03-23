const React = require('react');
const store = require('../store');
const {IS_API_PROCESSING} = require('../constants').STORE;

module.exports = class Base extends React.Component {
  state = {
    $isApiProcessing: store.get(IS_API_PROCESSING),
  };

  constructor(props) {
    super(props);
    this.$isMounted = false;
    this.$listens = [
      store.subscribe(IS_API_PROCESSING, (_, data) => {
        if (this.$isMounted) {
          this.setState({$isApiProcessing: data});
        } else {
          this.state.$isApiProcessing = data;
        }
      }),
    ];
  }

  componentDidMount() {
    this.$isMounted = true;
  }

  componentWillUnmount() {
    this.$listens.forEach(x => x());
  }
};

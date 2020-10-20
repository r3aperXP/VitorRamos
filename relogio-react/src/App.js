import React from 'react';
import './App.css';
import Cronometro from './Cronometro/Cronometro'
import Relogio from './Relogio/Relogio'
import Temporizador from './Temporizador/Temporizador';
import Abas from './Abas/Abas';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 'relogio'
    }

    this.handleSetActive = this.handleSetActive.bind(this);
  }

  handleSetActive (active) {
    this.setState({ active })
  }

  render () {
    if (this.state.active === 'relogio') {
      return (
        <div className="App">
          <Relogio/>
          <Abas active={this.state.active} handleSetActive={this.handleSetActive}/>
        </div>
      );
    }

    if (this.state.active === 'temporizador') {
      return (
        <div className="App">
          <Temporizador/>
          <Abas active={this.state.active} handleSetActive={this.handleSetActive}/>
        </div>
      );
    }

    if (this.state.active === 'cronometro') {
      return (
        <div className="App">
          <Cronometro/>
          <Abas active={this.state.active} handleSetActive={this.handleSetActive}/>
        </div>
      );
    }
  }  
}

export default App;

import React from 'react';
import './Temporizador.css';

class Temporizador extends React.Component {
  constructor(props) {
    super(props)
    this.horas = this.horas.bind(this);
    this.segundos = this.segundos.bind(this);
    this.minutos = this.minutos.bind(this);

    this.state = {
      horas: 0,
      minutos: 0,
      segundos: 0,
      terminou: false
    };

  }
  //mudança de tempo
  segundos(e) {
    this.setState({ segundos: e.target.value });
  }

  minutos(e) {
    this.setState({ minutos: e.target.value });
  }

  horas(e) {
    this.setState({ horas: e.target.value });
  }

  pararTemp () {
    clearInterval(this.myInterval);
  }

  iniciarTemp() {
    clearInterval(this.myInterval);

    this.myInterval = setInterval(() => {
      const { segundos = 0, minutos = 0, horas = 0 } = this.state;

      if (segundos > 0) {
        this.setState(({ segundos }) => ({
          segundos: segundos - 1,
        }));
      }

      if (segundos === 0 && minutos > 0) {
        this.setState(({ minutos }) => ({
          minutos: minutos - 1,
          segundos: 59,
        }));
      }

      if (segundos === 0) {
        if (minutos === 0) {
          if (horas === 0) {
            this.setState({ terminou: true })
            clearInterval(this.myInterval)
          }
          else {
            this.setState(({ horas }) => ({
              horas: horas - 1,
              minutos: 59,
              segundos: 59,
            }))
          }
        }
      }
    }, 1000);
  }

  zerarTemp() {
    this.setState({ horas: 0, minutos: 0, segundos: 0, acabou: false });
    this.pararTemp();
  }



  render() {
    const { horas, minutos, segundos, terminou } = this.state;

    return (
      <div className="Temporizador">
        <div className="col-center">
          <div className="temporizador">
            <div className="temporizador-text">
              {horas === 0 && minutos === 0 && segundos === 0 ? (
                (terminou ? <h3>Tempo esgotado</h3> : <h6>Temporizador</h6>)
              ) : (
                  <h4>
                    Restando:<br></br>
                    {horas < 10 ? `0${horas}` : horas}:
                    {minutos < 10 ? `0${minutos}` : minutos}:
                    {segundos < 10 ? `0${segundos}` : segundos}
                  </h4>
                )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="countdown-item">
              Horas:
            <input
              type="number"
              placeholder="Horas"
              min="0"
              value={this.state.horas}
              onChange={(event) => this.horas(event)}
            />
          </div>

          <div className="countdown-item">
              Minutos:
            <input
              type="number"
              placeholder="Minutos"
              min="0"
              value={this.state.minutos}
              onChange={(event) => this.minutos(event)}
            />
          </div>

          <div className="countdown-item">
              Segundos:
            <input
              type="number"
              placeholder="Segundos"
              min="0"
              value={this.state.segundos}
              onChange={(event) => this.segundos(event)}
            />
          </div>
        </div>

        <div className="row">
          <button
            className="button-temp"
            type="button"
            onClick={(event) => this.iniciarTemp(event)}
          >
            {!this.myInterval ? 'Iniciar' : 'Continuar'}
          </button>
          <button
            className="button-temp"
            type="button"
            onClick={(event) => this.pararTemp(event)}
          >
            Parar
          </button>
          <button
            className="button-temp"
            type="button"
            onClick={(event) => this.zerarTemp(event)}
          >
            Zerar
          </button>
        </div>
      </div>
    );
  }
}
export default Temporizador;

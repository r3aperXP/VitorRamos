import React from 'react'
import moment from 'moment'
import './Cronometro.css'

class Cronometro extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: null,
      tempo: 0,
      parciais: []
    }
  }

  iniciar() {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }

    const interval = setInterval(() => {
      this.setState({ tempo: this.state.tempo + 1 });
    }, 1000);

    this.setState({ interval });
  }

  parar() {
    clearInterval(this.state.interval)
    this.setState({ interval: null })
  }

  zerar() {
    this.parar()
    this.setState({ tempo: 0, parciais: [] })
  }

  addParcial () {
    const parciais = this.state.parciais.concat([this.state.tempo])

    this.setState({ parciais })
  }

  getTempo (segundos) {
    return moment()
      .startOf('day')
      .seconds(segundos)
      .format('HH:mm:ss')
  }

  getIntervalo (parcial, index) {
    const parcialAntiga = this.state.parciais[index - 1]

    if (parcialAntiga === undefined) return '00:00:00'

    const intervalo = moment(parcial)
      .diff(parcialAntiga)

    return this.getTempo(intervalo)
  }

  render () {
    return (
      <div className="Cronometro">
        <div className="row">
          <div className="col">
            <div className="cronometro-time">
              <div className="cronometro-text">
                <span>{this.getTempo(this.state.tempo)}</span>
              </div>
            </div>

            <div className="row">
              <button
                type="button"
                disabled={this.state.interval}
                onClick={event => this.iniciar(event)}>
                  { this.state.tempo === 0 ? 'Iniciar' : 'Retomar' }
              </button>
              <button
                type="button"
                onClick={event => this.parar(event)}>
                  Parar
              </button>
              <button 
                type="button"
                onClick={event => this.zerar(event)}>
                  Zerar
              </button>
              <button
                type="button"
                onClick={event => this.addParcial(event)}>
                  Parcial
              </button>
            </div>
          </div>

          <div className="col">
            <div className="row row-table">
              <table>
                <thead>
                  <tr>
                    <th>Indíce</th>
                    <th>Tempo</th>
                    <th>Intervalo</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.parciais.map((parcial, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{this.getTempo(parcial)}</td>
                        <td className="interval">{this.getIntervalo(parcial, index)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cronometro;

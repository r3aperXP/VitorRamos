import React from 'react'
import moment from 'moment-timezone'
import './Relogio.css'

class Relogio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timezone: 'America/Bahia',
      zones: moment.tz.zonesForCountry('BR'),
      Horario: moment()
    }

    setInterval(() => {
      this.setState({ Horario: moment() });
    }, 1000);

  }

  Horario() {
    return moment.tz(this.state.Horario, this.state.timezone).format('HH:mm:ss')
  }

  Data() {
    return moment(this.state.Horario).format('DD/MM/YYYY')
  }

  mostrarTimeZone(timezone) {
    this.setState({ timezone })
  }

  render() {
    return (

      <div className="relogio">

        <div className="relogio-text">
          <span className="relogio-data">{this.Data()}</span>
          <span className="relogio-horario">{this.Horario()}</span>
          <span className="relogio-fuso">{this.state.timezone}</span>


          <div className="display display-buttons">
            {this.state.zones.map(zone => {
              return <button
                type="button"
                key={zone}
                onClick={event => this.mostrarTimeZone(zone)}>
                {zone}
              </button>
            })}
          </div>

        </div>
      </div>
    );
  }
}

export default Relogio;

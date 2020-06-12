import React, { Component } from "react";
import InputReadOnly from "./InputReadOnly";
import css from "./salario.module.css";

export default class InputFullSalary extends Component {
  constructor() {
    super();
    this.state = {
      fullSalary: 1000,
    };
  }

  render() {
    return (
      <div className="row">
        <form className="col s12">
          <div className="card blue-grey darken-2">
            <div className="card-content white-text">
              <span className="card-title">React Salário</span>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.fullSalary}
                    placeholder="Salário"
                    id="salario"
                    type="number"
                    className={css.valores}
                    onChange={(e) =>
                      this.setState({ fullSalary: e.target.value })
                    }
                  />
                  <InputReadOnly fullSalary={this.state.fullSalary} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

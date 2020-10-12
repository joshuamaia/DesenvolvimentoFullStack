import React, { useState } from "react";
import Installments from "./Installments";

export default function Form() {
  const [montante, setMontante] = useState(1000);
  const [juros, setJuros] = useState(0.5);
  const [periodo, setPeriodo] = useState(1);

  return (
    <>
      <div className="row">
        <form className="col s12">
          <div className="card blue-grey darken-4">
            <div className="card-content white-text">
              <span className="card-title">React - Juros Compostos</span>

              <div className="row">
                <div className="input-field col s12">
                  <div className="row">
                    <div className="col s4">
                      <label>Montante Inicial:</label>
                      <input
                        style={{
                          color: "#ADD8E6",
                        }}
                        value={montante}
                        id="baseinss"
                        type="number"
                        onChange={(e) => setMontante(e.target.value)}
                      />
                    </div>
                    <div className="col s4">
                      <label>Taxa de Juros Mensal:</label>
                      <input
                        style={{
                          color: "#F0E68C",
                        }}
                        value={juros}
                        id="descontoinss"
                        type="number"
                        onChange={(e) => setJuros(e.target.value)}
                      />
                    </div>
                    <div className="col s4">
                      <label>Período:</label>
                      <input
                        style={{
                          color: "#E6E6FA",
                        }}
                        value={periodo}
                        id="baseirrf"
                        type="number"
                        onChange={(e) => setPeriodo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Installments
                montante={montante}
                juros={juros}
                periodo={periodo}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

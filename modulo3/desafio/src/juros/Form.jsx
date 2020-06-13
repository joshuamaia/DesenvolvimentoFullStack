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
          <div className="card blue-grey darken-2">
            <div className="card-content white-text">
              <span className="card-title">React - Juros Compostos</span>

              <div className="row">
                <div className="input-field col s12">
                  <div className="row">
                    <div className="col s4">
                      <label>Montante Inicial:</label>
                      <input
                        style={{
                          color: "#fff",
                        }}
                        value={montante}
                        id="baseinss"
                        type="text"
                        onChange={(e) => setMontante(e.target.value)}
                      />
                    </div>
                    <div className="col s4">
                      <label>Taxa de Juros Mensal:</label>
                      <input
                        style={{
                          color: "#fff",
                        }}
                        value={juros}
                        id="descontoinss"
                        type="text"
                        onChange={(e) => setJuros(e.target.value)}
                      />
                    </div>
                    <div className="col s4">
                      <label>Período:</label>
                      <input
                        style={{
                          color: "#fff",
                        }}
                        value={periodo}
                        id="baseirrf"
                        type="text"
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

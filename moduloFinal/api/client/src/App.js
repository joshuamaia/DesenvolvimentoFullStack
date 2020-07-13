import React, { useEffect, useState } from 'react';
import api from './service/api';
import moment from 'moment';

export default function App() {

  const [datas, setDatas] = useState([]);
  const [detalhes, setDetalhes] = useState([]);

  useEffect(async () => {
    const response = await api.get('/datas');
    setDatas(response.data);
    console.log(response.data);
    if (response.data.length > 0) {
      const responseDetalhe = await api.get(`porperiodo?period=${response.data[0]}`);
      setDetalhes(responseDetalhe.data);
    }
  }, []);

  console.log(detalhes)

  const handlePeriod = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="container">
        <form>
          <h1 className="center">Controle Financeiro Pessoal</h1>
          <select className="browser-default">
            {datas.map((data) => {
              return <option key={data} onChange={e => handlePeriod(e.target.value)}>{moment(new Date(data)).format("MMM/YYYY")}</option>
            })}
          </select>
          <table>
            <tbody>
              {detalhes.map((valor) => {
                return (
                  <tr key={valor._id}>
                    <td >{valor.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </div>

    </>
  );
}

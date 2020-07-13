import React, { useEffect, useState } from 'react';
import api from './service/api';
import moment from 'moment';

export default function App() {

  const [datas, setDatas] = useState([]);
  const [dataSelect, setDataSelect] = useState('')
  const [detalhes, setDetalhes] = useState([]);
  const [edit, setEdit] = useState(true);

  useEffect(async () => {
    const response = await api.get('/datas');
    setDatas(response.data);
    if (response.data.length > 0) {
      const responseDetalhe = await api.get(`porperiodo?period=${response.data[0]}`);
      setDataSelect(response.data[0]);
      setDetalhes(responseDetalhe.data);
    }
  }, []);

  const handlePeriod = async (data) => {
    const responseDetalhe = await api.get(`porperiodo?period=${data}`);
    setDataSelect(data);
    setDetalhes(responseDetalhe.data);
  };

  const handleInput = async (data) => {
    const responseDetalhe = await api.get(`porperiodo?period=${dataSelect}&filtro=${data}`);
    setDetalhes(responseDetalhe.data);
  };

  const handleDeleteLancamento = async (data) => {
    const transactionDelete = await api.delete(`apagarlancamento/${data._id}`);
    console.log(transactionDelete);
    //const responseDetalhe = await api.get(`porperiodo?period=${data}`);
    const index = detalhes.findIndex(d => d._id === transactionDelete.data._id);

    detalhes.splice(index, 1);

    setDetalhes([...detalhes]);
  };

  const handleEdit = () => {
    setEdit(!edit);
  }

  const lancamentos = detalhes.length;

  let receitas = 0;

  let despesas = 0;

  detalhes.forEach((valor) => {
    if (valor.type === '-') {
      despesas += valor.value;
    } else {
      receitas += valor.value;
    }
  })

  const saldo = receitas - despesas;

  return (
    <>
      <div className="container">
        <form>
          <div className="card blue-grey darken-2">
            <div className="card-content white-text">
              <h1 className="center">Controle Financeiro Pessoal</h1>
              <select className="browser-default" onChange={e => handlePeriod(e.target.value)}>
                {datas.map((data) => {
                  return <option key={data} value={data}>{moment(data).format("MMM/YYYY")}</option>
                  //return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div style={{ marginTop: '10px' }} className="row">
                <button onClick={() => handleEdit()} className="waves-effect waves-light btn col s2" type="button">Adicionar</button><input className="col s10" style={{ color: '#fff' }} type="text" onChange={e => handleInput(e.target.value)} />
              </div>
              <div hidden={edit} className="row">
                <div>
                  <button onClick={() => handleEdit()} className="waves-effect waves-light btn col s2" type="button">Cancelar</button>
                </div>
              </div>
              <div style={{ marginTop: '10px', border: '1px solid', height: '50px', display: 'flex', alignItems: 'center' }} className="row">
                <div style={{ color: '#B0E0E6' }} className="col s3">
                  <strong>Lançamentos: </strong>{lancamentos}
                </div>
                <div style={{ color: '#00FF00' }} className="col s3">
                  <strong>Receitas: </strong>{receitas}
                </div>
                <div style={{ color: '#FFB6C1' }} className="col s3">
                  <strong>Despesas: </strong>{despesas}
                </div>
                <div style={{ color: '#00FFFF' }} className="col s3">
                  <strong>Saldo: </strong>{saldo}
                </div>
              </div>
              <table style={{ marginTop: '5px' }}>
                <tbody>
                  {detalhes.map((valor) => {
                    return (
                      <tr key={valor._id} style={{ background: valor.type === '+' ? '#9ACD32' : '#FF6347', border: '1px solid #fff' }}>
                        <td><strong>{valor.day < 10 ? '0' + valor.day : valor.day}</strong></td>
                        <td><strong>{valor.category}</strong></td>
                        <td>{valor.description}</td>
                        <td > {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          maximumFractionDigits: 2,
                        }).format(valor.value)}</td>
                        <td><button className="waves-effect waves-light btn" style={{ marginRight: '5px' }} type="button">
                          <i className="material-icons">edit</i>
                        </button>
                          <button className="waves-effect waves-light btn" type="button" onClick={() => handleDeleteLancamento(valor)}><i className="material-icons" >delete</i></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>

    </>
  );
}

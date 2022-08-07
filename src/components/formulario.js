import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';


function Formulario() {
  const [id, setId] = useState(1);
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [lista, setLista] = useState([]);
  const [error, setError] = useState('');
  const [fallo, setFallo] = useState(false);
  const [modoedit, setModoEdit] = useState(false);


  const handlerID = (e) => {
    setId(id + 1);
  }

  const handlerNombre = (e) => {
    setNombre(e.target.value);
  }

  const handlerDni = (e) => {
    setDni(e.target.value);
  }

  const agregar = (e) => {
    const numeros = /^[0-9]+$/;
    e.preventDefault();

    if (!nombre.trim()) {
      setFallo(true);
      setError('Escribe un nombre');
      return;
    }

    if (!dni.trim()) {
      setFallo(true);
      setError('Escribe un dni');
      return;
    }

    if (!dni.match(numeros)) {
      setFallo(true);
      setError('El dni tiene que ser numerico');
      return;
    }

    const usuario = {
      //Las propiedades se llaman iguales, son las del hook de arriba
      id: id,
      nombre: nombre,
      dni: dni
    }

    setLista([...lista, usuario]);
    setNombre('');
    setDni('');
    setFallo(false);
    setId(id + 1);
  }

  const borrar = (id) => {
    const filtrado = lista.filter(item => item.id !== id)
    setLista(filtrado);
  }

  const getDatos = (obj) => {
    setId(obj.id);
    setNombre(obj.nombre);
    setDni(obj.dni);
    setModoEdit(true);
  }

  const editar = (e) => {
    e.preventDefault();
    const editado = lista.map(item => item.id === id ? { nombre, dni } : item);
    setLista(editado);
    setModoEdit(false);
    setNombre('');
    setDni('');
  }

  return (
    <div className='row align-items-center'>
      <div className='col-md-6 tabla'>
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th className='text-center'>ID</th> */}
              <th className='text-center'>Nombre</th>
              <th className='text-center'>DNI</th>
              <th className='text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              lista.map(i => (
                <tr key={i.id + 1}>
                  {/* <td className='text-center'>{i.id}</td> */}
                  <td className='text-center'>{i.nombre}</td>
                  <td className='text-center'>{i.dni}</td>
                  <td className='text-center'>
                    <button onClick={() => { getDatos(i) }} className='btn btn-warning text-light'>Editar</button>
                    <button onClick={() => { borrar(i.id) }} className='btn btn-danger text-light mx-2'>Borrar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
      <div className='col-md-6'>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type='hidden' onChange={handlerID}  value={id} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" onChange={handlerNombre} placeholder="Ingrese su nombre" value={nombre} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Documento</Form.Label>
            <Form.Control type="text" onChange={handlerDni} placeholder="Ingrese su DNI" value={dni} />
          </Form.Group>
          {
            modoedit ? (
              <Button onClick={(e) => { editar(e) }} variant="primary w-100" type="submit">
                Editar
              </Button>
            ) : (
              <Button onClick={agregar} variant="primary w-100" type="submit">
                Agregar
              </Button>
            )
          }

        </Form>
        <br></br>
        {
          fallo ? (
            <p className='bg-danger text-light w-100 text-center font-weight-bold text-uppercase py-1'>{error}</p>
          ) : ''
        }
      </div>
    </div>
  )
}

export default Formulario;
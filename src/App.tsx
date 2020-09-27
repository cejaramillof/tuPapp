import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { appendSpreadsheet } from './google';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

function App() {
  const [send, setSend] = useState(false);
  const { register, handleSubmit, reset, errors } = useForm();
  const onSubmit = async (data: any) => {
    setSend(true);
    await appendSpreadsheet({...data.personal});
    reset();
    setSend(false);
  };

  return (
    <div className="ui container centered" style={{ padding: '1.5em 0' }}>
      <div className="ui piled segment">
        <figure className="ui header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0' }}>
          <h4 style={{ display: 'inline-block', fontSize: '1.5em', fontWeight: 'bolder', margin: '0' }}>¡Bienvenid@s!</h4>
          <img style={{ width: '4.5em', margin: '0' }} src="https://i.imgur.com/gXOFb8W.png" />
        </figure>
        <p style={{ marginBottom: '2em' }}>Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia facete scriptorem, est autem aliquip detraxit at. Usu ocurreret referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei ex natum rebum iisque.</p>
        <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
          <h4 className="ui dividing header">Información Personal</h4>
          <div className="two fields">
              <div className={`field ${errors?.personal?.Nombre && 'error'} `}>
                <label>Nombre</label>
                <input type="text" name="personal[Nombre]" placeholder="José" ref={register({ required: true, maxLength: 20 })} />
              </div>
              <div className="ui error message">
                <div className="header">Action Forbidden</div>
                <p>You can only sign up for an account once with a given e-mail address.</p>
              </div>
              <div className={`field ${errors?.personal?.Apellido && 'error'} `}>
                <label>Apellido</label>
                <input type="text" name="personal[Apellido]" placeholder="Perez" ref={register({ required: true, pattern: /^[A-Za-z]+$/i })} />
            </div>
          </div>
          <div className="two fields">
            <div className="four wide field">
              <label>Edad</label>
              <input type="number" name="personal[Edad]" min={18} max={99} maxLength={2} placeholder="30"  ref={register({ min: 18, max: 99 })} />
            </div>
            <div className="twelve wide field">
              <label>Ocupación</label>
              <input type="text" name="personal[Ocupacion]" placeholder="Ingeniero Electrico" ref={register}/>
            </div>
          </div>
          <input type="submit" className="fluid ui yellow button centered" disabled={send} tabIndex={0} value="Solicitar"/>
        </form>
      </div>
    </div>
  );
}

export default App;

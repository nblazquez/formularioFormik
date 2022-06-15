import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
  
interface MyFormValues {
    nombre: string;
    correo: string
}

const Formulario = () => {
  const initialValues: MyFormValues = { 
      nombre: '',
      correo: ''
  };

  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(valores, {resetForm}) => {
          resetForm();
          console.log("Formulario enviado");
          console.log(valores);
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 5000);
        }}
        validate={(valores) => {
          //Tipo 'any' para poder añadirle propiedades según sea necesario
          let errores : any = {};

          //Validación NOMBRE
          if(!valores.nombre){
            errores.nombre = 'Por favor, introduce un nombre';
          } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
            errores.nombre = 'El nombre solo puede contener letras y espacios';
          }

          //Validación CORREO
          if(!valores.correo){
            errores.correo = 'Por favor, introduce un correo electrónico';
          } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
            errores.correo = 'El correo solo puede contener letras, números puntos y guiones bajos';
          }
          
          return errores;
        }}
      >
        {({errors, touched}) => (
          <Form className="formulario">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                placeholder="John Doe"
              />
              {touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
            </div>
            <div>
              <label htmlFor="correo">Correo</label>
              <Field
                type="email"
                id="correo"
                name="correo"
                placeholder="correo@correo.com"
              />
              {touched.correo && errors.correo && <div className='error'>{errors.correo}</div>}
            </div>
            <div>
              <label htmlFor="pais">País</label>
              <Field name="pais" as="select">
                <option value="es">España</option>
                <option value="en">Inglaterra</option>
                <option value="po">Portugal</option>
              </Field>
            </div>
            <div>
              <Field name="sexo" id="h" type="radio" value='h'/>
              <label htmlFor="h">Hombre</label>
              <Field name="sexo" id="m" type="radio" value='m'/>
              <label htmlFor="m">Mujer</label>
            </div>
            <div>
              <Field name='mensaje' as='textarea' placeholder='Mensaje' />
            </div>
            <button type="submit">Enviar</button>
            {formularioEnviado && <p className='exito'>Formulario enviado con éxito</p>}
          </Form>
        )}

        {/*({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <form 
            className="formulario"
            onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="John Doe"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
            </div>
            <div>
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="correo@correo.com"
                value={values.correo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.correo && errors.correo && <div className='error'>{errors.correo}</div>}
            </div>
            <button type="submit">Enviar</button>
            {formularioEnviado && <p className='exito'>Formulario enviado con éxito</p>}
          </form>
        )*/}
      </Formik>
    </>
  );
};

export default Formulario;

export default function validate(input) {
    let errors = {};
    if(!input.nombre) {
        errors.nombre = "Campo Requerido"
    }
    if(!input.email) {
        errors.email = "Campo Requerido"
    }
    if(!input.tel) {
        errors.tel = "Campo Requerido"
    }
    if(!input.asunto) {
        errors.asunto = "Campo Requerido"
    }
    if(!input.mensaje) {
        errors.mensaje = "Campo Requerido"
    }
    return errors;
  };
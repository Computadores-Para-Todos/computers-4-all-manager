import { useState, useEffect } from 'react';

/**
 * @typedef {Function} ValueSetter - Função utilizada para atualizar um valor da lista de valores
 */
/**
 * @typedef {Function} HandleSubmit - Função que deve ser utilizada no handleSubmit do form
 */
/**
 * @typedef {[string]} ValueList - Lista de valores
 */
/**
 * @typedef {[string]} ErrorList - Lista de erros de validação
 */

/**
 * Hook para definir forms com estados e validação de campos através de um schema
 *
 * @param {Function} callback - Função que será chamada ao submeter o formulário com todos os dados válidos
 * @param {object} schema - Schema que validará o formulario.
 *
 * @returns {[ValueSetter, HandleSubmit, ValueList, ErrorList]} -
 */
function useForm(callback, schema) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmiting, setIsSubmting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmiting) {
      setIsSubmting(false);
      callback(values);
    }
  }, [errors, isSubmiting, callback, values]);

  const validateSchema = values => {
    let errors = {};
    try {
      schema.validateSync(values, { abortEarly: false });
    } catch (err) {
      errors = err.inner.reduce(
        (acc, e) => ({
          ...acc,
          [e.path]: e.message
        }),
        errors
      );
    }
    return errors;
  };

  const handleSubmit = async event => {
    if (event) event.preventDefault();
    setErrors(await validateSchema(values, schema));
    setIsSubmting(true);
  };

  const setValue = (name, value) => {
    setValues(values => ({ ...values, [name]: value }));
  };

  return [setValue, handleSubmit, values, errors];
}

export default useForm;

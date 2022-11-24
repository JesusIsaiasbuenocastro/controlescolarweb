const useValidaciones = (email) => {
    const validarEmail  = () => {
        return /\S+@\S+\.\S+/.test(email);
    }

    //Crear un metodo para validacion de telefono 
    return[validarEmail]
}
 
export default useValidaciones;
const expReg = /^\s*{(\s*[a-z0-9](\s*,\s*[a-z0-9])*)?\s*}\s*$/;

export const validarCinta = ({el,setEl}) => { //valida que el contenido de la cinta sea válido
    if(el.target.value === null || el.target.value === ""){
        document.getElementById("msg-"+el.target.id).textContent = "Este campo es requerido"
    }else if (expReg.test(el.target.value)) {
        setEl(el.target.value)
        document.getElementById("msg-"+el.target.id).textContent = ""
    }else{
        setEl("")
        document.getElementById("msg-"+el.target.id).textContent = "No cumple con la notación extensiva de conjuntos"
    }
}
// Esta es la funcion que se usara en el Submit handler del formulario Contacto


export const sendContactForm = async (data) => 
    fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })

export const sendShopForm = async (data) => {
    fetch("/api/comprar", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
}
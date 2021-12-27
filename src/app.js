const btnBuscar = document.querySelector('button')
const ciudad = document.querySelector('#ciudad')
const pais = document.querySelector('#pais')
const mensajeError = document.querySelector('.mensaje')
const apiId = '8be5e50885dfc73412dcdac25be249f9'
const contenedor = document.querySelector('.scripting')

btnBuscar.addEventListener('click', (e)=>{
    e.preventDefault()
    if (verificacion()) {
        //Recordar colocar el HTTPS ya que desde local se ocupa para direccionar
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad.value}&appid=${apiId}`)
        .then( respuesta => {
            const datos = respuesta.json()
            .then(datos => {
                const tempKelvin = datos.main.temp
                const tempCelcius = tempKelvin - 273.15
                render(tempCelcius.toFixed())
                
            })
            .catch((error)=>{
                alert(`La ciudad ${ciudad.value} al parecer no existe`)
            })
        })
    } 
})

function verificacion() {
    if (ciudad.value != '') {
        return true
    } else {
        mensajeDeError()
    }
}

function mensajeDeError() {
    const pError = `
    <div class="alert alert-danger" role="alert">
    Debes ingresar una ciudad!
    </div>
    `;
    mensajeError.innerHTML = pError
    setTimeout(() => {
        mensajeError.innerHTML = ''
    }, 3000);
}

function render(temperatura) {
    contenedor.innerHTML = ''
    const fecha = new Date()
    const dia = fecha.getDay()
    const mes = fecha.getMonth() + 1
    const html = `
    <div class="card text-center">
        <div class="card-header">
            Temperatura
        </div>
            <div class="card-body">
            <h5 class="card-title">${ciudad.value}</h5>
            <p class="card-text">La temperatura es de <span class="celsius">${temperatura}</span> grados celsius</p>
            
        </div>
        <div class="card-footer text-muted">
           Fecha ${fecha}
        </div>
    </div>
    `
    contenedor.innerHTML = html
}


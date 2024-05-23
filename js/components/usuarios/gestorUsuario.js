import Servicios from './servicios.js';
class GestorUsuarios {
    constructor() {
        this.servicios = new Servicios();
        //todas las variables que deben inicializarse
        this.token = '';
        this.usuarios = []; 
        //LOS USUARIOS DE LA FUNCION GESTORUSUARIOS
        this.init();
    }
    login() {
        const usuario = $('#user').val();
        const contrasena = $('#pass').val();
        /*  
            call(error, succss) {
                if (error) { .. }
                else { .. }
            }
            this.servicios.autenticar(usuario, contrasena, call){

            }
        */
        this.servicios.autenticar(usuario, contrasena, (error, response) => {
            if (error) {
                alert('Usuario o contraseña incorrectos');
            } else {
                //this.usuarios.push(response.usuario);
                //agrega un campo al array
                console.log(response);
                if (response.status == 200) {
                    alert('¡QUE EMPIEZA LA PELEA!');
                    this.token = response.token;
                    this.cleanMain();
                    this.mostrarUsuarios(this.token);
                }
            }
        });
    }
    mostrarUsuarios(token) {
        this.servicios.obtenerUsuarios(token, (error, response) => {
            if (error) {
                console.error('Error al obtener usuarios:', error);
            } else {
                console.log(response);
                this.renderizarUsuarios(response);
            }
        });
    }
    cleanMain() {
        $("#mainlogin").html("");
    }


    renderizarUsuarios(data) {
        for (let i = 0; i < data.length; i += 2) {
            const pairDiv = $('<div class="entrenador-pair"></div>');
    
            // Renderizar primer entrenador del par
            if (i < data.length) {
                const entrenador1 = data[i];
                const entrenadorDiv1 = this.crearEntrenadorDiv(entrenador1);
                pairDiv.append(entrenadorDiv1);
            }
    
            // Insertar "vs" entre los entrenadores del par
            if (i + 1 < data.length) {
                const vsDiv = $('<center><div class="vs-franja">VS</div></center>');
                pairDiv.append(vsDiv);
    
                // Renderizar segundo entrenador del par
                const entrenador2 = data[i + 1];
                const entrenadorDiv2 = this.crearEntrenadorDiv(entrenador2);
                pairDiv.append(entrenadorDiv2);
            }
    
            $('#mainlogin').append(pairDiv);
        }
    }
    
    crearEntrenadorDiv(entrenador) {
        const entrenadorDiv = $('<div class="entrenador"></div>');
        entrenadorDiv.append(`<div class="nombre-entrenador">${entrenador.entrenador}</div>`);
        
        const pokemonsDiv = $('<div class="pokemons"></div>');
        entrenador.pokemons.forEach(pokemon => {
            const pokemonDiv = $(`<div class="pokemon ${pokemon.tipo}"></div>`);
    
            pokemonDiv.append(`<div class="nombre-pokemon">${pokemon.nombre}</div>`);
            pokemonDiv.append(`<div class="tipo-pokemon">${pokemon.tipo}</div>`);
            pokemonDiv.append(`<img src="${pokemon.foto}" alt="${pokemon.nombre}" class="foto-pokemon">`);
    
            pokemonsDiv.append(pokemonDiv);
        });
        
        entrenadorDiv.append(pokemonsDiv);
        return entrenadorDiv;
    }
    
    



    renderLogin() {
        const templatelogin = `<div class="inputLogin">
            <div class="input">
            <label>BATALLA POKEMON</label>
             <br>
            <div class="input">
                <button type="submit" class="btn" id="btLogin">EMPEZAR PELEA</button>
            </div>
        </div>`;
        $("#mainlogin").append(templatelogin);
    }
    // funciones para IMPRIMIR vistas
    render() {
        this.renderLogin();
    }
    init() {
        this.render();
        //otras funcionalidades
        $('#btLogin').on('click', () => {
            this.login();
        });
    }
}

export default GestorUsuarios;
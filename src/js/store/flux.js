import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			details: [],
			Planets: [],

			favoritos: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			characters: []
			,

			vehiculos: [],

			autenticar: false

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
// mi funcion para login
			login: async (email, password) => {
				try {
					let data = await axios.post("https://miniature-spork-55w547rxwrh46xq-3000.app.github.dev/login", {   //acá uno con el back
						"email": email,
						"password": password

					})
					console.log(data);     //me muestra data en la consola es donde está guardado el token ahora remplazo data por
					// //guardamos el token en el navegador en un espacio de memoria para usarlo cuando lo necesite
					localStorage.setItem("token", data.data.access_token);
					setStore({ autenticar: true })



					return true;

				} catch (error) {
					console.log(error);
					if (error.response.status === 404) {
						alert(error.response.data.msg)
					}


					return false;

				}
			},
// mi funcion para validar token
			validoToken: async () => {
				let token = localStorage.getItem("token")
				try {
					let data = await axios.get("https://miniature-spork-55w547rxwrh46xq-3000.app.github.dev/valid_token", {   //acá uno con el back
						headers: { 'Authorization': 'Bearer ' + token }

					})
					console.log(data);     //me muestra data en la consola es donde está guardado el token
					setStore({ autenticar: true })
					// //guardamos el token en el navegador en un espacio de memoria para usarlo cuando lo necesite
					// localStorage.setItem("token", data.data.access_token);

					return true;

				} catch (error) {
					console.log(error);
					if (error.response.status === 401) {
						setStore({ autenticar: false })
						alert(error.response.data.msg)
					}
					return false;

				}
			},
// mostrar los favoritos del usuario
			mostrarfavoritos: async () => {
				let token = localStorage.getItem("token")
				try {
					let data = await axios.get("https://miniature-spork-55w547rxwrh46xq-3000.app.github.dev/usuario/favorito", {   //acá uno con el back
						headers: { 'Authorization': 'Bearer ' + token }

					})
				
			setStore({ favoritos: data.data.results });
			return true;
				} catch (error) {
				console.log(error);
				
				return false;

			}
		},

// mi funcion logout
			LogOut: async () => {
				localStorage.removeItem("token")
				setStore({ autenticar: false })
			},



//mi funcion para signup
			signup: async (email, password) => {
				try {
					let data = await axios.post("https://miniature-spork-55w547rxwrh46xq-3000.app.github.dev/signup", {   //acá uno con el back
						"email": email,
						"password": password

					})
					     //me muestra data en la consola es donde está guardado el token ahora remplazo data por
					// //guardamos el token en el navegador en un espacio de memoria para usarlo cuando lo necesite
					// localStorage.setItem("token", data.data.access_token);

					return true;

				} catch (error) {
					console.log(error);
					if (error.response.status === 404) {
						alert(error.response.data.msg)
					}


					return false;

				}
			},

			loadSomeData: () => {

			},

			obtenerVehiculos: async () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				try {
					let response = await fetch("https://swapi.dev/api/vehicles", {
						method: "GET"
					});

					let data = await response.json();
					
					setStore({ vehiculos: data.results });


				} catch (error) {
					console.log(error)
				}

			},
			obtenerPersonajes: async () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/

				try {
					let response = await fetch("https://swapi.dev/api/people"); //especificamos la url donde vamos a buscar info
					let data = await response.json()
					
					setStore({ characters: data.results })

				} catch (error) {
					console.log(error)

				}
			},
			obtenerplanetas: async function () {
				//accion, funcion que puedo volver a utilizar cuando quiera
				try {
					let response = await fetch("https://swapi.dev/api/planets"); //esto me regresa una respuesta, que la guerdo en un espacio de memoira
					//le digo que espere por esa respuesta
					let data = await response.json(); //le digo que convierta esa respuesta en un jason y lo guardo en un espacio de memoira y que espere por la convercion de esa respuesta
					
					setStore({ Planets: data.results }); //({propiedad:el valor que quiero actuaizar})
				} catch (error) {
					console.log(error);
				}
			},
			agregarFavorito: (name) => {


				setStore({ favoritos: [...getStore().favoritos, name] });



			},
			eliminarFavorito: (name) => {
				const arr = getStore().favoritos.filter((name2) =>
					name2 !== name)
				setStore({ favoritos: arr });

			},
			getDetails: async (type, id) => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/

				if (type !== "characters") {
					const data = await fetch("https://swapi.dev/api/" + type + "/" + id);
					const response = await data.json();
					setStore({ details: response })
				} else {
					const data = await fetch("https://swapi.dev/api/people/" + id);
					const response = await data.json();
					setStore({ details: response })
				}



			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
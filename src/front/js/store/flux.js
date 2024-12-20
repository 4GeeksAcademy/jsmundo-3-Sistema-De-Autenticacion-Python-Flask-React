const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isAuthenticated: false,
			message: null,
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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			login: async (email, password, navigate) => {
				try{
					const response = await fetch(process.env.BACKEND_URL + '/api/login',{
						method: "POST",
						headers:{
							"Content-Type":"application/json"
						},
						body: JSON.stringify({
							email:email,
							password:password
						})
					})
					const data = await response.json()
					console.log(email);
					if (response.status === 200){
						console.log(data.token);
						setStore({isAuthenticated: true, message: null})
						localStorage.setItem("token", data.token);
						navigate("/privatepage");
						console.log(data);
						return true;
					}else if (response.status === 404) {
						
						return true;
					}else{
						const errorData = await response.json();
						setStore({message: errorData.message, isAuthenticated: false});
						return false;
					}
				}catch(error){
					console.log(error);
					setStore({message:"Error de conexion al servidor",isAuthenticated: false});
					return false;	
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({isAuthenticated: false});
			},

			registro: async ( email, password,) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/registro',{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({email, password})
					});
					//respuesta backend
					if(response.ok) {
						const data = await response.json();
						setStore({message: data.message});
						console.log("Usuario resgistrado exitosamente:", data.message);
						
						return true;
					}else{
						const errorData = await response.json();
						console.error("Error al registrar:", errorData.message);
						return false;
					}
				} catch (error){
					console.error("Error de red:", error);
					setStore({message:"Error de conexion al servidor"});
					return false;
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

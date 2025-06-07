import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useState, useEffect } from "react"

const URL = "https://hzbcddvh-5000.usw3.devtunnels.ms/clients"


export const ClientView = () => {
  const [clients, setClients] = useState([])
  const [searchName, setSearchName] = useState("")
  const [searchPhone, setSearchPhone] = useState("")

  const navigate = useNavigation()

  //Funcion para obtener los clientes ya sea por nombre o numero 
  const fetchClients = async () => {
    try {
      let response;
      //Valida que en el input no tenga espacios en blaco. El trim() elimina estos espacios
      if (searchPhone.trim()) {
        //El params es para enviar un parametro para comparar, este es el numero ingresado por el usuario
        response = await axios.get(`${URL}/search/phone`, { params: { phone: searchPhone } })
        if (response.status === 200 && response.data) {
          setClients([response.data])
        }
      } else {
        response = await axios.get(`${URL}/search/name`, { params: { name: searchName } })
        if (response.status === 200) {
          setClients(response.data)
        }
      }
    } catch (error) {
      console.log("Error al obtener clientes:", error)
    }
  }

  // El primer valor (fetchClients) es el que se ejecutara en caso de que se cumpla el segundo  valor:  [searchName, searchPhone])
  //Es decir, si se cambia algo de searchName o searchPhone entonces se ejecuta fetchClients para re renderizar
  useEffect(() => {
    fetchClients()
  }, [searchName, searchPhone])

  //Solicita el id del cliente como paametro para poder eliminarlo
  const deleteClient = async (id) => {
    try {
      const response = await axios.delete(`${URL}/delete/${id}`)
      if (response.status === 200) {
        setClients(clients.filter(client => client.id !== id))
      }
    } catch (error) {
      console.log("Error al eliminar el cliente:", error)
    }
  }

  return (
    <ScrollView>
      <View>
        <Text>Gestión de Clientes</Text>
        <TextInput
          name="searchName"
          id="searchName"
          placeholder="Buscar por nombre"
          value={searchName}
          // Evita el conflicto entre la búsqueda por nombre y teléfono
          onChangeText={(text) => { setSearchName(text); setSearchPhone(""); }}
          style={{ borderWidth: 1, padding: 5, marginVertical: 10 }}
        />
        <TextInput
          name="setSearchPhone"
          id="setSearchPhone"
          placeholder="Buscar por número de teléfono"
          value={searchPhone}
          onChangeText={(text) => { setSearchPhone(text); setSearchName(""); }}
          style={{ borderWidth: 1, padding: 5, marginVertical: 10 }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#007BFF',
            padding: 15,
            borderRadius: 5,
            marginVertical: 10,
            alignItems: 'center',
          }}
          onPress={() => navigate.navigate("ClientCreate")}
        >

          <Text style={{ color: 'white', fontSize: 16 }}>Agregar un cliente</Text>

        </TouchableOpacity>
      </View>

      {clients.map((client) => (
        <View key={client.id} style={{ marginVertical: 10 }}>
          <Text>{client.name} - {client.phone_number}</Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#4CAF50',
              padding: 10,
              borderRadius: 5,
              marginBottom: 5
            }}
            onPress={() => navigate.navigate("ClientUpdate", { client })}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Actualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#F44336',
              padding: 10,
              borderRadius: 5
            }}
            onPress={() => deleteClient(client.id)}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}


    </ScrollView>
  );
};

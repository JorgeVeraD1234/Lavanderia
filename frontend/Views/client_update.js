import { TouchableOpacity, View, TextInput, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";


const URL = "https://hzbcddvh-5000.usw3.devtunnels.ms/clients";

//El route toma los valores del client view, es decir, el cliente que se eligio y los trae
export const ClientUpdate = ({ route }) => {
    // Aqui se declara una variable client que su "valor" son los parametros del route, en este caso el client que se paso desde el mapeo
    const { client } = route.params;
    const [name, setName] = useState(client.name);
    const [phoneNumber, setPhoneNumber] = useState(client.phone_number);


    const navigate = useNavigation();

    const onPressUpdate = async () => {
        try {
            const response = await axios.put(`${URL}/update/${client.id}`, { name, phone_number: phoneNumber });
            if (response.status === 200) {
                alert("Cliente actualizado correctamente.");
                navigate.navigate("ClientView")
            } else {
                alert("No se pudo actualizar la información.");
            }
        } catch (error) {
            console.log("Error al actualizar cliente:", error);
        }
    }

    return (
        <View>
            <TextInput
                placeholder="Nuevo nombre"
                value={name}
                onChangeText={(text) => setName(text)}
                style={{ borderWidth: 1, padding: 5, marginVertical: 5 }}
            />
            <TextInput
                placeholder="Nuevo teléfono"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                style={{ borderWidth: 1, padding: 5, marginVertical: 5 }}
            />

            <TouchableOpacity onPress={(onPressUpdate)} style={{ width: 100, padding: 5, backgroundColor: "black", borderRadius: 5 }}>
                <Text style={{ color: "white", textAlign: "center" }}>Actualizar</Text>
            </TouchableOpacity>

        </View>
    )
}

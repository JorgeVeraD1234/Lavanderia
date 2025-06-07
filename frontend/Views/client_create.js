import { TouchableOpacity, View, Text, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";


const URL = "https://hzbcddvh-5000.usw3.devtunnels.ms/clients";


export const ClientCreate = () => {
    const [data, setData] = useState({
        name: "",
        phone_number: "",
        address: "",
    });

    const navigate = useNavigation();

    const onChange = (key, value) => {
        setData({ ...data, [key]: value });
    };

    const onPressCreate = async () => {
        try {
            const response = await axios.post(`${URL}/create`, data);
            if (response.status === 200) {
                alert("Cliente creado con exito")
                console.log("Cliente creado con exito")
                navigate.navigate("ClientView")
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View>
            <Text>Crear Nuevo Cliente</Text>

            <Text>Nombre:</Text>
            <TextInput
                name="name"
                id="name"
                style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
                placeholder="Introduce el nombre"
                value={data.name}
                onChangeText={(value) => onChange("name", value)}
            />

            <Text>Teléfono:</Text>
            <TextInput
                name="phone_number"
                id="phone_number"
                style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
                placeholder="Introduce el teléfono"
                value={data.phone_number}
                onChangeText={(value) => onChange("phone_number", value)}
            />

            <Text>Dirección:</Text>
            <TextInput
                name="address"
                id="address"
                style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
                placeholder="Introduce la dirección"
                value={data.address}
                onChangeText={(value) => onChange("address", value)}
            />

            <TouchableOpacity onPress={(onPressCreate)} style={{ width: 100, padding: 5, backgroundColor: "black", borderRadius: 5 }}>
                <Text style={{ color: "white", textAlign: "center" }}>Crear Cliente</Text>
            </TouchableOpacity>
        </View>
    );
};

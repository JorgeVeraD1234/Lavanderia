import { Button, View, Text, TextInput, Alert, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useState } from "react"

const URL = "https://hzbcddvh-5000.usw3.devtunnels.ms/users/register"


export const UserRegister = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        rol: "",
        password: ""
    })

    const navigation = useNavigation()

    const onChange = (key, value) => {
        setData({ ...data, [key]: value })
    }

    const onPressRegister = async () => {
        try {
            const response = await axios.post(URL, data)

            if (response.status === 201) {
                alert("Usuario registrado.")
                navigation.navigate("Login")
            } else {
                alert("Usuario registrado.")
                console.log("Ha ocurrrido un error al registrar.")
            }
        } catch (error) {
            console.log("Error en registro:", error)
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <Text>Registro de Usuario</Text>

            <Text>Nombre:</Text>
            <TextInput
                name="name"
                id="name"
                style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
                placeholder="Introduce tu nombre"
                value={data.name}
                onChangeText={(value) => onChange("name", value)}
            />

            <Text>Email:</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
                name="email"
                id="email"
                placeholder="Introduce tu email"
                value={data.email}
                onChangeText={(value) => onChange("email", value)}
            />

            <Text>Rol:</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
                name="rol"
                id="rol"
                placeholder="Ejemplo: admin o client"
                value={data.rol}
                onChangeText={(value) => onChange("rol", value)}
            />

            <Text>Contraseña:</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
                name="password"
                id="password"
                placeholder="Introduce tu password"
                secureTextEntry={true}
                value={data.password}
                onChangeText={(value) => onChange("password", value)}
            />


            <TouchableOpacity onPress={(onPressRegister)} style={{ width: 100, padding: 5, backgroundColor: "black", borderRadius: 5 }}>
                <Text style={{ color: "white", textAlign: "center" }}>Finalizar</Text>
            </TouchableOpacity>

        </View>
    );
};

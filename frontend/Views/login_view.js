
import { Button, View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";

export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const onChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const navigate = useNavigation();

  const onPressLogin = async () => {
    try {
      const response = await axios.post("https://hzbcddvh-5000.usw3.devtunnels.ms/users/login", data);
      if (response.status === 200) {
        alert("Inicio de sesión correcto.");
        navigate.navigate("UserView");
      } else {
        console.log("Credenciales incorrectas.");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View>
      <View>
        <Text>Vista Login</Text>
      </View>

      <Text>Email:</Text>
      <TextInput
        name="email"
        id="email"
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
        placeholder="Introduce tu email"
        value={data.email}
        onChangeText={(value) => onChange("email", value)}
      />

      <Text>Contraseña:</Text>
      <TextInput
        name="password"
        id="password"
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
        placeholder="Introduce tu contraseña"
        secureTextEntry={true}
        value={data.password}
        onChangeText={(value) => onChange("password", value)}
      />

      <TouchableOpacity onPress={onPressLogin} style={{ width: 100, padding: 5, backgroundColor: "gray", borderRadius: 5 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate.navigate("UserRegister")} style={{ width: 100, padding: 5, backgroundColor: "black", borderRadius: 5 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

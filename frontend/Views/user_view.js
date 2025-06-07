import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import axios from "axios";

const UserId = 108;
const URL = "https://hzbcddvh-5000.usw3.devtunnels.ms/users";

export const UserView = () => {
    const navigation = useNavigation();

    const onPressLogout = async () => {
        try {
            await axios.post(`${URL}/logout/${UserId}`);
            navigation.navigate("Login");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <View>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", backgroundColor: "gray" }}>


                    <TouchableOpacity
                        style={{ padding: 10, margin: 5, borderRadius: 5 }}
                        onPress={onPressLogout}>
                        <Text style={{ fontSize: 14 }}>Salir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ padding: 10, margin: 5, borderRadius: 5 }}
                        onPress={() => navigation.navigate("ClientView")}>
                        <Text style={{ fontSize: 14 }}>Ver Clientes</Text>
                    </TouchableOpacity>


                </View>
            </View>

            <View>
                <Text>Esta es la vista del usuario</Text>
            </View>
        </View>
    );
};


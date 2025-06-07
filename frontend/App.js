import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { UserView } from "./Views/user_view";
import { UserRegister } from "./Views/user_register";
import { Login } from "./Views/login_view";
import { ClientView } from "./Views/client_view";
import { ClientUpdate } from "./Views/client_update";
import { ClientCreate } from "./Views/client_create";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserRegister" component={UserRegister} />
        <Stack.Screen name="UserView" component={UserView} />
        <Stack.Screen name="ClientView" component={ClientView} />
        <Stack.Screen name="ClientUpdate" component={ClientUpdate} />
        <Stack.Screen name="ClientCreate" component={ClientCreate} />




      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

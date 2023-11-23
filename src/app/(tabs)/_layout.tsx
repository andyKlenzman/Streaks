
import { Provider } from "react-redux";
import { store } from "../../store/store";
import Tabs from "expo-router/tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

const TabsLayout = () => {
    return (
   <Provider store={store}>
    <Tabs screenOptions={{ headerShown: false }}>
    <SafeAreaView>
    <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          tabBarLabel: "Create",
          title: "Create",
          tabBarIcon: () => (
            <FontAwesome
              size={28}
              style={{ marginBottom: -3 }}
              name="plus"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          title: "Home",
          tabBarIcon: () => (
            <FontAwesome
              size={28}
              style={{ marginBottom: -3 }}
              name="star"
            />
          ),
        }}
        
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          tabBarLabel: "History",
          title: "History",
          tabBarIcon: () => (
            <FontAwesome
              size={28}
              style={{ marginBottom: -3 }}
              name="book"
            />
          ),
        }}
      />
      </SafeAreaView>
    </Tabs>
    
  </Provider>
       
  )
     
}
export default TabsLayout
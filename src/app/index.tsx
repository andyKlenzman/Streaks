import { Text } from "react-native"
import { Redirect } from "expo-router"
import { SafeAreaView } from "react-native"
import { Provider } from "react-redux"
import { store } from "../store/store"
const HomeLayout = () => {
    return (

      <SafeAreaView>
      <Redirect href={"/(tabs)/home"} />
      </SafeAreaView>

  )
     
}
export default HomeLayout
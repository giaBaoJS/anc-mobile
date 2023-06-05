import React from "react";
import { RouteProp } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ApiKeyCodeScreen from "../../screens/apiKeyCode";


export type ApiKeyCodeStackParamList = {
	ApiKeyCodeScreen: undefined;
}

export type ApiKeyCodeStackRouteProps<
	RouteName extends keyof ApiKeyCodeStackParamList
> = RouteProp<ApiKeyCodeStackParamList, RouteName>

const Stack = createNativeStackNavigator<ApiKeyCodeStackParamList>();

const ApiKeyCodeStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="ApiKeyCodeScreen" component={ApiKeyCodeScreen} />
		</Stack.Navigator>
	)
}

export default ApiKeyCodeStack;
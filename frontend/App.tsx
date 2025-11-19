import "react-native-gesture-handler";
import React from "react";
import { AuthProvider, NotificationProvider } from "@/contexts";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppNavigator />
      </NotificationProvider>
    </AuthProvider>
  );
}

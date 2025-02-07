import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { login } from "../../services/apiAuth";
import { validateSignIn } from "../../utils/verifyEmailAndPassword";

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  const submit = async () => {
    try {
      validateSignIn(form.email, form.password);

      setIsSubmiting(true);
      const responce = await login(form);
      if(responce.status !== 200 || !responce.data.accessToken){
        throw new Error("Invalid credentials ❌");
      }
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong ❌");
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[80vh] justify-center px-4 my-6">
          <Image
            source={images.logomyvod}
            resizeMode="contain"
            className="w-[115px] h-[235px] mx-auto"
          />
          <Text className="text-2xl text-white mx-auto text-semibold font-psemibold">
            Log in to MyVOD
          </Text>
          <FormField
            title="Email"
            value={form.email}
            hnadleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyle="mt-6"
            keyBoardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            hnadleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyle="mt-6"
            keyBoardType="password"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmiting}
          />
          <View className="flex-row justify-center pt-5 gap-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href="/signup"
              className="text-lg font-semibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;

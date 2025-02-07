import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../services/apiAuth";
import { validateCredentials } from "../../utils/verifyEmailAndPassword";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  const submit = async () => {
    try {
      validateCredentials(form.email, form.password);

      if (!form.username) {
        throw new Error("Username is required ❌");
      }

      console.log(form);
      setIsSubmiting(true);

      const responce = await createUser(form);
      if (responce.status !== 200 || !responce.data.accessToken) {
        throw new Error("Invalid credentials ❌");
      }
      // Set it as a global state...
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
            Sign Up to MyVOD
          </Text>
          <FormField
            title="Username"
            value={form.username}
            hnadleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyle="mt-10"
          />
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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmiting}
          />
          <View className="flex-row justify-center pt-5 gap-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Have account already?
            </Text>
            <Link
              href="/signin"
              className="text-lg font-semibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

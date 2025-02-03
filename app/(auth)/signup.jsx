import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  const submit = () => {
    console.log(form);
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
            title="Signin"
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

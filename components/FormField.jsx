import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const FormField = ({
  title,
  value,
  placeholder,
  hnadleChangeText,
  otherStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className={`text-base text-gray-100 font-pmedium`}>{title}</Text>
      <View className="w-full h-16 bg-black-100 px-4 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          value={value}
          onChangeText={hnadleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          className="flex-1 font-psemibold w-full h-full text-white"
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="text-white"
          >
            <Text className=" text-white text-sm font-psemibold">
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

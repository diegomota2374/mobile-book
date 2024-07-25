import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Book {
  id?: number;
  title: string;
  author: string;
  category: string;
}

interface TextInputFieldProps {
  label: string;
  name: keyof Book;
  control: any;
  rules?: object;
  errors: any;
}

export default function TextInputField({
  label,
  name,
  control,
  rules,
  errors,
}: TextInputFieldProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text);
            }}
            value={value as string}
          />
        )}
      />
      {errors[name] && (
        <Text style={styles.errorText}>{errors[name]?.message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TextStyle,
  type TouchableOpacityProps,
  type ViewStyle,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  variant?: "default" | "outline" | "ghost";
  theme?: "light" | "dark";
  children: React.ReactNode;
};

export function Button({
  variant = "default",
  children,
  theme = "light",
  ...props
}: ButtonProps) {
  const { disabled, accessibilityState, style, ...touchableProps } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      accessibilityState={{ ...accessibilityState, disabled }}
      style={[styles.base, buttonVariantStyles[variant][theme], style]}
      {...touchableProps}
    >
      <Text style={[styles.textBase, textVariantStyles[variant][theme]]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  default: {
    backgroundColor: "#18181b",
  },
  outline: {
    borderWidth: 1,
    borderColor: "#e4e4e7",
    backgroundColor: "#ffffff",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  textBase: {
    fontSize: 14,
    fontWeight: "500",
  },
});

const buttonVariantStyles: Record<
  NonNullable<ButtonProps["variant"]>,
  { light: ViewStyle; dark: ViewStyle }
> = {
  default: {
    light: { backgroundColor: "#18181b" },
    dark: { backgroundColor: "#f4f4f5" },
  },
  outline: {
    light: {
      borderWidth: 1,
      borderColor: "#e4e4e7",
      backgroundColor: "#ffffff",
    },
    dark: {
      borderWidth: 1,
      borderColor: "#3f3f46",
      backgroundColor: "#18181b",
    },
  },
  ghost: {
    light: { backgroundColor: "transparent" },
    dark: { backgroundColor: "transparent" },
  },
};

const textVariantStyles: Record<
  NonNullable<ButtonProps["variant"]>,
  { light: TextStyle; dark: TextStyle }
> = {
  default: {
    light: { color: "#ffffff" },
    dark: { color: "#18181b" },
  },
  outline: {
    light: { color: "#18181b" },
    dark: { color: "#f4f4f5" },
  },
  ghost: {
    light: { color: "#18181b" },
    dark: { color: "#f4f4f5" },
  },
};

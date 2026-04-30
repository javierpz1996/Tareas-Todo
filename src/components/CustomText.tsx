import type { PropsWithChildren } from "react";
import { Text } from "react-native";
import type { TextProps } from "react-native";

export type CustomTextProps = PropsWithChildren<TextProps>;

export function CustomText({ children, style, ...props }: CustomTextProps) {
  return (
    <Text accessibilityRole="text" style={style} {...props}>
      {children}
    </Text>
  );
}


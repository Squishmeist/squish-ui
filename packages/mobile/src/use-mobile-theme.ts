"use client";

import * as React from "react";
import { Platform, useColorScheme } from "react-native";

export type MobileTheme = "light" | "dark";

export function useMobileTheme(): MobileTheme {
  const colorScheme = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  const [isDarkFromDom, setIsDarkFromDom] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    if (Platform.OS !== "web") return;

    const syncThemeFromDom = () => {
      setIsDarkFromDom(document.documentElement.classList.contains("dark"));
    };

    syncThemeFromDom();
    const observer = new MutationObserver(syncThemeFromDom);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (Platform.OS === "web") {
    return mounted && isDarkFromDom ? "dark" : "light";
  }

  return mounted && colorScheme === "dark" ? "dark" : "light";
}

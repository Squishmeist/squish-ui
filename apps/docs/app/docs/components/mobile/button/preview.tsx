"use client";

import { Button } from "@squishui/mobile/button";
import * as Stories from "@squishui/mobile/button/button.stories";
import { useMobileTheme } from "@squishui/mobile/use-mobile-theme";

export function DefaultPreview() {
  const theme = useMobileTheme();
  return <Button {...Stories.Default.args} theme={theme} />;
}

export function OutlinePreview() {
  const theme = useMobileTheme();
  return <Button {...Stories.Outline.args} theme={theme} />;
}

export function GhostPreview() {
  const theme = useMobileTheme();
  return <Button {...Stories.Ghost.args} theme={theme} />;
}

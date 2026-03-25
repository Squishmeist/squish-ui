"use client";

import { Button } from "@/components/mobile/button/button";
import * as Stories from "@/components/mobile/button/button.stories";
import { useMobileTheme } from "@/components/mobile/use-mobile-theme";

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

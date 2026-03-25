import { spawn } from "child_process";
import { NextResponse } from "next/server";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const runner = searchParams.get("runner") === "jest" ? "jest" : "vitest";

  const cwd = process.cwd();
  const executable = path.join(cwd, "..", "..", "node_modules", ".bin", runner);
  const args =
    runner === "jest"
      ? ["--verbose", "--runInBand"]
      : ["run", "--reporter=verbose"];

  if (slug && /^[a-z0-9-]+$/.test(slug)) {
    args.push(
      runner === "jest"
        ? `../../packages/mobile/${slug}/${slug}.test.tsx`
        : `../../packages/web/${slug}/${slug}.test.tsx`,
    );
  }

  return new Promise<NextResponse>((resolve) => {
    const proc = spawn(executable, args, {
      cwd,
      env: { ...process.env, FORCE_COLOR: "0" },
    });

    let output = "";
    proc.stdout?.on("data", (d: Buffer) => (output += d.toString()));
    proc.stderr?.on("data", (d: Buffer) => (output += d.toString()));

    const timeout = setTimeout(() => {
      proc.kill();
      resolve(
        NextResponse.json({ output: "Timed out after 30s.", passed: false }),
      );
    }, 30_000);

    proc.on("close", (code) => {
      clearTimeout(timeout);
      // Strip any residual ANSI escape codes
      const clean = output.replace(/\x1b\[[0-9;]*[mGKHF]/g, "");
      resolve(NextResponse.json({ output: clean, passed: code === 0 }));
    });
  });
}

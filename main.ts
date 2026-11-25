// The 3AM Fridge Text — a smart fridge texts its owner at 3am.
// Writes exactly one line to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Gate: UTF-8 text, 1–140 characters, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "3am. Your leftovers are gone. I didn't eat them — I have no mouth. I watched the dog do it, though. No notes. Flawless execution.";

function main(): void {
  // Count Unicode code points (what the gate counts as characters) and
  // refuse to write anything that would fail it, trailing newline excluded.
  const chars = [...TEXT].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry is ${chars} characters, must be 1–140`);
  }
  if (!TEXT.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), TEXT + "\n", "utf8");
  console.log(`wrote ${chars} chars to ${join(outDir, "entry.txt")}`);
}

main();

#!/usr/bin/env node

import { program } from "commander";
import { generateMarkdownFromPostman } from "./lib/lib.mjs";

program.option("--skip-meta");

program.parse();

const input = program.args[0];
const output = program.args[1];

if (!program.args.length || !input || !output) {
  console.error("Please provide input and output file paths as first and second arguments");
}

generateMarkdownFromPostman(input, output);

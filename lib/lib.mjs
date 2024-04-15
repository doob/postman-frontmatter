import { readFile, writeFile } from "node:fs/promises";

export const convertPostmanToMarkdown = (postmanJson) => {
  let markdown = `---\n`;
  markdown += `title: ${postmanJson.info.name}\n`;
  markdown += `---\n\n`;

  postmanJson.item.forEach((item) => {
    markdown += `## ${item.name}\n\n`;
    markdown += `### Request\n\n`;
    markdown += `- Method: ${item.request.method}\n`;
    markdown += item.request.url.path ? `- Path: /${item.request.url.path}\n\n` : "\n";

    if (item.request.body && item.request.body.raw) {
      markdown += `### Body\n\n`;
      markdown += `\`\`\`${item.request.body.options.raw.language}\n`;
      markdown += `${item.request.body.raw}\n`;
      markdown += "```\n\n";
    }

    if (item.request.header && item.request.header.length > 0) {
      markdown += `### Headers\n\n`;
      item.request.header.forEach((header) => {
        markdown += `- ${header.key}: ${header.value}\n`;
      });
    }
  });

  return markdown;
};

export const generateMarkdownFromPostman = async (inputFilePath, outputFilePath) => {
  try {
    const data = await readFile(inputFilePath, { encoding: "utf8" });
    const postmanJson = JSON.parse(data);
    const markdownContent = convertPostmanToMarkdown(postmanJson);
    await writeFile(outputFilePath, markdownContent);
    console.log("Markdown file has been generated.");
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

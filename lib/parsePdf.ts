import pdfParse from "pdf-parse";

export async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
  const data = await pdfParse(fileBuffer);
  return data.text;
}

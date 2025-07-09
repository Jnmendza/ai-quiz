import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { QuizQuestion } from "@/types/quiz";
import { generateNumQuestions } from "@/lib/utils";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const wordCount: number = text.split(" ").length;
  const numQuestions = Math.max(generateNumQuestions(wordCount), 4);

  const prompt = `Based on the following content, generate ${numQuestions} multiple choice questions.
Return your response as a JSON array of objects with this shape:

[
  {
    "question": "string",
    "choices": ["string", "string", "string", "string"],
    "correctAnswer": "A",
    "explanation": "string"
  }
]

Do NOT wrap your response in markdown or include \`\`\`json blocks.
Just return the raw JSON.

Content:
${text}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a quiz generator AI." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  try {
    let raw = completion.choices[0].message.content || "";

    // Strip markdown-style code block fences and extra prefix text
    raw = raw
      .replace(/```json[\s\S]*?\n/, "") // remove opening ```json line
      .replace(/```$/, "") // remove closing ```
      .trim();

    const quiz: QuizQuestion[] = JSON.parse(raw);
    return NextResponse.json({ quiz });
  } catch (error) {
    console.error("Error generating quiz:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz. AI response could not be parsed." },
      { status: 500 }
    );
  }
}

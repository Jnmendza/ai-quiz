import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { QuizQuestion } from "@/types/quiz";
import { generateNumQuestions } from "@/lib/utils";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const wordCount: number = text.split(" ").length;
  const numQuestions = generateNumQuestions(wordCount);

  const prompt = `Based on the following content, generate ${numQuestions} multiple choice questions. Each should include:
  - A clear question
  - 4 answer choices (A, B, C, D)
  - The correct answer (as letter)
  - A 1-2 sentence explanation

Content:
${text}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a quiz generator AI." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const quiz: QuizQuestion[] = JSON.parse(
    completion.choices[0].message.content || "[]"
  );

  return NextResponse.json({ quiz });
}

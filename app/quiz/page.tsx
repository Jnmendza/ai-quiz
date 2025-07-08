"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuizQuestion } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const QuizPage = () => {
  const router = useRouter();
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // If there is now quiz in storage the user will be redirected to the home page
  useEffect(() => {
    const stored = sessionStorage.getItem("quiz");
    if (!stored) return router.push("/");
    setQuiz(JSON.parse(stored));
  }, [router]);

  const handleChange = (qIdx: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: value }));
  };

  const handleSubmit = () => {
    sessionStorage.setItem("answers", JSON.stringify(answers));
    router.push("/quiz/results");
  };

  return (
    <main className='p-6 max-w-3xl mx-auto space-y-6'>
      <h1 className='text-2xl font-bold'>Quiz</h1>
      {quiz.map((q, index) => (
        <Card key={index}>
          <CardContent className='space-y-2 p-4'>
            <p className='font-medium'>{q.question}</p>
            <RadioGroup
              onValueChange={(val) => handleChange(index, val)}
              value={answers[index] || ""}
            >
              {q.choices.map((choice, i) => (
                <div key={i} className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value={String.fromCharCode(65 + i)}
                    id={`q${index}-a${i}`}
                  />
                  <Label htmlFor={`q${index}-a${i}`}>
                    {String.fromCharCode(65 + i)}. {choice}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSubmit}>Submit Quiz</Button>
    </main>
  );
};

export default QuizPage;

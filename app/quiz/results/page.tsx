"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizQuestion } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ResultsPage = () => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>([]);
  const router = useRouter();
  console.log(quiz);

  useEffect(() => {
    const quizData = sessionStorage.getItem("quiz");
    const answersData = sessionStorage.getItem("answers");
    if (!quizData || !answersData) return router.push("/");
    setQuiz(JSON.parse(quizData));
    setAnswers(JSON.parse(answersData));
  }, [router]);

  const reset = () => router.push("/quiz");
  const restart = () => router.push("/");

  const correctCount = quiz.reduce((acc, q, index) => {
    return acc + (answers[index] === q.correctAnswer ? 1 : 0);
  }, 0);

  const percentage =
    quiz.length > 0 ? Math.round((correctCount / quiz.length) * 100) : 0;
  return (
    <main className='p-6 max-w-3xl mx-auto space-y-6'>
      <h1 className='text-2xl font-bold'>Results</h1>
      <p className='text-lg font-semibold'>
        Score: {correctCount} / {quiz.length} ({percentage}%)
      </p>
      {quiz.map((q, index) => {
        const selected = answers[index];
        const correct = q.correctAnswer;
        // const correctIndex = correct.charCodeAt(0) - 65;

        return (
          <Card key={index}>
            <CardContent className='space-y-2 p-4'>
              <p className='font-medium'>{q.question}</p>
              {q.choices.map((choice, i) => {
                const option = String.fromCharCode(65 + i);
                const isSelected = option === selected;
                const isCorrect = option === correct;

                let className = "";
                if (isSelected && isCorrect)
                  className = "text-green-600 font-semibold";
                else if (isSelected && !isCorrect)
                  className = "text-red-600 font-semibold";
                else if (!isSelected && isCorrect) className = "text-green-600";

                return (
                  <p key={i} className={className}>
                    {option}. {choice}
                  </p>
                );
              })}
              <p className='text-sm text-gray-600 italic'>
                Explanation: {q.explanation}
              </p>
            </CardContent>
          </Card>
        );
      })}
      <div className='flex space-x-4'>
        <Button onClick={reset} className='cursor-pointer'>
          Reset Quiz
        </Button>
        <Button variant='outline' onClick={restart} className='cursor-pointer'>
          Try Another PDF
        </Button>
      </div>
    </main>
  );
};

export default ResultsPage;

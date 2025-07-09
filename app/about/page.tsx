import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <main className='max-w-3xl mx-auto p-6 space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className='text-3xl font-bold'>About AI Quiz</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-lg leading-relaxed text-gray-700 dark:text-gray-300'>
            AI Quiz is a modern studying companion that uses the power of OpenAI
            to turn any PDF into a personalized quiz. Whether you&apos;re
            reading lecture slides, eBooks, academic papers, or training
            manuals, simply upload your file and let the app generate
            multiple-choice questions that challenge your understanding of the
            material. Each question comes with clear answer choices, correct
            answers, and brief explanations to reinforce learning.
          </p>
          <div className='my-4' />
          <p className='text-lg leading-relaxed text-gray-700 dark:text-gray-300'>
            This app is ideal for students, professionals, and lifelong learners
            who want a smarter way to review content. Use AI Quiz as a
            self-testing tool before exams, a recap method after reading, or
            even to gamify your study sessions. It&apos;s fast, easy to use, and
            adapts to any subject matter — turning passive reading into active
            learning.
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default page;

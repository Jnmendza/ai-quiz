"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FaFileUpload } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";
import { Progress } from "./ui/progress";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/parse-pdf", {
      method: "POST",
      body: formData,
    });

    setProgress(40);
    const { text } = await res.json();

    const quizRes = await fetch("/api/generate-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!quizRes.ok) {
      setIsLoading(false);
      alert("❌ Failed to generate quiz. Try a different PDF or retry.");
      return;
    }

    setProgress(80);
    const { quiz } = await quizRes.json();
    sessionStorage.setItem("quiz", JSON.stringify(quiz));
    setProgress(100);
    router.push("/quiz");
  };

  return (
    <div className='space-y-4'>
      <div className='relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md cursor-pointer dark:border-gray-600 group hover:bg-gray-50 dark:hover:bg-gray-800'>
        <div className='flex flex-col items-center justify-center pt-5 pb-6 mt-6 pointer-events-none'>
          <FaFileUpload className='w-10 h-10 mb-3 text-gray-400 group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-400' />
          {file ? (
            <p className='text-sm font-medium text-green-700 dark:text-green-400'>
              Selected: {file.name}
            </p>
          ) : (
            <>
              <p className='mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>
                Drag and drop files here
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                or click to upload
              </p>
            </>
          )}
        </div>
        <Input
          type='file'
          accept='application/pdf'
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10'
        />
      </div>

      {isLoading && <Progress value={progress} className='w-full' />}
      <Button
        onClick={handleUpload}
        disabled={!file || isLoading}
        className='mt-6 w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isLoading && <LuLoaderCircle className='w-4 h-4 mr-2 animate-spin' />}
        Generate quiz
      </Button>
    </div>
  );
};

export default UploadForm;

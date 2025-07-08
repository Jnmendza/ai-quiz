"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/parse-pdf", {
      method: "POST",
      body: formData,
    });

    const { text } = await res.json();

    const quizRes = await fetch("/api/generate-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const { quiz } = await quizRes.json();
    sessionStorage.setItem("quiz", JSON.stringify(quiz));
    router.push("/quiz");
  };

  return (
    <div className='space-y-4'>
      <Input
        type='file'
        accept='application/pdf'
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button
        onClick={handleUpload}
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Upload and Generate quiz
      </Button>
    </div>
  );
};

export default UploadForm;

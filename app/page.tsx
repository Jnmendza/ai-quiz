import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import UploadForm from "../components/UploadForm";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { PiListBulletsBold } from "react-icons/pi";
import { GoPlus } from "react-icons/go";

export default function Home() {
  return (
    <main className='min-h-[90dvh] w-full flex justify-center items-center p-6 max-w-2xl mx-auto dark:bg-gray-950'>
      <Card className='w-full h-2/3 px-4 py-8'>
        <CardHeader>
          <div className='flex justify-center items-center space-x-2 mb-4'>
            <BsFileEarmarkPdf size={40} />
            <GoPlus />
            <PiListBulletsBold size={40} />
          </div>
          <CardTitle className='text-2xl font-bold mb-4 text-center'>
            PDF Quiz Generator
          </CardTitle>
          <CardDescription>
            Upload a PDF to generate a quiz based on its content. Your results
            will be waiting for you upon completion.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadForm />
        </CardContent>
      </Card>
    </main>
  );
}

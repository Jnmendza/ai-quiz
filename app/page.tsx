import UploadForm from "../components/UploadForm";

export default function Home() {
  return (
    <main className='p-6 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>PDF to Quiz Generator</h1>
      <UploadForm />
    </main>
  );
}

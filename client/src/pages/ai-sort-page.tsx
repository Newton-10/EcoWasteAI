import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FileUpload from "@/components/file-upload";
import ResultsCard from "@/components/results-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AISortPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [imageData, setImageData] = useState<string | null>(null);
  
  const { mutate: classifyImage, isPending, data: analysisResult } = useMutation({
    mutationFn: async (imageData: string) => {
      const res = await apiRequest("POST", "/api/classify", { imageData });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Analysis Complete",
        description: "Your device has been successfully analyzed.",
      });
      // Invalidate history queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["/api/analysis"] });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleImageUpload = (base64Image: string) => {
    setImageData(base64Image);
  };

  const handleRemoveImage = () => {
    setImageData(null);
  };

  const handleProcessImage = () => {
    if (imageData) {
      classifyImage(imageData);
    } else {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-neutral-900 text-gray-200 min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-20 bg-neutral-900 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">AI <span className="text-primary-400">Sorting</span> Technology</h2>
            <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
              Upload images of your electronic devices for AI-powered classification and lifespan prediction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Upload Area */}
            <div className="bg-neutral-850 rounded-xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Upload Device Image</h3>
              
              <FileUpload 
                onImageUpload={handleImageUpload} 
                onRemoveImage={handleRemoveImage}
                onProcessImage={handleProcessImage}
                imagePreview={imageData}
              />
              
              <div className="mt-6">
                <h4 className="text-white font-medium mb-3">How it works:</h4>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="bg-primary-900/30 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-400 text-sm font-medium">1</span>
                    </div>
                    <p>Upload a clear image of your electronic device</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary-900/30 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-400 text-sm font-medium">2</span>
                    </div>
                    <p>Our AI classifies the type of device</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary-900/30 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-400 text-sm font-medium">3</span>
                    </div>
                    <p>Get device category, recycling information, and lifespan prediction</p>
                  </li>
                </ol>
              </div>
            </div>

            {/* Results Area */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Analysis Results</h3>
              
              {isPending ? (
                <div className="bg-neutral-850 rounded-xl border border-gray-800 p-12 text-center">
                  <div className="inline-block">
                    <Loader2 className="h-12 w-12 text-primary-500 animate-spin" />
                  </div>
                  <p className="mt-6 text-lg text-white font-medium">Analyzing device...</p>
                  <p className="mt-2 text-gray-400">This may take a few moments</p>
                </div>
              ) : analysisResult ? (
                <ResultsCard analysis={analysisResult} />
              ) : (
                <Card className="bg-neutral-850 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">No Analysis Yet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Upload a device image and click "Analyze Device" to see AI-powered results here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

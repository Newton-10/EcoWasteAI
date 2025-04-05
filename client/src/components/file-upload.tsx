import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Camera } from "lucide-react";

interface FileUploadProps {
  onImageUpload: (base64Image: string) => void;
  onRemoveImage: () => void;
  onProcessImage: () => void;
  imagePreview: string | null;
}

export default function FileUpload({ 
  onImageUpload, 
  onRemoveImage, 
  onProcessImage,
  imagePreview 
}: FileUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileSelect = async (file: File) => {
    try {
      // Validate file type
      if (!file.type.match(/image\/(jpeg|jpg|png|webp)/i)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG, PNG or WEBP image.",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image less than 5MB.",
          variant: "destructive",
        });
        return;
      }

      const base64Image = await convertToBase64(file);
      onImageUpload(base64Image);
    } catch (error) {
      toast({
        title: "Error processing image",
        description: "There was a problem reading the image file.",
        variant: "destructive",
      });
    }
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="mt-4">
      <input 
        type="file" 
        id="fileUpload" 
        ref={fileInputRef}
        className="hidden" 
        accept="image/*" 
        onChange={handleInputChange}
      />
      
      {!imagePreview ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging ? "border-primary-400 bg-primary-900/10" : "border-gray-700 hover:border-primary-400"
          }`}
          onClick={triggerFileUpload}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-primary-400 mb-4" />
            <p className="text-gray-300 mb-2">Drag and drop your image here or click to browse</p>
            <p className="text-sm text-gray-500">JPG, PNG or WEBP (max. 5MB)</p>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={imagePreview} 
              alt="Device preview" 
              className="w-full h-auto object-cover"
            />
            <button 
              onClick={onRemoveImage}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={onProcessImage}
              className="px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              Analyze Device
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

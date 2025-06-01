"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

type ImageData = {
  id: string | number;
  name: string;
  size: number;
  type: string;
  bin_img?: string;
};

export default function ImagesPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // Get token more safely
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match("image.*")) {
        enqueueSnackbar("Please select an image file", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        // 2MB
        enqueueSnackbar("Image size should be less than 2MB", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        return;
      }

      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      enqueueSnackbar("Please select an image first", {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const token = getToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.post(
        "http://localhost:8000/api/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        enqueueSnackbar("Image uploaded successfully!", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        setSelectedImage(null);
        setPreview(null);
        fetchImages(); // Refresh the image list
      } else {
        throw new Error(response.data.message || "Upload failed");
      }
    } catch (error: unknown) {
      console.error("Upload error:", error);
      let message = "Upload failed";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchImages = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.get("http://localhost:8000/api/images", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(response.data);
    } catch (error: unknown) {
      console.error("Fetch error:", error);
      let message = "Failed to fetch images";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Image Management
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {preview && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Preview
              </h3>
              <img
                src={preview}
                alt="Preview"
                className="max-w-xs max-h-64 rounded-md shadow"
              />
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleUpload}
              disabled={isLoading || !selectedImage}
              className={`px-4 py-2 rounded-md text-white font-medium
                ${
                  isLoading || !selectedImage
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload Image"
              )}
            </button>

            <button
              onClick={fetchImages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Refresh Images
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Image Gallery
          </h2>

          {images.length === 0 ? (
            <p className="text-gray-500">
              No images found. Upload some images to get started.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {img.bin_img ? (
                      <img
                        src={`data:image/${img.type};base64,${img.bin_img}`}
                        alt={img.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-400">
                        No preview available
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {img.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {Math.round(img.size / 1024)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

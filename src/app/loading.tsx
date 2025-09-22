import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-6">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Đang tải...
        </h2>

        <p className="text-gray-600">
          Vui lòng đợi một chút
        </p>

        {/* Progress bar animation */}
        <div className="mt-6 w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

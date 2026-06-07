import React from "react";

function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-gray-600 font-medium">
        {text}
      </p>
    </div>
  );
}

export default Loader;

/* Page Loader */

export function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-6xl mb-4">
        🍕
      </div>

      <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-lg font-semibold text-gray-700">
        Loading Pizza Palace...
      </p>
    </div>
  );
}

/* App Loader */

export function AppLoader() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="text-7xl mb-6">
        🍕
      </div>

      <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

      <h2 className="mt-6 text-2xl font-bold text-red-600">
        Pizza Palace
      </h2>

      <p className="mt-2 text-gray-600">
        Preparing your delicious experience...
      </p>
    </div>
  );
}

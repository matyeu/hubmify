export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1 text-sm text-gray-600">
            <span>© {currentYear} Hubmify. All rights reserved.</span>
            <span className="text-xs text-gray-500">
              Made with ❤️ by <strong>Matyeu, Shap</strong> and{" "}
              <strong>Nawre</strong>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

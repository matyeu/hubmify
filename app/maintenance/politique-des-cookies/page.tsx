import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | hubmify.com",
  description: "Cookie Policy of hubmify.com",
};

export default function PolitiqueCookiesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              1. What is a cookie?
            </h2>
            <p>
              A cookie is a small text file placed on your device (computer,
              tablet, smartphone) when you visit a website. It allows the site
              to recognize your browser and remember certain information about
              you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              2. Types of cookies used
            </h2>
            <p className="mb-3">
              We use different types of cookies on our site:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Strictly necessary cookies:</strong> These cookies are
                essential for the website to function and cannot be disabled.
              </li>
              <li>
                <strong>Performance cookies:</strong> These cookies allow us to
                analyze site usage to improve its performance.
              </li>
              <li>
                <strong>Functionality cookies:</strong> These cookies improve
                the user experience by remembering your preferences.
              </li>
              <li>
                <strong>Targeting cookies:</strong> These cookies are used to
                show you advertisements tailored to your interests.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              3. Purpose of cookies
            </h2>
            <p className="mb-3">The cookies we use serve to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ensure the proper functioning of the site</li>
              <li>Remember your preferences and settings</li>
              <li>Analyze traffic and site usage</li>
              <li>Improve our services and your experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              4. Cookie management
            </h2>
            <p className="mb-3">
              You can manage your cookie preferences at any time:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Through your browser settings to refuse or accept cookies</li>
              <li>By using our consent banner on your first visit</li>
            </ul>
            <p className="mt-4">
              <strong>Note:</strong> Refusing certain cookies may affect the
              site's functionality and limit some features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              5. Retention period
            </h2>
            <p>
              Cookies are kept for a maximum period of 13 months. Some session
              cookies are automatically deleted when you close your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              6. Third-party cookies
            </h2>
            <p>
              Some cookies may be placed by third-party services (social
              networks, analytics tools, etc.). We invite you to consult the
              privacy policies of these services for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              7. Contact
            </h2>
            <p>
              For any questions regarding our cookie policy, you can contact us
              at the following address: contact@hubmify.com
            </p>
          </section>

          <section className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

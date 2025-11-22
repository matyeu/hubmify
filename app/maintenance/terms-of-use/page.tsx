import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | hubmify.com",
  description: "Terms of Use of hubmify.com",
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using hubmify.com, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              2. Use License
            </h2>
            <p className="mb-3">
              Permission is granted to temporarily access the materials on
              hubmify.com for personal, non-commercial transitory viewing only.
              This is the grant of a license, not a transfer of title, and under
              this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                Attempt to decompile or reverse engineer any software contained
                on the website
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              3. User Account
            </h2>
            <p className="mb-3">
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. You are
              responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintaining the security of your account and password</li>
              <li>All activities that occur under your account</li>
              <li>
                Notifying us immediately of any unauthorized use of your account
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              4. Prohibited Uses
            </h2>
            <p className="mb-3">You may not use our service:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                In any way that violates any applicable national or
                international law or regulation
              </li>
              <li>
                To transmit, or procure the sending of, any advertising or
                promotional material
              </li>
              <li>
                To impersonate or attempt to impersonate the company, a company
                employee, another user, or any other person or entity
              </li>
              <li>
                In any way that infringes upon the rights of others, or in any
                way is illegal, threatening, fraudulent, or harmful
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              5. Content
            </h2>
            <p>
              Our service allows you to post, link, store, share and otherwise
              make available certain information, text, graphics, or other
              material. You are responsible for the content that you post on or
              through the service, including its legality, reliability, and
              appropriateness.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              6. Intellectual Property
            </h2>
            <p>
              The service and its original content, features, and functionality
              are and will remain the exclusive property of hubmify.com and its
              licensors. The service is protected by copyright, trademark, and
              other laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              7. Termination
            </h2>
            <p>
              We may terminate or suspend your account and bar access to the
              service immediately, without prior notice or liability, for any
              reason whatsoever, including without limitation if you breach the
              Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              8. Disclaimer
            </h2>
            <p>
              The materials on hubmify.com are provided on an "as is" basis. We
              make no warranties, expressed or implied, and hereby disclaim and
              negate all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              9. Limitation of Liability
            </h2>
            <p>
              In no event shall hubmify.com or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on hubmify.com, even if
              hubmify.com or a hubmify.com authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              10. Changes to Terms
            </h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will
              provide at least 30 days notice prior to any new terms taking
              effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              11. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Use, please contact
              us at: contact@hubmify.com
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

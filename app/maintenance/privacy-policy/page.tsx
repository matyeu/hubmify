import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | hubmify.com",
  description: "Privacy Policy of hubmify.com",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              1. Introduction
            </h2>
            <p>
              At hubmify.com, we respect your privacy and are committed to
              protecting your personal data. This privacy policy explains how we
              collect, use, and safeguard your information when you visit our
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information that you provide directly to us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account Information:</strong> Name, email address,
                password, and other information you provide when creating an
                account
              </li>
              <li>
                <strong>Profile Information:</strong> Information you choose to
                add to your profile, such as bio, links, and preferences
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our
                service, including pages visited, time spent, and features used
              </li>
              <li>
                <strong>Device Information:</strong> IP address, browser type,
                operating system, and device identifiers
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              3. How We Use Your Information
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              4. Information Sharing
            </h2>
            <p className="mb-3">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> With third-party vendors who
                perform services on our behalf
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with any
                merger, sale, or acquisition
              </li>
              <li>
                <strong>With Your Consent:</strong> When you have given us
                explicit permission to share
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              5. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. However, no method
              of transmission over the Internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              6. Data Retention
            </h2>
            <p>
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this privacy policy, unless a
              longer retention period is required or permitted by law. When we
              no longer need your information, we will delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              7. Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              8. Third-Party Links
            </h2>
            <p>
              Our service may contain links to third-party websites or services
              that are not owned or controlled by us. We are not responsible for
              the privacy practices of these third parties. We encourage you to
              read their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              9. Children's Privacy
            </h2>
            <p>
              Our service is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date. You are advised to review
              this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              11. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at: contact@hubmify.com
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

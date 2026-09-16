import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Scale, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | Pudavai Kadai - Heritage Handlooms",
  description:
    "Official terms of service and legal agreement governing the use of Pudavai Kadai's website and services.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Terms and Conditions" }]} />

        {/* Header */}
        <div className="py-8 border-b border-stone-200 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f3ebe0] border border-[#dccfb8] rounded-full text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8a6829] mb-3">
            <Scale className="w-3.5 h-3.5 text-[#927238]" />
            <span>Legal & Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light mt-2">
            Please read these terms and conditions carefully before using our website or placing an order.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed pb-24">
          {/* WHO WE ARE */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
              Who We Are
            </h2>
            <p>
              Pudavai Kadai is a Chennai-based brand dedicated to preserving and celebrating the timeless beauty of Indian sarees. When you use our Site or communicate with us electronically — such as by sending emails, messages, or inquiries — you are communicating with us in a digital format. By doing so, you consent to receive replies, updates, or any related communications from us electronically in the same format, and you may retain copies of these communications for your records.
            </p>
            <p>
              You agree that all agreements, notices, disclosures, and other communications provided to you electronically satisfy any legal requirement that such communications be in writing.
            </p>
          </section>

          {/* COMMENTS */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
              Comments
            </h2>
            <p>
              When visitors leave comments on our site, we collect the data shown in the comments form, along with the visitor’s IP address and browser user agent string to assist in spam detection and maintain the security of our platform.
            </p>
            <p>
              An anonymized string (also known as a hash) may be created from your email address and shared with the Gravatar service to determine if you are using it. You can view the Gravatar Privacy Policy here:{" "}
              <a
                href="https://automattic.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#927238] underline hover:text-[#725725]"
              >
                https://automattic.com/privacy/
              </a>
              .
            </p>
            <p>
              Once your comment is approved, your profile picture, if linked through Gravatar, becomes visible to the public in the context of your comment.
            </p>
          </section>

          {/* MEDIA */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
              Media
            </h2>
            <p>
              If you upload images to the website, please ensure that you do not include embedded location data (EXIF GPS) in the image files. Visitors to the website may be able to download and extract location data from publicly available images displayed on the site.
            </p>
            <p>
              To protect your privacy, we recommend uploading only images that do not contain sensitive metadata or geolocation information.
            </p>
          </section>

          {/* COOKIES */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
              Cookies
            </h2>
            <p>
              If you leave a comment on our site, you may choose to opt in to saving your name, email address, and website in cookies. These cookies are for your convenience, so you don’t have to re-enter your details when leaving another comment. These cookies will remain active for one year.
            </p>
            <p>
              If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is automatically discarded once you close your browser.
            </p>
            <p>
              When you log in, we will set several cookies to save your login information and screen display preferences:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>Login cookies last for two days.</li>
              <li>
                Screen options cookies last for one year. If you select &ldquo;Remember Me&rdquo;, your login will persist for two weeks. If you log out, all login cookies will be removed.
              </li>
              <li>
                If you edit or publish an article, an additional cookie will be stored in your browser. This cookie contains no personal data and simply indicates the post ID of the article you just edited. It expires after one day.
              </li>
            </ul>
          </section>

          {/* EMBEDDED CONTENT FROM OTHER WEBSITES */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
              Embedded Content From Other Websites
            </h2>
            <p>
              Articles or pages on this site may include embedded content (for example, videos, images, articles, or external links). Embedded content from other websites behaves in the exact same way as if the visitor had visited the external website directly.
            </p>
            <p>
              These third-party websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content. This may include tracking your activity if you have an account and are logged in to that website.
            </p>
            <p>
              Please note that Pudavai Kadai has no control over these external sites and their privacy practices. We recommend reviewing the privacy policies of any external websites you interact with through our platform.
            </p>
          </section>

          {/* WHO WE SHARE YOUR DATA WITH */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
              Who We Share Your Data With
            </h2>
            <p>
              If you request a password reset, your IP address will be included in the reset email for security purposes. This helps us verify the authenticity of the request and protect your account from unauthorized access.
            </p>
            <p>
              We do not sell, trade, or rent your personal information to third parties. However, your data may be shared with trusted service providers who assist us in operating our website, processing payments, fulfilling orders, and delivering products — strictly for the purpose of completing these services.
            </p>
            <p>
              All such partners are bound by confidentiality agreements and are required to handle your data securely and in compliance with applicable privacy laws.
            </p>
          </section>

          {/* HOW LONG WE RETAIN YOUR DATA */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
              How Long We Retain Your Data
            </h2>
            <p>
              If you leave a comment on our site, the comment and its metadata are retained indefinitely. This allows us to automatically recognize and approve any follow-up comments, instead of holding them in a moderation queue.
            </p>
            <p>
              For users who register on our website (if applicable), we store the personal information they provide in their user profile. All registered users can view, edit, or delete their personal information at any time — except for their username, which cannot be changed. Website administrators can also view and edit this information as needed to maintain your account and provide support.
            </p>
            <p>
              We retain this data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.
            </p>
          </section>

          {/* WHAT RIGHTS YOU HAVE OVER YOUR DATA */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
              What Rights You Have Over Your Data
            </h2>
            <p>
              If you have an account on our website or have left comments, you have the right to request an exported file of the personal data we hold about you, including any information you have provided to us.
            </p>
            <p>
              You may also request that we erase any personal data we hold about you. Please note that this does not include any data we are required to retain for administrative, legal, or security purposes.
            </p>
            <p className="flex items-center gap-2 pt-1 text-stone-900 font-medium">
              <Mail className="w-4 h-4 text-[#927238]" />
              <span>
                To exercise these rights or to make a data-related inquiry, contact us at:{" "}
                <a
                  href="mailto:support@pudavaikadai.com"
                  className="text-[#927238] underline hover:text-[#725725]"
                >
                  support@pudavaikadai.com
                </a>
              </span>
            </p>
            <p className="text-stone-600">
              We will review and respond to all valid requests in accordance with applicable data protection laws.
            </p>
          </section>

          {/* WHERE YOUR DATA IS SENT */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
              Where Your Data Is Sent
            </h2>
            <p>
              Visitor comments and form submissions on this website may be processed through an automated spam detection service to ensure security and maintain the quality of interactions on our platform.
            </p>
            <p>
              This helps us prevent unwanted or harmful content and protect the integrity of our community.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

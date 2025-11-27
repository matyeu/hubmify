import Link from "next/link";
import Image from "next/image";

// Composant Logo Icon
function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logos/logo_white-h.png"
      alt="Logo"
      width={60}
      height={51}
      className={className}
    />
  );
}

interface FooterProps {
  companyName?: string;
  copyrightText?: string;
  socialLinks?: {
    twitter?: string;
    discord?: string;
  };
  showPricingBadge?: boolean;
}

export default function Footer({
  companyName = "Hubmify",
  copyrightText = "Copyright © 2025 hubmify.com, Inc",
  socialLinks = {
    twitter: "https://x.com/hubmify",
    discord: "https://discord.com/invite/hubmify",
  },
  showPricingBadge = true,
}: FooterProps) {
  return (
    <footer className="grid grid-cols-1 lg:grid-cols-2 container mx-auto mt-8 max-lg:space-y-8">
      <div>
        <div className="font-title text-2xl text-white font-bold flex items-center justify-start gap-0.5 -ml-4">
          <LogoIcon className="fill-white" />
          <span className="-ml-3">{companyName}</span>
        </div>
        <p className="text-white font-sans -mt-1 text-sm font-medium">
          {copyrightText}
        </p>
        <ul className="mt-6 flex gap-5">
          {socialLinks.twitter && (
            <li>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-white to-[#C6E5FF] rounded-lg w-10 h-10 flex items-center justify-center"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="text-black text-xl"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                </svg>
              </a>
            </li>
          )}
          {socialLinks.discord && (
            <li>
              <a
                href={socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-white to-[#C6E5FF] rounded-lg w-10 h-10 flex items-center justify-center"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  className="text-[#5865F2] text-xl"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
                </svg>
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="flex items-start justify-between lg:justify-end md:space-x-20">
        <div>
          <p className="text-white/50 font-title uppercase text-sm font-bold">
            Legals
          </p>
          <ul className="mt-3 space-y-1">
            <li className="flex items-center justify-start gap-2">
              <Link
                href="/privacy"
                className="text-white font-sans text-base hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="flex justify-start items-center gap-1">
              <Link
                href="/terms"
                className="text-white font-sans text-base hover:underline whitespace-nowrap"
              >
                Terms and conditions
              </Link>
            </li>
            <li className="flex items-center justify-start gap-2">
              <Link
                href="/cookies"
                className="text-white font-sans text-base hover:underline"
              >
                Cookies
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-white/50 font-title uppercase text-sm font-bold">
            Informations
          </p>
          <ul className="mt-3 space-y-1">
            <li>
              <Link
                href="/pricing"
                className="text-white font-sans text-base hover:underline flex items-center gap-2"
              >
                Pricing
                {showPricingBadge && (
                  <Image
                    alt="Pro"
                    src="/images/icon_pro.svg"
                    width={32}
                    height={32}
                    className="w-4"
                  />
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

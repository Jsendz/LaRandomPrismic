import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => null);

  if (!settings) return null; // If no settings exist, return nothing

  return (
    <footer
      className="relative text-white py-12 bg-cover bg-center"
      style={{
        backgroundImage: settings.data.bg_footer?.url ? `url(${settings.data.bg_footer.url})` : "none",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center px-6">
        {/* Footer Logo (Centered on Mobile, Left on Desktop) */}
        <div className="flex flex-col items-center md:items-start">
          {settings.data.logo?.url && (
            <PrismicNextImage field={settings.data.logo} alt="" className="h-12 w-auto mb-4" />
          )}
        </div>

        {/* Footer Navigation Links (Centered on Mobile, Middle on Desktop) */}
        <nav className="flex flex-wrap justify-center space-x-4 mb-6 md:mb-0 text-white">
          {settings.data.navigation?.map((link: any, index: number) =>
            link.link_url && link.link_label ? (
              <PrismicNextLink key={index} field={link.link_url} className="hover:underline text-white">
                {link.link_label}
              </PrismicNextLink>
            ) : null
          )}
        </nav>

        {/* Social Media Icons (Centered on Mobile, Right on Desktop) */}
        <div className="flex space-x-4 text-white">
          {settings.data.social_media?.map((social: any, index: number) =>
            social.icon && social.url ? (
              <PrismicNextLink key={index} field={social.url} className="hover:opacity-80 transition">
                <PrismicNextImage field={social.icon} alt="" width={30} height={30} className="w-8 h-8" />
              </PrismicNextLink>
            ) : null
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 text-gray-400 text-sm mt-10 text-center">
        {settings.data.copyright || "© 2024 Your Company. All rights reserved."}
      </div>
    </footer>
  );
}

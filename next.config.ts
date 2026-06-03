import type { NextConfig } from "next";

/**
 * Content Security Policy
 * - يسمح فقط بالمصادر الموثوقة المستخدمة فعلياً في الموقع:
 *   • خرائط Google (iframe الخاص بقسم "موقعنا")
 *   • EmailJS API (نموذج التواصل)
 *   • WhatsApp / Instagram روابط خارجية (تُفتح في تبويب جديد، لا تحتاج connect)
 * - 'unsafe-inline' للستايلات ضروري مع Tailwind/Next،
 *   و 'unsafe-eval' في وضع التطوير فقط (يستخدمه React للـ debugging).
 */
const isDev = process.env.NODE_ENV === "development";

const cspHeader = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://www.google.com https://maps.gstatic.com https://maps.googleapis.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.emailjs.com",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // يمنع تضمين الموقع داخل iframe خارجي (حماية من clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // يمنع المتصفح من تخمين نوع المحتوى (حماية من MIME-sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // يتحكم في معلومات الـ referrer المرسلة
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // يفرض HTTPS لمدة سنتين بما في ذلك النطاقات الفرعية
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // يقيّد صلاحيات المتصفح الحساسة
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // سياسة أمان المحتوى
  { key: "Content-Security-Policy", value: cspHeader },
];

const nextConfig: NextConfig = {
  // تطبيق رؤوس الأمان على كل المسارات
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

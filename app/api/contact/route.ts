import { NextRequest, NextResponse } from "next/server";

/**
 * Backend خفيف لنموذج التواصل.
 * - يحمي مفاتيح EmailJS (تبقى على السيرفر، لا تُكشف في المتصفح).
 * - يطبّق تحقق المدخلات + honeypot + rate limiting بسيط في الذاكرة.
 * - يرسل عبر EmailJS REST API من السيرفر.
 *
 * متغيرات البيئة المطلوبة (server-only، بدون بادئة NEXT_PUBLIC_):
 *   EMAILJS_SERVICE_ID
 *   EMAILJS_TEMPLATE_ID
 *   EMAILJS_PUBLIC_KEY
 *   EMAILJS_PRIVATE_KEY   (مطلوب لـ strict mode في EmailJS REST API)
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// حدود الطول (مطابقة للواجهة)
const MAX_NAME = 80;
const MAX_EMAIL = 120;
const MAX_MESSAGE = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// rate limiting بسيط في الذاكرة (لكل IP). كافٍ لموقع صغير.
const RATE_LIMIT_WINDOW_MS = 15_000; // 15 ثانية بين كل إرسال
const ipLastSubmit = new Map<string, number>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    message?: string;
    website?: string; // honeypot
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_body" },
      { status: 400 },
    );
  }

  // ✅ honeypot: إن امتلأ هذا الحقل فهو بوت — نرد بنجاح صامت دون إرسال
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // ✅ rate limiting لكل IP
  const ip = getClientIp(req);
  const now = Date.now();
  const last = ipLastSubmit.get(ip) ?? 0;
  if (now - last < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  // ✅ تنظيف وتحقق المدخلات
  const name = (body.name ?? "").trim().slice(0, MAX_NAME);
  const email = (body.email ?? "").trim().slice(0, MAX_EMAIL);
  const message = (body.message ?? "").trim().slice(0, MAX_MESSAGE);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "required" },
      { status: 400 },
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  // ✅ إعدادات EmailJS من بيئة السيرفر (محمية)
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return NextResponse.json(
      { ok: false, error: "config" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        // accessToken يفعّل الإرسال من السيرفر (strict mode في EmailJS)
        ...(privateKey ? { accessToken: privateKey } : {}),
        template_params: { name, email, message },
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("EmailJS send failed:", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "fail" },
        { status: 502 },
      );
    }

    // نجاح: نسجّل وقت آخر إرسال لهذا الـ IP
    ipLastSubmit.set(ip, now);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ ok: false, error: "fail" }, { status: 500 });
  }
}

'use client'

import Image from 'next/image'
import {
  MapPin,
  Phone,
  Clock,

  Award,
  Leaf,
  HandHeart,
  Star,
  Play,
  X,
} from 'lucide-react'

import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

import { useState, useEffect, useRef } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import emailjs from '@emailjs/browser'

// ✅ رقم الواتساب في مكان واحد لسهولة التعديل
const WHATSAPP_NUMBER = '212537883303'

// ✅ نوع اللغة يشمل العربية
type Lang = 'FR' | 'EN' | 'AR'

// ✅ دالة لإنشاء رابط واتساب مع رسالة جاهزة
function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function GallerySection({
  images,
  heading,
  loadMoreLabel,
}: {
  images: string[]
  heading: string
  loadMoreLabel: (remaining: number) => string
}) {
  const [visible, setVisible] = useState(8)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary text-center mb-16">
        {heading}
      </h2>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.slice(0, visible).map((src, idx) => (
          <div
            key={idx}
            className="break-inside-avoid relative overflow-hidden rounded-xl cursor-pointer group mb-4"
            onClick={() => setSelected(src)}
          >
            <Image
              src={src}
              alt={`Gallery ${idx + 1}`}
              width={400}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {visible < images.length && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisible((v) => Math.min(v + 8, images.length))}
            className="px-10 py-4 border-2 border-primary text-primary font-semibold uppercase tracking-wider rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            {loadMoreLabel(images.length - visible)}
          </button>
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl leading-none"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected}
              alt="Selected"
              width={1200}
              height={900}
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}

/* ✅ معرض فيديو محسّن بنمط Reels مع Lightbox */
function VideoShowcase({
  videos,
  heading,
  playLabel,
}: {
  videos: string[]
  heading: string
  playLabel: string
}) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    if (activeVideo) {
      videoRefs.current.forEach((v) => v?.pause())
    }
    document.body.style.overflow = activeVideo ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeVideo])

  return (
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-16">
        {heading}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((src, idx) => (
          <div
            key={idx}
            className="relative bg-black rounded-2xl overflow-hidden shadow-md border border-beige/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer"
            onClick={() => setActiveVideo(src)}
          >
            <div className="aspect-[9/16] max-w-[320px] mx-auto relative">
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el
                }}
                src={src}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                onMouseEnter={(e) => {
                  e.currentTarget.play().catch(() => {})
                }}
                onMouseLeave={(e) => {
                  const v = e.currentTarget
                  v.pause()
                  v.currentTime = 0
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-7 h-7 text-primary fill-primary ml-1" />
                </div>
              </div>

              <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-accent-gold/90 text-primary text-xs font-semibold px-3 py-1 rounded-full pointer-events-none">
                {playLabel} {idx + 1}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 animate-fadeUp"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute top-6 right-6 z-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
          >
            <X className="w-7 h-7" />
          </button>
          <div
            className="relative w-full max-w-[400px] aspect-[9/16] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideo}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain rounded-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  )
}

// ✅ إعدادات EmailJS من متغيرات البيئة (مع قيم احتياطية للتطوير)
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''

// ✅ الحد الأقصى لطول المدخلات (حماية من الإرسال المفرط)
const MAX_NAME = 80
const MAX_EMAIL = 120
const MAX_MESSAGE = 2000

// ✅ تحقق بسيط من صيغة البريد الإلكتروني
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Home() {
  const [language, setLanguage] = useState<Lang>('FR')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [website, setWebsite] = useState('') // ✅ حقل honeypot لصيد البوتات
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const lastSubmitRef = useRef(0) // ✅ rate limiting (منع الإرسال المتكرر)
  const [showToast, setShowToast] = useState(false)

  const [navVisible, setNavVisible] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackTop, setShowBackTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // ✅ ضبط اتجاه الصفحة (RTL للعربية) تلقائياً
  useEffect(() => {
    const isArabic = language === 'AR'
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.documentElement.lang =
      language === 'AR' ? 'ar' : language === 'FR' ? 'fr' : 'en'
  }, [language])

  useEffect(() => {
    let lastY = window.scrollY
    const handleScroll = () => {
      const currentY = window.scrollY
      const diff = currentY - lastY
      setShowBackTop(currentY > 400)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(totalHeight > 0 ? (currentY / totalHeight) * 100 : 0)
      if (diff > 8 && currentY > 80) setNavVisible(false)
      else if (diff < -8) setNavVisible(true)
      lastY = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = ['about', 'specialites', 'products', 'why', 'gallery', 'videos', 'contact', 'find-us']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 },
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const galleryImages = [
    '/images/im1.jpg', '/images/im2.jpg', '/images/im3.jpg', '/images/im4.jpg',
    '/images/im5.jpg', '/images/im6.jpg', '/images/im7.jpg', '/images/im8.jpg',
    '/images/im9.jpg', '/images/im10.jpg', '/images/im11.jpg', '/images/im12.jpg',
    '/images/im13.jpg', '/images/im14.jpg', '/images/im15.jpg', '/images/im16.jpg',
    '/images/im17.jpg', '/images/im18.jpg', '/images/im19.jpg', '/images/im20.jpg',
    '/images/im21.jpg', '/images/im22.jpg', '/images/im23.jpg', '/images/im24.jpg',
    '/images/im25.jpg', '/images/im26.jpg', '/images/im27.jpg', '/images/im28.jpg',
  ]

  const showcaseVideos = ['/videos/ve1.mp4', '/videos/ve2.mp4', '/videos/ve3.mp4']

  const content = {
    FR: {
      nav: {
        home: 'Accueil',
        products: 'Produits',
        about: 'À propos',
        why: 'Pourquoi nous',
        gallery: 'Galerie',
        videos: 'Vidéos',
        contact: 'Contact',
      },
      hero: {
        title: 'Bread House',
        subtitle: 'Morocco',
        description: 'CAKES & BAKERY & BELDI HOUSE – Une référence en qualité, en saveurs et en savoir-faire.',
        viewProducts: 'Voir les Produits',
        contactUs: 'Contactez-nous',
      },
      about: {
        heading: 'Notre Histoire',
        text: `Chez Bread House, chaque visite est une invitation à découvrir des saveurs authentiques et des créations gourmandes préparées avec soin. Notre sélection de pâtisseries, gâteaux et spécialités artisanales ravira les amateurs de douceurs, notamment notre délicieux gâteau aux fruits.\n\nAccompagnez votre dégustation d'un café fraîchement préparé ou profitez de notre service de vente à emporter pour savourer nos produits où vous le souhaitez.\n\nNotre équipe accueillante met tout en œuvre pour offrir un service attentif et une expérience agréable à chaque visite. Grâce à un excellent rapport qualité-prix et à une atmosphère chaleureuse, Bread House est devenu une adresse appréciée de sa clientèle.`,
      },
      // ✅ قسم القائمة (المُستعاد + المترجم)
      specialites: {
        tagline: 'Artisanat & Saveurs',
        heading: 'Nos Spécialités',
        priceLabel: 'Fourchette de prix par personne',
        priceRange: '1 MAD – 50 MAD',
        categories: {
          desserts: { title: 'Desserts', icon: '🍰', items: ['Pâtisserie', 'Gâteaux', 'Gâteau aux fruits', 'Biscuits', 'Mille-feuilles', 'Petits gâteaux'] },
          boissons: { title: 'Boissons', icon: '☕', items: ['Café'] },
          plats: { title: 'Plats', icon: '🥖', items: ['Baguette', 'Filet Américain'] },
          services: { title: 'Services', icon: '🍽️', items: ['À emporter', 'Petit déjeuner', 'Service exceptionnel'] },
        },
      },
      products: {
        heading: 'Nos Délices',
        items: [
          { name: 'Gâteau fondant', img: '/images/im2.jpg', desc: "Un gâteau en fondant réalisé à la main et décoré d'élégants détails dorés, alliant art et douceur pour les occasions spéciales." },
          { name: 'Chebakia marocaine', img: '/images/im7.jpg', desc: "La chebakia marocaine est une pâtisserie traditionnelle à base d'amandes, de miel et de sésame, un incontournable pendant le Ramadan." },
          { name: 'Gâteaux et desserts gourmands', img: '/images/im15.jpg', desc: 'Un délicieux assortiment de gâteaux et pâtisseries artisanales, alliant saveurs riches et présentation élégante pour une expérience gourmande inoubliable.' },
        ],
        order: 'Commander',
        orderMsg: 'Bonjour Bread House 👋, je souhaite commander :',
      },
      why: {
        heading: 'Pourquoi Choisir Bread House',
        points: ['Artisanat authentique depuis 1985', 'Ingrédients biologiques locaux', 'Cuisson au four à bois traditionnel', 'Engagement zéro gaspillage'],
      },
      stats: { heading: 'Nos Chiffres', years: "Années d'expérience", customers: 'Clients par semaine', ingredients: 'Ingrédients frais', rating: 'Note clients' },
      trust: { heading: 'Notre Héritage', artisan: 'Artisan depuis 1985', fresh: 'Frais chaque jour', handmade: 'Fait à la main', premium: 'Ingrédients premium' },
      testimonials: { heading: 'Ce que disent nos clients' },
      findUs: 'Nous Trouver',
      openInMaps: 'Ouvrir dans Google Maps',
      gallery: { heading: 'Galerie', loadMore: (n: number) => `Voir plus (${n} restantes)` },
      videos: { heading: 'Vidéos', play: 'Vidéo' },
      contact: {
        heading: 'Contact', submit: 'Envoyer', placeholderName: 'Nom', placeholderEmail: 'Email', placeholderMessage: 'Message',
        openingHours: 'Horaires d\'ouverture',
        whatsappCta: 'Discuter sur WhatsApp',
        whatsappMsg: 'Bonjour Bread House 👋, j\'aimerais avoir plus d\'informations.',
      },
    },

    EN: {
      nav: { home: 'Home', products: 'Products', about: 'About', why: 'Why Us', gallery: 'Gallery', videos: 'Videos', contact: 'Contact' },
      hero: { title: 'Bread House', subtitle: 'Morocco', description: 'CAKES & BAKERY & BELDI HOUSE – A benchmark for quality, flavor, and craftsmanship.', viewProducts: 'View Products', contactUs: 'Contact Us' },
      about: {
        heading: 'Our Story',
        text: `At Bread House, every visit is an invitation to discover authentic flavors and handcrafted delights. Our selection of pastries, cakes, and artisanal specialties is carefully prepared to satisfy every sweet tooth, including our delicious fruitcake.\n\nEnjoy your treat with a freshly brewed coffee or take advantage of our convenient takeaway service to enjoy our products wherever you are.\n\nOur friendly team is committed to providing attentive service and a pleasant experience for every guest. With excellent value for money and a warm atmosphere, Bread House has become a favorite destination for customers seeking quality and taste.`,
      },
      specialites: {
        tagline: 'Craft & Flavors',
        heading: 'Our Specialties',
        priceLabel: 'Price range per person',
        priceRange: '1 MAD – 50 MAD',
        categories: {
          desserts: { title: 'Desserts', icon: '🍰', items: ['Pastry', 'Cakes', 'Fruitcake', 'Biscuits', 'Mille-feuilles', 'Small cakes'] },
          boissons: { title: 'Drinks', icon: '☕', items: ['Coffee'] },
          plats: { title: 'Dishes', icon: '🥖', items: ['Baguette', 'American Fillet'] },
          services: { title: 'Services', icon: '🍽️', items: ['Takeaway', 'Breakfast', 'Exceptional service'] },
        },
      },
      products: {
        heading: 'Our Delicacies',
        items: [
          { name: 'Fondant Cake', img: '/images/im2.jpg', desc: 'A handcrafted fondant cake decorated with elegant golden details, combining artistry and sweetness for special occasions.' },
          { name: 'Moroccan Chebakia', img: '/images/im7.jpg', desc: 'Moroccan chebakia is a traditional pastry made with almonds, honey and sesame, a must-have during Ramadan.' },
          { name: 'Gourmet Cakes & Desserts', img: '/images/im15.jpg', desc: 'A delightful assortment of handcrafted cakes and pastries, combining rich flavors and elegant presentation for an unforgettable dessert experience.' },
        ],
        order: 'Order Now',
        orderMsg: 'Hello Bread House 👋, I would like to order:',
      },
      why: { heading: 'Why Choose Us', points: ['Authentic craftsmanship since 1985', 'Local organic ingredients', 'Traditional wood-fired baking', 'Zero-waste commitment'] },
      stats: { heading: 'Our Numbers', years: 'Years of Experience', customers: 'Weekly Customers', ingredients: 'Fresh Ingredients', rating: 'Customer Rating' },
      trust: { heading: 'Our Trusted Heritage', artisan: 'Artisan Since 1985', fresh: 'Fresh Daily', handmade: 'Handmade Products', premium: 'Premium Ingredients' },
      testimonials: { heading: 'What Our Customers Say' },
      findUs: 'Find Us',
      openInMaps: 'Open in Google Maps',
      gallery: { heading: 'Gallery', loadMore: (n: number) => `Load more (${n} remaining)` },
      videos: { heading: 'Videos', play: 'Video' },
      contact: {
        heading: 'Contact', submit: 'Send', placeholderName: 'Name', placeholderEmail: 'Email', placeholderMessage: 'Message',
        openingHours: 'Opening Hours',
        whatsappCta: 'Chat on WhatsApp',
        whatsappMsg: 'Hello Bread House 👋, I would like more information.',
      },
    },

    /* ✅✅✅ المحتوى العربي الكامل ✅✅✅ */
    AR: {
      nav: { home: 'الرئيسية', products: 'المنتجات', about: 'من نحن', why: 'لماذا نحن', gallery: 'المعرض', videos: 'الفيديوهات', contact: 'اتصل بنا' },
      hero: { title: 'Bread House', subtitle: 'المغرب', description: 'كيك ومخبزة وبيت بلدي – مرجع في الجودة والنكهات والإتقان.', viewProducts: 'تصفّح المنتجات', contactUs: 'تواصل معنا' },
      about: {
        heading: 'قصتنا',
        text: `في Bread House، كل زيارة هي دعوة لاكتشاف نكهات أصيلة وإبداعات لذيذة محضّرة بعناية. تشكيلتنا من الحلويات والكيك والتخصصات التقليدية ستُسعد عشاق الحلويات، خاصة كيك الفواكه الشهي لدينا.\n\nاستمتع بطلبك مع قهوة طازجة، أو استفد من خدمة الطلبات الخارجية لتذوق منتجاتنا أينما كنت.\n\nيحرص فريقنا الودود على تقديم خدمة مميزة وتجربة ممتعة لكل زائر. بفضل القيمة الممتازة مقابل السعر والأجواء الدافئة، أصبح Bread House وجهة مفضلة لزبائنه.`,
      },
      specialites: {
        tagline: 'حرفية ونكهات',
        heading: 'تخصصاتنا',
        priceLabel: 'نطاق السعر للشخص الواحد',
        priceRange: '1 درهم – 50 درهم',
        categories: {
          desserts: { title: 'الحلويات', icon: '🍰', items: ['معجنات', 'كيك', 'كيك الفواكه', 'بسكويت', 'ميل فاي', 'كيك صغير'] },
          boissons: { title: 'المشروبات', icon: '☕', items: ['قهوة'] },
          plats: { title: 'الأطباق', icon: '🥖', items: ['باغيت', 'فيليه أمريكي'] },
          services: { title: 'الخدمات', icon: '🍽️', items: ['طلبات خارجية', 'فطور', 'خدمة استثنائية'] },
        },
      },
      products: {
        heading: 'أشهى منتجاتنا',
        items: [
          { name: 'كيك الفوندان', img: '/images/im2.jpg', desc: 'كيك فوندان مصنوع يدوياً ومزيّن بتفاصيل ذهبية أنيقة، يجمع بين الفن والحلاوة للمناسبات الخاصة.' },
          { name: 'الشباكية المغربية', img: '/images/im7.jpg', desc: 'الشباكية المغربية حلوى تقليدية باللوز والعسل والسمسم، لا غنى عنها في شهر رمضان.' },
          { name: 'كيك وحلويات فاخرة', img: '/images/im15.jpg', desc: 'تشكيلة رائعة من الكيك والحلويات المصنوعة يدوياً، تجمع بين النكهات الغنية والتقديم الأنيق لتجربة لا تُنسى.' },
        ],
        order: 'اطلب الآن',
        orderMsg: 'مرحباً Bread House 👋، أود طلب:',
      },
      why: { heading: 'لماذا تختار Bread House', points: ['حرفية أصيلة منذ 1985', 'مكونات عضوية محلية', 'خبز بالفرن التقليدي على الحطب', 'التزام بعدم الهدر'] },
      stats: { heading: 'أرقامنا', years: 'سنوات من الخبرة', customers: 'زبون أسبوعياً', ingredients: 'مكونات طازجة', rating: 'تقييم الزبائن' },
      trust: { heading: 'إرثنا الموثوق', artisan: 'حرفيون منذ 1985', fresh: 'طازج يومياً', handmade: 'صناعة يدوية', premium: 'مكونات فاخرة' },
      testimonials: { heading: 'ماذا يقول زبائننا' },
      findUs: 'موقعنا',
      openInMaps: 'افتح في خرائط جوجل',
      gallery: { heading: 'المعرض', loadMore: (n: number) => `عرض المزيد (${n} متبقية)` },
      videos: { heading: 'الفيديوهات', play: 'فيديو' },
      contact: {
        heading: 'اتصل بنا', submit: 'إرسال', placeholderName: 'الاسم', placeholderEmail: 'البريد الإلكتروني', placeholderMessage: 'الرسالة',
        openingHours: 'ساعات العمل',
        whatsappCta: 'تحدّث عبر واتساب',
        whatsappMsg: 'مرحباً Bread House 👋، أود الحصول على مزيد من المعلومات.',
      },
    },
  }

  const t = content[language]

  // ✅ رسائل الخطأ حسب اللغة
  const errMsg = (key: 'required' | 'email' | 'rate' | 'config' | 'fail') => {
    const m = {
      FR: {
        required: 'Veuillez remplir tous les champs.',
        email: 'Adresse e-mail invalide.',
        rate: 'Veuillez patienter avant de renvoyer un message.',
        config: 'Service de messagerie non configuré.',
        fail: "Échec de l'envoi. Réessayez plus tard.",
      },
      EN: {
        required: 'Please fill in all fields.',
        email: 'Invalid email address.',
        rate: 'Please wait before sending another message.',
        config: 'Email service is not configured.',
        fail: 'Sending failed. Please try again later.',
      },
      AR: {
        required: 'يرجى ملء جميع الحقول.',
        email: 'عنوان بريد إلكتروني غير صالح.',
        rate: 'يرجى الانتظار قبل إرسال رسالة أخرى.',
        config: 'خدمة البريد غير مُهيّأة.',
        fail: 'فشل الإرسال. حاول لاحقاً.',
      },
    }
    return m[language][key]
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    // ✅ فرض حدود الطول لمنع المدخلات الضخمة
    const limit = name === 'name' ? MAX_NAME : name === 'email' ? MAX_EMAIL : MAX_MESSAGE
    setForm((prev) => ({ ...prev, [name]: value.slice(0, limit) }))
    if (formError) setFormError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ honeypot: إذا امتلأ هذا الحقل المخفي فهو بوت — نتجاهله بصمت
    if (website.trim() !== '') return

    // ✅ rate limiting: منع الإرسال أكثر من مرة كل 15 ثانية
    const now = Date.now()
    if (now - lastSubmitRef.current < 15000) {
      setFormError(errMsg('rate'))
      return
    }

    // ✅ تنظيف وتحقق من المدخلات
    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (!name || !email || !message) {
      setFormError(errMsg('required'))
      return
    }
    if (!EMAIL_REGEX.test(email) || email.length > MAX_EMAIL) {
      setFormError(errMsg('email'))
      return
    }

    // ✅ التأكد من وجود إعدادات EmailJS
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setFormError(errMsg('config'))
      return
    }

    setSubmitting(true)
    setFormError('')
    lastSubmitRef.current = now

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name, email, message },
        EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setForm({ name: '', email: '', message: '' })
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      })
      .catch(() => {
        setFormError(errMsg('fail'))
        lastSubmitRef.current = 0 // السماح بإعادة المحاولة فوراً عند الفشل
      })
      .finally(() => setSubmitting(false))
  }


  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>('.counter')
    const animate = (el: HTMLElement) => {
      const target = el.dataset.target ? parseFloat(el.dataset.target) : 0
      const isDecimal = target % 1 !== 0
      const duration = 2000
      const start = performance.now()
      const step = (timestamp: number) => {
        const progress = Math.min((timestamp - start) / duration, 1)
        const value = isDecimal ? (progress * target).toFixed(1) : Math.floor(progress * target)
        el.textContent = value.toString()
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target as HTMLElement)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )
    counters.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-accent-gold z-[60] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-primary/95 shadow-sm border-b border-beige/30 px-4 sm:px-6 lg:px-8 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <Image src="/logo2.png" alt="Logo" width={250} height={85} className="h-20 w-auto" />
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {['home', 'products', 'about', 'why', 'gallery', 'videos', 'contact'].map((key) => (
              <a
                key={key}
                href={`#${key === 'home' ? '' : key}`}
                className={`font-serif font-medium text-sm tracking-wider transition-all duration-300 hover:text-accent-gold hover:scale-105 transform ${
                  activeSection === key ? 'text-white border-b-2 border-accent-gold pb-0.5' : 'text-white'
                }`}
              >
                {t.nav[key as keyof typeof t.nav]}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {/* ✅ مبدّل اللغة مع AR */}
            <div className="flex items-center gap-1.5 bg-beige/50 rounded-full p-1.5">
              {(['FR', 'EN', 'AR'] as Lang[]).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase transition-all ${
                    language === lng ? 'bg-white text-primary shadow-md' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {lng === 'AR' ? 'ع' : lng}
                </button>
              ))}
            </div>
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col gap-1 pt-2">
            {['home', 'products', 'about', 'why', 'gallery', 'videos', 'contact'].map((key) => (
              <a
                key={key}
                href={`#${key === 'home' ? '' : key}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-accent-gold font-serif text-sm tracking-wider py-3 px-4 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {t.nav[key as keyof typeof t.nav]}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <Image src="/Face.jpeg" alt="Hero" fill className="object-cover object-[center_-40%]" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/60 to-transparent" />
          <div className="absolute inset-0 bg-primary/40" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fadeUp">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight tracking-tighter">
            {t.hero.title}
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#C49A6C] tracking-[0.3em] uppercase mb-6">
            {t.hero.subtitle}
          </p>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <a href="#products" className="px-12 py-5 bg-primary text-white font-semibold rounded-lg uppercase tracking-wider hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              {t.hero.viewProducts}
            </a>
            <a href="#contact" className="px-12 py-5 border-2 border-white/60 text-white font-semibold rounded-lg uppercase tracking-wider hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              {t.hero.contactUs}
            </a>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="pt-20 pb-10 bg-beige/30">
        <ScrollReveal stagger={true} delayIncrement={120}>
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-8">
              {t.about.heading}
            </h2>
            <p className="text-primary/70 leading-relaxed text-lg whitespace-pre-line">
              {t.about.text}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Nos Spécialités (القائمة المُستعادة) ── ✅✅✅ */}
      <section id="specialites" className="pt-10 pb-20 bg-white">
        <ScrollReveal stagger={true} delayIncrement={100}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="font-serif text-xs uppercase tracking-[0.4em] text-accent-gold mb-3">
                {t.specialites.tagline}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
                {t.specialites.heading}
              </h2>
              <div className="w-16 h-px bg-accent-gold mx-auto mb-6" />
              <p className="text-primary/60 text-sm tracking-widest uppercase">
                {t.specialites.priceLabel}&nbsp;
                <span className="text-accent-gold font-semibold" dir="ltr">{t.specialites.priceRange}</span>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(['desserts', 'boissons', 'plats', 'services'] as const).map((catKey) => {
                const cat = t.specialites.categories[catKey]
                return (
                  <div key={catKey} className="group relative bg-beige/20 border border-beige/50 rounded-2xl p-7 hover:border-accent-gold hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-2xl">{cat.icon}</span>
                      <h3 className="font-serif text-xl text-primary tracking-wide">{cat.title}</h3>
                    </div>
                    <div className="w-8 h-px bg-accent-gold mb-5 group-hover:w-full transition-all duration-500" />
                    <ul className="space-y-2.5">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-primary/75 text-sm hover:text-primary transition-colors duration-200">
                          <span className="w-1 h-1 rounded-full bg-accent-gold flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Products ── */}
      <section id="products" className="py-20 bg-beige/30">
        <ScrollReveal stagger={true} delayIncrement={100}>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary text-center mb-20">
              {t.products.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {t.products.items.map((item, idx) => (
                <div key={idx} className="relative group bg-white rounded-2xl overflow-hidden border border-beige/30 hover:border-primary transition-all duration-500 hover:shadow-xl">
                  <div className="relative h-80 overflow-hidden">
                    <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-8">
                    <h3 className="font-serif text-2xl text-primary mb-4 leading-tight">{item.name}</h3>
                    <p className="text-primary/80 text-base leading-relaxed">{item.desc}</p>
                    {/* ✅ زر اطلب عبر واتساب */}
                    <div className="mt-6 pt-6 border-t border-beige/30">
                      <a
                        href={buildWhatsAppLink(`${t.products.orderMsg} ${item.name}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white font-medium text-sm uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#1ebe5d] hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                        {t.products.order}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Why Choose Us ── */}
      <section id="why" className="pt-12 pb-12 bg-white">
        <ScrollReveal stagger={true} delayIncrement={120}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-12">{t.why.heading}</h2>
            <ul className="space-y-4 text-left rtl:text-right">
              {t.why.points.map((pt, i) => (
                <li key={i} className="flex items-start">
                  <svg className="flex-shrink-0 w-6 h-6 text-accent-gold mt-1 mr-3 rtl:mr-0 rtl:ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.704 5.292a1 1 0 010 1.416L8.414 15l-4.12-4.12a1 1 0 111.415-1.415L8.414 12.17l7.875-7.876a1 1 0 011.415 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-primary font-medium">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Statistics ── */}
      <section id="stats" className="pt-12 pb-12 bg-beige/30">
        <ScrollReveal stagger={true} delayIncrement={80}>
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-12">
              {t.stats.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { target: '20', label: t.stats.years },
                { target: '500', label: t.stats.customers },
                { target: '100', label: t.stats.ingredients },
                { target: '4.9', label: t.stats.rating },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center p-6 bg-white/60 rounded-xl hover:shadow-xl transition-shadow">
                  <div className="text-5xl font-serif text-primary counter" data-target={stat.target}>0</div>
                  <div className="mt-2 text-lg font-medium text-primary/80 text-center">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Trust Indicators ── */}
      <section id="trust" className="pt-12 pb-12 bg-white">
        <ScrollReveal stagger={true} delayIncrement={100}>
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-12">
              {t.trust.heading}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: Award, label: t.trust.artisan },
                { icon: Leaf, label: t.trust.fresh },
                { icon: HandHeart, label: t.trust.handmade },
                { icon: Star, label: t.trust.premium },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex flex-col items-center p-4 hover:scale-105 transition-transform">
                  <Icon className="w-8 h-8 text-primary mb-2" />
                  <span className="font-medium text-primary">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="pt-12 pb-16 bg-beige/30">
        <ScrollReveal stagger={true} delayIncrement={100}>
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-12">
              {t.testimonials.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  fr: "\"Bread House me ramène à mon enfance. La brioche est une perfection beurrée et le croissant aux amandes fond dans la bouche. Un vrai goût du patrimoine marocain !\"",
                  en: "\"Bread House transports me back to my childhood. The brioche is buttery perfection, and the almond croissant melts in my mouth. A true taste of Morocco's heritage!\"",
                  ar: "«Bread House يعيدني إلى طفولتي. البريوش لذيذ بزبدته المثالية، وكرواسون اللوز يذوب في الفم. طعم أصيل من التراث المغربي!»",
                  author: 'Amina El‑Hadi',
                },
                {
                  fr: "\"Chaque dimanche je viens pour le pain au levain frais. La croûte est parfaitement croustillante, la mie aérée et l'arôme est irrésistible. Je le recommande vivement !\"",
                  en: "\"Every Sunday I come for the fresh sourdough. The crust is perfectly crisp, the crumb airy, and the aroma is irresistible. Highly recommend to any bread lover!\"",
                  ar: "«كل يوم أحد آتي من أجل خبز العجين المخمّر الطازج. القشرة مقرمشة تماماً والعجين هشّ والرائحة لا تُقاوَم. أنصح به بشدة!»",
                  author: 'Youssef Ben‑Said',
                },
                {
                  fr: "\"L'engagement de la boulangerie envers des ingrédients locaux et biologiques est remarquable. La tarte aux figues au miel est un chef-d'œuvre qui me fait revenir.\"",
                  en: "\"The bakery's dedication to local, organic ingredients shines through. The honey‑drizzled fig tart is a masterpiece that keeps me coming back.\"",
                  ar: "«التزام المخبزة بالمكونات المحلية والعضوية رائع. تارت التين بالعسل تحفة فنية تجعلني أعود دائماً.»",
                  author: 'Leila Ouarzazi',
                },
              ].map((t2, i) => (
                <div key={i} className="testimonial p-6 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center mb-4 text-yellow-400">★★★★★</div>
                  <p className="text-primary/90 mb-4">
                    {language === 'FR' ? t2.fr : language === 'EN' ? t2.en : t2.ar}
                  </p>
                  <p className="font-medium text-primary">{t2.author}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="pt-16 pb-12 bg-white">
        <GallerySection images={galleryImages} heading={t.gallery.heading} loadMoreLabel={t.gallery.loadMore} />
      </section>

      {/* ── Videos ── ✅ المكوّن المحسّن */}
      <section id="videos" className="pt-16 pb-12 bg-beige/30">
        <ScrollReveal stagger={true} delayIncrement={120}>
          <VideoShowcase videos={showcaseVideos} heading={t.videos.heading} playLabel={t.videos.play} />
        </ScrollReveal>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-16 bg-white">
        <ScrollReveal stagger={false}>
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-12">
              {t.contact.heading}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-beige/20 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-primary">Bread House</p>
                    <p className="text-sm text-primary/80">Av. Assalam, Salé</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-beige/20 rounded-xl">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                  <p className="text-primary" dir="ltr">+212 537-883303</p>
                </div>
                {/* ✅ واتساب رابط فعّال */}
                <a
                  href={buildWhatsAppLink(t.contact.whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 rounded-xl transition-colors group"
                >
                  <FaWhatsapp className="w-6 h-6 text-[#25D366] flex-shrink-0" />
                  <span className="text-primary font-medium group-hover:text-[#1ebe5d] transition-colors">
                    {t.contact.whatsappCta}
                  </span>
                </a>
                <div className="flex items-start gap-3 p-4 bg-beige/20 rounded-xl">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-primary">{t.contact.openingHours}</p>
                    <ul className="text-sm text-primary/80 mt-1 space-y-0.5">
                      {language === 'FR' ? (
                        <>
                          <li>Lundi : 5h30–22h</li>
                          <li>Mardi : 6h30–22h</li>
                          <li>Mercredi : 6h30–22h</li>
                          <li>Jeudi : 6h30–22h</li>
                          <li>Vendredi : 6h30–22h</li>
                          <li>Samedi : 6h30–22h</li>
                          <li>Dimanche : 6h30–22h</li>
                        </>
                      ) : language === 'EN' ? (
                        <>
                          <li>Monday: 5:30am–10pm</li>
                          <li>Tuesday: 6:30am–10pm</li>
                          <li>Wednesday: 6:30am–10pm</li>
                          <li>Thursday: 6:30am–10pm</li>
                          <li>Friday: 6:30am–10pm</li>
                          <li>Saturday: 6:30am–10pm</li>
                          <li>Sunday: 6:30am–10pm</li>
                        </>
                      ) : (
                        <>
                          <li>الإثنين: 5:30 ص – 10 م</li>
                          <li>الثلاثاء: 6:30 ص – 10 م</li>
                          <li>الأربعاء: 6:30 ص – 10 م</li>
                          <li>الخميس: 6:30 ص – 10 م</li>
                          <li>الجمعة: 6:30 ص – 10 م</li>
                          <li>السبت: 6:30 ص – 10 م</li>
                          <li>الأحد: 6:30 ص – 10 م</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
                <input type="text" name="name" placeholder={t.contact.placeholderName} value={form.name} onChange={handleInput} required maxLength={MAX_NAME} autoComplete="name" className="w-full px-6 py-4 bg-beige/30 border border-beige/50 rounded-full focus:outline-none focus:border-primary transition-colors" />
                <input type="email" name="email" placeholder={t.contact.placeholderEmail} value={form.email} onChange={handleInput} required maxLength={MAX_EMAIL} autoComplete="email" className="w-full px-6 py-4 bg-beige/30 border border-beige/50 rounded-full focus:outline-none focus:border-primary transition-colors" />
                <textarea name="message" placeholder={t.contact.placeholderMessage} value={form.message} onChange={handleInput} required rows={5} maxLength={MAX_MESSAGE} className="w-full px-6 py-4 bg-beige/30 border border-beige/50 rounded-2xl focus:outline-none focus:border-primary transition-colors resize-none" />

                {/* ✅ حقل honeypot مخفي عن المستخدمين الحقيقيين، يصطاد البوتات */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {/* ✅ رسالة خطأ */}
                {formError && (
                  <p className="text-red-600 text-sm font-medium text-center" role="alert">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-primary text-white font-semibold rounded-full uppercase tracking-wider hover:bg-secondary hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitting ? '…' : t.contact.submit}
                </button>
              </form>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Find Us ── */}
      <section id="find-us" className="py-16 bg-beige/30">
        <ScrollReveal stagger={false}>
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-12">
              {t.findUs}
            </h2>
            <a
              href="https://maps.google.com/?q=Bread+House+Av+Assalam+Salé+Maroc"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative w-full h-[450px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.3621773686527!2d-6.807602417192586!3d34.060228848104984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7697b52825ea7%3A0x78d139534f65e892!2sBread%20House!5e0!3m2!1sen!2sus!4v1780320427826!5m2!1sen!2sus"
                className="w-full h-full border-0 pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 bg-white text-primary px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-semibold tracking-wide">
                  <MapPin className="w-5 h-5 text-accent-gold" />
                  {t.openInMaps}
                </div>
              </div>
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-primary py-10">
        <ScrollReveal stagger={true} delayIncrement={80}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a66b] to-transparent mb-10" />
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left rtl:md:text-right">
            <div className="flex flex-col items-center md:items-start rtl:md:items-end">
              <Image src="/logo2.png" alt="Bread House Logo" width={200} height={70} className="mb-4" />
              <p className="text-white/70 text-sm max-w-xs">
                {language === 'FR'
                  ? 'Pains et pâtisseries artisanaux au Maroc depuis 1985. Qualité et tradition à chaque bouchée.'
                  : language === 'EN'
                  ? 'Crafting artisanal breads and pastries in Morocco since 1985. Quality and tradition in every bite.'
                  : 'خبز وحلويات حرفية في المغرب منذ 1985. جودة وتقليد في كل قضمة.'}
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start rtl:md:items-end space-y-2">
              <div className="flex items-center text-white">
                <MapPin className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                <span className="text-sm">Av. Assalam, Salé</span>
              </div>
              <div className="flex items-center text-white">
                <Phone className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                <span className="text-sm" dir="ltr">+212 537-883303</span>
              </div>
              <div className="flex items-center text-white">
                <FaWhatsapp className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                <a href={buildWhatsAppLink(t.contact.whatsappMsg)} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent-gold transition-colors" dir="ltr">
                  +212 537-883303
                </a>
              </div>
              <div className="flex items-center text-white">
                <Clock className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                <span className="text-sm">
                  {language === 'FR' ? 'Lun–Dim : 5h30–22h' : language === 'EN' ? 'Mon–Sun: 5:30am–10pm' : 'الإثنين–الأحد: 5:30 ص – 10 م'}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start rtl:md:items-end space-y-2">
              {['home', 'products', 'about', 'contact'].map((key) => (
                <a key={key} href={`#${key === 'home' ? '' : key}`} className="text-white/70 hover:text-accent-gold text-sm transition-colors">
                  {t.nav[key as keyof typeof t.nav]}
                </a>
              ))}
              <a href="https://www.instagram.com/breadhousemorocco" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center mt-2 text-white/70 hover:text-accent-gold transition-all duration-300 hover:scale-105">
                <FaInstagram className="w-5 h-5 mr-1 rtl:mr-0 rtl:ml-1" />
                @breadhousemorocco
              </a>
            </div>
            <div className="flex flex-col items-center md:items-end rtl:md:items-start">
              <h3 className="font-serif text-xl text-white mb-2">Bread House Morocco</h3>
              <p className="text-primary/60 text-sm">
                © {new Date().getFullYear()} —{' '}
                {language === 'FR' ? 'Tous droits réservés' : language === 'EN' ? 'All rights reserved' : 'جميع الحقوق محفوظة'}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </footer>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-primary text-white px-8 py-4 rounded-full shadow-2xl animate-fadeUp whitespace-nowrap">
          {language === 'FR' ? '✓ Message envoyé avec succès' : language === 'EN' ? '✓ Message sent successfully' : '✓ تم إرسال الرسالة بنجاح'}
        </div>
      )}

      {/* Back to Top */}
      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 rtl:left-auto rtl:right-8 z-50 bg-primary text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center hover:bg-secondary transition-all duration-300 animate-fadeUp"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Floating WhatsApp */}
      <a
        href={buildWhatsAppLink(t.contact.whatsappMsg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-8 right-8 rtl:right-auto rtl:left-8 bg-[#25D366] text-white rounded-full p-4 shadow-2xl hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300 z-50"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>

    </div>
  )
}
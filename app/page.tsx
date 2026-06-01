'use client'

import Image from 'next/image'
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Award,
  Leaf,
  HandHeart,
  Star,
} from 'lucide-react'

import { FaInstagram } from 'react-icons/fa'

import { useState, useEffect } from 'react'

export default function Home() {
  const [language, setLanguage] = useState<'FR' | 'EN'>('FR')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const galleryImages = [
    '/images/im1.jpg',
    '/images/im2.jpg',
    '/images/im3.jpg',
    '/images/im4.jpg',
    '/images/im5.jpg',
    '/images/im6.jpg',
    '/images/im7.jpg',
    '/images/im8.jpg',
    '/images/im9.jpg',
    '/images/im10.jpg',
    '/images/im11.jpg',
    '/images/im12.jpg',
    '/images/im13.jpg',
    '/images/im14.jpg',
    '/images/im15.jpg',
    '/images/im16.jpg',
    '/images/im17.jpg',
    '/images/im18.jpg',
    '/images/im19.jpg',
    '/images/im20.jpg',
    '/images/im21.jpg',
    '/images/im22.jpg',
    '/images/im23.jpg',
    '/images/im24.jpg',
    '/images/im25.jpg',
    '/images/im26.jpg',
    '/images/im27.jpg',
    '/images/im28.jpg',
  ]

  const showcaseVideos = [
    '/videos/ve1.mp4',
    '/videos/ve2.mp4',
    '/videos/ve3.mp4',
  ]

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
        description:
          'Artisanat du pain depuis 1985 — Nos pâtisseries et pains cuits au four traditionnel avec les meilleurs ingrédients locaux.',
        viewProducts: 'Voir les Produits',
        contactUs: 'Contactez-nous',
      },
      about: {
        heading: 'Notre Histoire',
        text: 'Depuis plus de quatre décennies, la famille Benali perpétu le savoir-faire du pain traditionnel marocain. Chaque création est façonnée à la main et cuite dans notre four à bois, pour une qualité supérieure et un goût authentique.',
      },
      products: {
        heading: 'Nos Délices',
        items: [
          {
            name: 'Pain Traditionnel',
            img: '/images/im2.jpg',
            desc: "Croûte dorée, cœur tendre — L'essence du pain frais.",
          },
          {
            name: 'Croissant aux Amandes',
            img: '/images/im7.jpg',
            desc: "Feuilleté léger garni de pâte d'amande maison.",
          },
          {
            name: 'Makrout aux Dates',
            img: '/images/im15.jpg',
            desc: 'Dattes sucrées dans une pâte parfumée au miel.',
          },
        ],
      },
      why: {
        heading: 'Pourquoi Choisir Bread House',
        points: [
          'Artisanat authentique depuis 1985',
          'Ingrédients biologiques locaux',
          'Cuisson au four à bois traditionnel',
          'Engagement zéro gaspillage',
        ],
      },
      gallery: { heading: 'Galerie' },
      videos: { heading: 'Vidéos' },
      contact: {
        heading: 'Contact',
        submit: 'Envoyer',
        placeholderName: 'Nom',
        placeholderEmail: 'Email',
        placeholderMessage: 'Message',
      },
    },
    EN: {
      nav: {
        home: 'Home',
        products: 'Products',
        about: 'About',
        why: 'Why Us',
        gallery: 'Gallery',
        videos: 'Videos',
        contact: 'Contact',
      },
      hero: {
        title: 'Bread House',
        subtitle: 'Morocco',
        description:
          'Bread craftsmanship since 1985 — Our pastries and breads baked in traditional ovens with the finest local ingredients.',
        viewProducts: 'View Products',
        contactUs: 'Contact Us',
      },
      about: {
        heading: 'Our Story',
        text: 'For over four decades, the Benali family has preserved the Moroccan tradition of bread making. Every loaf is hand-shaped and wood-fired for superior quality and authentic taste.',
      },
      products: {
        heading: 'Our Delicacies',
        items: [
          {
            name: 'Traditional Bread',
            img: '/images/im2.jpg',
            desc: 'Golden crust, soft crumb — The essence of fresh bread.',
          },
          {
            name: 'Almond Croissant',
            img: '/images/im7.jpg',
            desc: 'Light flaky pastry with homemade almond filling.',
          },
          {
            name: 'Date Makrout',
            img: '/images/im15.jpg',
            desc: 'Sweet dates in honey-scented dough.',
          },
        ],
      },
      why: {
        heading: 'Why Choose Us',
        points: [
          'Authentic craftsmanship since 1985',
          'Local organic ingredients',
          'Traditional wood-fired baking',
          'Zero-waste commitment',
        ],
      },
      gallery: { heading: 'Gallery' },
      videos: { heading: 'Videos' },
      contact: {
        heading: 'Contact',
        submit: 'Send',
        placeholderName: 'Name',
        placeholderEmail: 'Email',
        placeholderMessage: 'Message',
      },
    },
  }

  const t = content[language]

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setForm({ name: '', email: '', message: '' })
  }

  // Animated counters for statistics section
  useEffect(() => {
    // Counters animation (existing code remains unchanged)
    const counters = document.querySelectorAll<HTMLElement>('.counter')
    const animate = (el: HTMLElement) => {
      const target = el.dataset.target ? parseFloat(el.dataset.target) : 0
      const isDecimal = target % 1 !== 0
      const duration = 2000
      const start = performance.now()
      const step = (timestamp: number) => {
        const progress = Math.min((timestamp - start) / duration, 1)
        const value = isDecimal
          ? (progress * target).toFixed(1)
          : Math.floor(progress * target)
        el.textContent = value.toString()
        if (progress < 1) {
          requestAnimationFrame(step)
        }
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
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 shadow-sm border-b border-beige/30 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Image
              src="/logo2.png"
              alt="Logo"
              width={250}
              height={85}
              className="h-20 w-auto"
            />
          </div>

          {/* Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              'home',
              'products',
              'about',
              'why',
              'gallery',
              'videos',
              'contact',
            ].map((key) => (
              <a
                key={key}
                href={`#${key === 'home' ? '' : key}`}
                className="text-white font-serif font-medium text-sm tracking-wider transition-all duration-300 hover:text-accent-gold hover:scale-105 transform"
              >
                {t.nav[key as keyof typeof t.nav]}
              </a>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-beige/50 rounded-full p-1.5">
            {['FR', 'EN'].map((lng) => (
              <button
                key={lng}
                onClick={() => setLanguage(lng as 'FR' | 'EN')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase transition-all ${
                  language === lng
                    ? 'bg-white text-primary shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {lng}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Premium Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <Image
            src="/Face.jpeg"
            alt="Hero"
            fill
            className="object-cover object-[center_-40%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/60 to-transparent" />
          <div className="absolute inset-0 bg-primary/40" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight tracking-tighter">
            {t.hero.title}
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-primary/90 mb-6">
            {t.hero.subtitle}
          </p>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <a
              href="#products"
              className="px-12 py-5 bg-primary text-white font-semibold rounded-lg uppercase tracking-wider hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {t.hero.viewProducts}
            </a>
            <a
              href="#contact"
              className="px-12 py-5 border-2 border-white/60 text-white font-semibold rounded-lg uppercase tracking-wider hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {t.hero.contactUs}
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-beige/30" data-animate>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-8">
            {t.about.heading}
          </h2>
          <p className="text-primary/70 leading-relaxed text-lg">
            {t.about.text}
          </p>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary text-center mb-20">
            {t.products.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {t.products.items.map((item, idx) => (
              <div
                key={idx}
                className="relative group bg-white rounded-2xl overflow-hidden border border-beige/30 hover:border-primary transition-all duration-500 hover:shadow-xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-primary mb-4 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-primary/80 text-base leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-6 pt-6 border-t border-beige/30">
                    <button className="text-primary font-medium text-sm uppercase tracking-wider hover:text-accent-gold transition-colors">
                      Discover More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="py-20 bg-beige/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-12">
            {t.why.heading}
          </h2>
          <ul className="space-y-4 text-left">
            {t.why.points.map((pt, i) => (
              <li key={i} className="flex items-start">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-accent-gold mt-1 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 5.292a1 1 0 010 1.416L8.414 15l-4.12-4.12a1 1 0 111.415-1.415L8.414 12.17l7.875-7.876a1 1 0 011.415 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-primary font-medium">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Statistics */}
      <section id="stats" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-12">
            Our Luxury Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-6 bg-beige/20 rounded-xl hover:shadow-xl transition-shadow">
              <div
                className="text-5xl font-serif text-primary counter"
                data-target="20"
              >
                0
              </div>
              <div className="mt-2 text-lg font-medium text-primary/80">
                Years of Experience
              </div>
            </div>
            <div className="flex flex-col items-center p-6 bg-beige/20 rounded-xl hover:shadow-xl transition-shadow">
              <div
                className="text-5xl font-serif text-primary counter"
                data-target="500"
              >
                0
              </div>
              <div className="mt-2 text-lg font-medium text-primary/80">
                Weekly Customers
              </div>
            </div>
            <div className="flex flex-col items-center p-6 bg-beige/20 rounded-xl hover:shadow-xl transition-shadow">
              <div
                className="text-5xl font-serif text-primary counter"
                data-target="100"
              >
                0
              </div>
              <div className="mt-2 text-lg font-medium text-primary/80">
                Fresh Ingredients
              </div>
            </div>
            <div className="flex flex-col items-center p-6 bg-beige/20 rounded-xl hover:shadow-xl transition-shadow">
              <div
                className="text-5xl font-serif text-primary counter"
                data-target="4.9"
              >
                0
              </div>
              <div className="mt-2 text-lg font-medium text-primary/80">
                Customer Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section id="trust" className="py-20 bg-beige/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-12">
            Our Trusted Heritage
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Artisan Since 1985 */}
            <div className="flex flex-col items-center p-4 hover:scale-105 transition-transform">
              <Award className="w-8 h-8 text-primary mb-2" />
              <span className="font-medium text-primary">
                Artisan Since 1985
              </span>
            </div>
            {/* Fresh Daily */}
            <div className="flex flex-col items-center p-4 hover:scale-105 transition-transform">
              <Leaf className="w-8 h-8 text-primary mb-2" />
              <span className="font-medium text-primary">Fresh Daily</span>
            </div>
            {/* Handmade Products */}
            <div className="flex flex-col items-center p-4 hover:scale-105 transition-transform">
              <HandHeart className="w-8 h-8 text-primary mb-2" />
              <span className="font-medium text-primary">
                Handmade Products
              </span>
            </div>
            {/* Premium Ingredients */}
            <div className="flex flex-col items-center p-4 hover:scale-105 transition-transform">
              <Star className="w-8 h-8 text-primary mb-2" />
              <span className="font-medium text-primary">
                Premium Ingredients
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-beige/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              className="testimonial p-6 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-opacity transition-transform duration-700"
              data-animate
            >
              <div className="flex items-center mb-4 text-yellow-400">
                ★★★★★
              </div>
              <p className="text-primary/90 mb-4">
                "Bread House transports me back to my childhood. The brioche is
                buttery perfection, and the almond croissant melts in my mouth.
                A true taste of Morocco's heritage!"
              </p>
              <p className="font-medium text-primary">Amina El‑Hadi</p>
            </div>
            {/* Card 2 */}
            <div
              className="testimonial p-6 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-opacity transition-transform duration-700"
              data-animate
            >
              <div className="flex items-center mb-4 text-yellow-400">
                ★★★★★
              </div>
              <p className="text-primary/90 mb-4">
                "Every Sunday I come for the fresh sourdough. The crust is
                perfectly crisp, the crumb airy, and the aroma is irresistible.
                Highly recommend to any bread lover!"
              </p>
              <p className="font-medium text-primary">Youssef Ben‑Said</p>
            </div>
            {/* Card 3 */}
            <div
              className="testimonial p-6 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-opacity transition-transform duration-700"
              data-animate
            >
              <div className="flex items-center mb-4 text-yellow-400">
                ★★★★★
              </div>
              <p className="text-primary/90 mb-4">
                "The bakery’s dedication to local, organic ingredients shines
                through. The honey‑drizzled fig tart is a masterpiece that keeps
                me coming back."
              </p>
              <p className="font-medium text-primary">Leila Ouarzazi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary text-center mb-16">
            {t.gallery.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {galleryImages.map((src, idx) => (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden rounded-2xl border border-beige/30 hover:shadow-xl transition-all duration-500 group"
              >
                <Image
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105 group-hover:scale-108"
                />
                {/* Subtle depth overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-15 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section id="videos" className="py-22 bg-beige/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-16">
            {t.videos.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseVideos.map((src, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-xl overflow-hidden shadow-md border border-beige/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="aspect-video">
                  <video
                    src={src}
                    controls
                    className="w-full h-full object-cover"
                    poster="/images/im1.jpg"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-12">
            {t.contact.heading}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Information Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-beige/20 rounded-xl">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-primary">Bread House</p>
                  <p className="text-sm text-primary/80">Av. Assalam, Salé</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-beige/20 rounded-xl">
                <Phone className="w-6 h-6 text-primary" />
                <p className="text-primary">+212 537-883303</p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-beige/20 rounded-xl">
                <MessageSquare className="w-6 h-6 text-primary" />
                <p className="text-primary">WhatsApp: +212 537-883303</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-beige/20 rounded-xl">
                <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary">Opening Hours</p>
                  <ul className="text-sm text-primary/80 mt-1 space-y-0.5">
                    <li>Monday: 5:30am–10pm</li>
                    <li>Tuesday: 6:30am–10pm</li>
                    <li>Wednesday: 6:30am–10pm</li>
                    <li>Thursday: 6:30am–10pm</li>
                    <li>Friday: 6:30am–10pm</li>
                    <li>Saturday: 6:30am–10pm</li>
                    <li>Sunday: 6:30am–10pm</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="grid gap-5">
              <input
                type="text"
                name="name"
                placeholder={t.contact.placeholderName}
                value={form.name}
                onChange={handleInput}
                required
                className="w-full px-6 py-4 bg-beige/30 border border-beige/50 rounded-full focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder={t.contact.placeholderEmail}
                value={form.email}
                onChange={handleInput}
                required
                className="w-full px-6 py-4 bg-beige/30 border border-beige/50 rounded-full focus:outline-none focus:border-primary transition-colors"
              />
              <textarea
                name="message"
                placeholder={t.contact.placeholderMessage}
                value={form.message}
                onChange={handleInput}
                required
                rows={5}
                className="w-full px-6 py-4 bg-beige/30 border border-beige/50 rounded-2xl focus:outline-none focus:border-primary transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-primary text-white font-semibold rounded-full uppercase tracking-wider hover:bg-secondary transition-all shadow-lg"
              >
                {t.contact.submit}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Find Us */}
      <section id="find-us" className="py-18 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-12">
            Find Us
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.3621773686527!2d-6.807602417192586!3d34.060228848104984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7697b52825ea7%3A0x78d139534f65e892!2sBread%20House!5e0!3m2!1sen!2sus!4v1780320427826!5m2!1sen!2sus"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a66b] to-transparent mb-10"></div>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logo2.png"
              alt="Bread House Logo"
              width={200}
              height={70}
              className="mb-4"
            />
            <p className="text-white/70 text-sm max-w-xs">
              Crafting artisanal breads and pastries in Morocco since 1985.
              Quality and tradition in every bite.
            </p>
          </div>
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center text-white">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-sm">Av. Assalam, Salé</span>
            </div>
            <div className="flex items-center text-white">
              <Phone className="w-5 h-5 mr-2" />
              <span className="text-sm">+212 537-883303</span>
            </div>
            <div className="flex items-center text-white">
              <MessageSquare className="w-5 h-5 mr-2" />
              <a
                href="https://wa.me/212537883303"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-accent-gold transition-colors"
              >
                +212 537-883303
              </a>
            </div>
            <div className="flex items-center text-white">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm">Mon‑Sun: 5:30am–10pm</span>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            {['home', 'products', 'about', 'contact'].map((key) => (
              <a
                key={key}
                href={`#${key === 'home' ? '' : key}`}
                className="text-white/70 hover:text-accent-gold text-sm transition-colors"
              >
                {t.nav[key as keyof typeof t.nav]}
              </a>
            ))}
            <a
              href="https://www.instagram.com/breadhousemorocco"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center mt-2 text-white/70 hover:text-accent-gold transition-all duration-300 hover:scale-105"
            >
              <FaInstagram className="w-5 h-5 mr-1" />
              @breadhousemorocco
            </a>
          </div>
          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-serif text-xl text-white mb-2">
              Bread House Morocco
            </h3>
            <p className="text-primary/60 text-sm">
              © {new Date().getFullYear()} — Tous droits réservés
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/212600000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-accent-gold text-primary rounded-full p-4 shadow-2xl hover:shadow-primary/50 transition-all animate-pulse"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 2.1.64 4.07 1.74 5.73L2 22l4.48-1.73A9.92 9.92 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm3.73 13.62c-.16.44-1.15 2.18-2.78 2.18-1.64 0-2.26-1.2-4.24-1.2-1.98 0-4.03 2.09-4.03 2.09l-.05-.04c-.21-.07-.43-.12-.65-.12-.23 0-.45.03-.66.09C2.02 14.46 2 13.4 2 12.31 2 6.7 6.7 5 12.31 5c4.78 0 7.69 2.94 7.69 7.69 0 .74-.08 1.4-.24 2.04z" />
        </svg>
      </a>
    </div>
  )
}

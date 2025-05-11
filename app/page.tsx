"use client"

import { useState, useEffect } from "react"
import {
  Phone,
  Mail,
  MapPin,
  QrCode,
  Instagram,
  Facebook,
  Twitter,
  PhoneIcon as WhatsApp,
  MessageSquare,
  Cloud,
  Download,
  Share2,
  ExternalLink,
  Sparkles,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function DigitalCard() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [emailCopied, setEmailCopied] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)

  const personalInfo = {
    name: "Yorgo Angelopoulos",
    title: "Exchange Global",
    company: "Exchange Global",
    website: "exchangeglobal.net",
    websiteUrl: "https://exchangeglobal.net",
    phone: "+90 850 430 02 67",
    phoneNoSpaces: "+908504300267",
    email: "yorgoangelopoulos@gmail.com",
    telegram: "yorgoangelopoulos",
    address: "Adres bilgileri için lütfen iletişime geçin.",
    socialMedia: {
      twitter: "https://x.com/ExchangeGlobal1",
      bluesky: "https://bsky.app/profile/yorgoangelopoulos.bsky.social",
      instagram: "https://www.instagram.com/exchang.eglobal/",
      facebook: "https://www.facebook.com/exchangeglobal/",
    },
  }

  // QR kod oluşturma
  useEffect(() => {
    // QR kod URL'sini oluştur
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      personalInfo.websiteUrl,
    )}&color=0e84ff&bgcolor=17181d`
    setQrCodeUrl(qrCodeApiUrl)
  }, [personalInfo.websiteUrl])

  const handleAddToContacts = () => {
    // vCard oluşturma mantığı burada olacak
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${personalInfo.name}
ORG:${personalInfo.company}
TITLE:${personalInfo.title}
TEL:${personalInfo.phone}
EMAIL:${personalInfo.email}
URL:${personalInfo.website}
END:VCARD`

    const blob = new Blob([vcard], { type: "text/vcard" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${personalInfo.name}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCall = () => {
    window.open("https://wa.me/+908504300267", "_blank")
  }

  const openWhatsApp = () => {
    // WhatsApp web URL'sini açalım - doğrudan numarayı kullanarak
    window.open(`https://wa.me/${personalInfo.phoneNoSpaces}`, "_blank")
  }

  const openTelegram = () => {
    window.open("https://t.me/yorgoangelopoulos", "_blank")
  }

  const handleEmailClick = (e) => {
    e.preventDefault()

    // E-posta adresini panoya kopyala
    navigator.clipboard
      .writeText(personalInfo.email)
      .then(() => {
        setEmailCopied(true)
        setTimeout(() => setEmailCopied(false), 2000)
        toast({
          title: "Posta adresi kopyalanmıştır",
          description: personalInfo.email,
          className: "bg-green-500 text-white border-green-600",
        })
      })
      .catch((err) => {
        console.error("Kopyalama hatası:", err)
        toast({
          title: "Kopyalama hatası",
          description: "Lütfen e-posta adresini manuel olarak kopyalayın",
          variant: "destructive",
        })
      })
  }

  const copyToClipboard = (text, field) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedField(field)
        setTimeout(() => setCopiedField(null), 2000)
        toast({
          title: "Kopyalandı",
          description: text,
          className: "bg-green-500 text-white border-green-600",
        })
      })
      .catch((err) => {
        console.error("Kopyalama hatası:", err)
        toast({
          title: "Kopyalama hatası",
          description: "Lütfen metni manuel olarak kopyalayın",
          variant: "destructive",
        })
      })
  }

  const closeModal = () => setActiveModal(null)

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      fetch(qrCodeUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = "yorgo-angelopoulos-qr.png"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        })
        .catch((error) => {
          console.error("QR kod indirme hatası:", error)
          toast({
            title: "QR kod indirme hatası",
            description: "Lütfen tekrar deneyin",
            variant: "destructive",
          })
        })
    }
  }

  const shareQRCode = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Yorgo Angelopoulos - Exchange Global",
          text: "İletişim bilgilerim",
          url: personalInfo.websiteUrl,
        })
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(personalInfo.websiteUrl)
        toast({
          title: "Bağlantı kopyalandı",
          description: personalInfo.websiteUrl,
          className: "bg-green-500 text-white border-green-600",
        })
      }
    } catch (error) {
      console.error("Paylaşım hatası:", error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#17181d] p-4">
      <Toaster />
      <div className="w-full max-w-md rounded-3xl bg-[#1e1f24] shadow-xl overflow-hidden border border-[#0e84ff]/20">
        {/* Header */}
        <div className="bg-[#1a1b20] p-4 relative">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0e84ff]">Exchange Global</h1>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mt-4">
          <div className="h-28 w-28 rounded-full border-2 border-[#0e84ff] overflow-hidden bg-[#17181d] shadow-[0_0_10px_rgba(14,132,255,0.5)] flex items-center justify-center">
            <img src="/eg-logo.png" alt="Exchange Global Logo" className="h-5/6 w-5/6 object-contain" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-[#0e84ff]">{personalInfo.name}</h2>
          <a
            href={personalInfo.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0e84ff] hover:text-[#0e84ff]/80 transition-colors duration-300 flex items-center gap-1"
          >
            <span>{personalInfo.website}</span>
            <ExternalLink size={14} />
          </a>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-4 w-full px-6">
            <Button
              className="rounded-md py-6 bg-[#0e84ff] hover:bg-[#0e84ff]/80 text-white transition-all duration-300 shadow-[0_0_10px_rgba(14,132,255,0.5)]"
              onClick={handleAddToContacts}
            >
              Rehbere Ekle
            </Button>
            <Button
              className="rounded-md py-6 bg-[#0e84ff] hover:bg-[#0e84ff]/80 text-white transition-all duration-300 shadow-[0_0_10px_rgba(14,132,255,0.5)]"
              onClick={handleCall}
            >
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Feature Buttons */}
        <div className="grid grid-cols-3 gap-4 p-6">
          <button
            className="flex flex-col items-center justify-center rounded-lg bg-[#1a1b20] p-4 text-white border border-[#0e84ff]/30 hover:border-[#0e84ff] transition-all duration-300 shadow-[0_0_5px_rgba(14,132,255,0.2)] hover:shadow-[0_0_8px_rgba(14,132,255,0.4)]"
            onClick={() => setActiveModal("social")}
          >
            <div className="grid grid-cols-2 gap-1">
              <Instagram size={18} className="text-[#0e84ff]" />
              <Facebook size={18} className="text-[#0e84ff]" />
              <Twitter size={18} className="text-[#0e84ff]" />
              <Mail size={18} className="text-[#0e84ff]" />
            </div>
            <span className="mt-2 text-xs">Sosyal Medya</span>
          </button>

          <button
            className="flex flex-col items-center justify-center rounded-lg bg-[#1a1b20] p-4 text-white border border-[#0e84ff]/30 hover:border-[#0e84ff] transition-all duration-300 shadow-[0_0_5px_rgba(14,132,255,0.2)] hover:shadow-[0_0_8px_rgba(14,132,255,0.4)]"
            onClick={openWhatsApp}
          >
            <WhatsApp size={24} className="text-[#0e84ff]" />
            <span className="mt-2 text-xs">WhatsApp</span>
          </button>

          <button
            className="flex flex-col items-center justify-center rounded-lg bg-[#1a1b20] p-4 text-white border border-[#0e84ff]/30 hover:border-[#0e84ff] transition-all duration-300 shadow-[0_0_5px_rgba(14,132,255,0.2)] hover:shadow-[0_0_8px_rgba(14,132,255,0.4)]"
            onClick={() => setActiveModal("contact")}
          >
            <Phone size={24} className="text-[#0e84ff]" />
            <span className="mt-2 text-xs">İletişim Bilgileri</span>
          </button>

          <button
            className="flex flex-col items-center justify-center rounded-lg bg-[#1a1b20] p-4 text-white border border-[#0e84ff]/30 hover:border-[#0e84ff] transition-all duration-300 shadow-[0_0_5px_rgba(14,132,255,0.2)] hover:shadow-[0_0_8px_rgba(14,132,255,0.4)]"
            onClick={() => setActiveModal("address")}
          >
            <MapPin size={24} className="text-[#0e84ff]" />
            <span className="mt-2 text-xs">Adres Bilgileri</span>
          </button>

          <button
            className="flex flex-col items-center justify-center rounded-lg bg-[#1a1b20] p-4 text-white border border-[#0e84ff]/30 hover:border-[#0e84ff] transition-all duration-300 shadow-[0_0_5px_rgba(14,132,255,0.2)] hover:shadow-[0_0_8px_rgba(14,132,255,0.4)]"
            onClick={() => setActiveModal("qr")}
          >
            <QrCode size={24} className="text-[#0e84ff]" />
            <span className="mt-2 text-xs">QR Kod</span>
          </button>

          <button
            onClick={handleEmailClick}
            className="flex flex-col items-center justify-center rounded-lg bg-[#1a1b20] p-4 text-white border border-[#0e84ff]/30 hover:border-[#0e84ff] transition-all duration-300 shadow-[0_0_5px_rgba(14,132,255,0.2)] hover:shadow-[0_0_8px_rgba(14,132,255,0.4)]"
          >
            {emailCopied ? (
              <Check size={24} className="text-green-500" />
            ) : (
              <Mail size={24} className="text-[#0e84ff]" />
            )}
            <span className="mt-2 text-xs">E-posta</span>
          </button>

          <button
            className="flex flex-col items-center justify-center rounded-lg bg-[#1a1b20] p-4 text-white border border-[#0e84ff]/30 hover:border-[#0e84ff] transition-all duration-300 shadow-[0_0_5px_rgba(14,132,255,0.2)] hover:shadow-[0_0_8px_rgba(14,132,255,0.4)]"
            onClick={openTelegram}
          >
            <MessageSquare size={24} className="text-[#0e84ff]" />
            <span className="mt-2 text-xs">Telegram</span>
          </button>
        </div>

        <div className="py-4 text-center text-sm text-gray-400">
          <div className="flex items-center justify-center gap-1">
            <Sparkles size={14} className="text-[#0e84ff]" />
            <span>Exchange Global</span>
            <Sparkles size={14} className="text-[#0e84ff]" />
          </div>
        </div>
      </div>

      {/* Modals */}
      <Dialog open={activeModal === "social"} onOpenChange={closeModal}>
        <DialogContent className="bg-[#1a1b20] text-white border border-[#0e84ff]/30">
          <DialogHeader>
            <DialogTitle className="text-[#0e84ff] text-xl font-bold">Sosyal Medya</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <a
              href={personalInfo.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-[#17181d] hover:bg-[#1e1f24] border border-[#0e84ff]/20 hover:border-[#0e84ff]/50 transition-all duration-300"
            >
              <Twitter className="text-[#0e84ff]" />
              <span>Twitter</span>
            </a>
            <a
              href={personalInfo.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-[#17181d] hover:bg-[#1e1f24] border border-[#0e84ff]/20 hover:border-[#0e84ff]/50 transition-all duration-300"
            >
              <Instagram className="text-[#0e84ff]" />
              <span>Instagram</span>
            </a>
            <a
              href={personalInfo.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-[#17181d] hover:bg-[#1e1f24] border border-[#0e84ff]/20 hover:border-[#0e84ff]/50 transition-all duration-300"
            >
              <Facebook className="text-[#0e84ff]" />
              <span>Facebook</span>
            </a>
            <a
              href={personalInfo.socialMedia.bluesky}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-[#17181d] hover:bg-[#1e1f24] border border-[#0e84ff]/20 hover:border-[#0e84ff]/50 transition-all duration-300"
            >
              <Cloud className="text-[#0e84ff]" />
              <span>Bluesky</span>
            </a>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "contact"} onOpenChange={closeModal}>
        <DialogContent className="bg-[#1a1b20] text-white border border-[#0e84ff]/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#0e84ff] text-xl font-bold text-center">İletişim Bilgileri</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* WhatsApp */}
            <div className="contact-card transform transition-all duration-300 hover:scale-105">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#25D366]/10 to-[#25D366]/5 border border-[#25D366]/30">
                <div className="absolute top-0 left-0 w-16 h-16 -translate-x-6 -translate-y-6 rounded-full bg-[#25D366]/20"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 translate-x-6 translate-y-6 rounded-full bg-[#25D366]/20"></div>

                <div className="p-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center shadow-lg">
                      <WhatsApp size={24} className="text-[#25D366]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">WhatsApp</p>
                      <p className="text-white text-lg font-semibold">{personalInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(personalInfo.phone, "whatsapp")}
                      className="p-2 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors"
                      title="Kopyala"
                      aria-label="WhatsApp numarasını kopyala"
                    >
                      {copiedField === "whatsapp" ? (
                        <Check size={18} className="text-[#25D366]" />
                      ) : (
                        <Copy size={18} className="text-[#25D366]" />
                      )}
                    </button>
                    <button
                      onClick={openWhatsApp}
                      className="p-2 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors"
                      title="WhatsApp'ta Aç"
                      aria-label="WhatsApp'ta aç"
                    >
                      <ArrowUpRight size={18} className="text-[#25D366]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Telegram */}
            <div className="contact-card transform transition-all duration-300 hover:scale-105">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0088cc]/10 to-[#0088cc]/5 border border-[#0088cc]/30">
                <div className="absolute top-0 left-0 w-16 h-16 -translate-x-6 -translate-y-6 rounded-full bg-[#0088cc]/20"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 translate-x-6 translate-y-6 rounded-full bg-[#0088cc]/20"></div>

                <div className="p-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0088cc]/20 flex items-center justify-center shadow-lg">
                      <MessageSquare size={24} className="text-[#0088cc]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">Telegram</p>
                      <p className="text-white text-lg font-semibold">{personalInfo.telegram}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(personalInfo.telegram, "telegram")}
                      className="p-2 rounded-full bg-[#0088cc]/10 hover:bg-[#0088cc]/20 transition-colors"
                      title="Kopyala"
                      aria-label="Telegram kullanıcı adını kopyala"
                    >
                      {copiedField === "telegram" ? (
                        <Check size={18} className="text-[#0088cc]" />
                      ) : (
                        <Copy size={18} className="text-[#0088cc]" />
                      )}
                    </button>
                    <button
                      onClick={openTelegram}
                      className="p-2 rounded-full bg-[#0088cc]/10 hover:bg-[#0088cc]/20 transition-colors"
                      title="Telegram'da Aç"
                      aria-label="Telegram'da aç"
                    >
                      <ArrowUpRight size={18} className="text-[#0088cc]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Facebook */}
            <div className="contact-card transform transition-all duration-300 hover:scale-105">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1877F2]/10 to-[#1877F2]/5 border border-[#1877F2]/30">
                <div className="absolute top-0 left-0 w-16 h-16 -translate-x-6 -translate-y-6 rounded-full bg-[#1877F2]/20"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 translate-x-6 translate-y-6 rounded-full bg-[#1877F2]/20"></div>

                <div className="p-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1877F2]/20 flex items-center justify-center shadow-lg">
                      <Facebook size={24} className="text-[#1877F2]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">Facebook</p>
                      <p className="text-white text-lg font-semibold">Exchange Global</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard("Exchange Global", "facebook")}
                      className="p-2 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 transition-colors"
                      title="Kopyala"
                      aria-label="Facebook kullanıcı adını kopyala"
                    >
                      {copiedField === "facebook" ? (
                        <Check size={18} className="text-[#1877F2]" />
                      ) : (
                        <Copy size={18} className="text-[#1877F2]" />
                      )}
                    </button>
                    <a
                      href={personalInfo.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 transition-colors"
                      title="Facebook'ta Aç"
                      aria-label="Facebook'ta aç"
                    >
                      <ArrowUpRight size={18} className="text-[#1877F2]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Twitter */}
            <div className="contact-card transform transition-all duration-300 hover:scale-105">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1DA1F2]/10 to-[#1DA1F2]/5 border border-[#1DA1F2]/30">
                <div className="absolute top-0 left-0 w-16 h-16 -translate-x-6 -translate-y-6 rounded-full bg-[#1DA1F2]/20"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 translate-x-6 translate-y-6 rounded-full bg-[#1DA1F2]/20"></div>

                <div className="p-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1DA1F2]/20 flex items-center justify-center shadow-lg">
                      <Twitter size={24} className="text-[#1DA1F2]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">Twitter</p>
                      <p className="text-white text-lg font-semibold">@ExchangeGlobal1</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard("@ExchangeGlobal1", "twitter")}
                      className="p-2 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 transition-colors"
                      title="Kopyala"
                      aria-label="Twitter kullanıcı adını kopyala"
                    >
                      {copiedField === "twitter" ? (
                        <Check size={18} className="text-[#1DA1F2]" />
                      ) : (
                        <Copy size={18} className="text-[#1DA1F2]" />
                      )}
                    </button>
                    <a
                      href={personalInfo.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 transition-colors"
                      title="Twitter'da Aç"
                      aria-label="Twitter'da aç"
                    >
                      <ArrowUpRight size={18} className="text-[#1DA1F2]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div className="contact-card transform transition-all duration-300 hover:scale-105">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#E1306C]/10 to-[#E1306C]/5 border border-[#E1306C]/30">
                <div className="absolute top-0 left-0 w-16 h-16 -translate-x-6 -translate-y-6 rounded-full bg-[#E1306C]/20"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 translate-x-6 translate-y-6 rounded-full bg-[#E1306C]/20"></div>

                <div className="p-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E1306C]/20 flex items-center justify-center shadow-lg">
                      <Instagram size={24} className="text-[#E1306C]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">Instagram</p>
                      <p className="text-white text-lg font-semibold">@exchang.eglobal</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard("@exchang.eglobal", "instagram")}
                      className="p-2 rounded-full bg-[#E1306C]/10 hover:bg-[#E1306C]/20 transition-colors"
                      title="Kopyala"
                      aria-label="Instagram kullanıcı adını kopyala"
                    >
                      {copiedField === "instagram" ? (
                        <Check size={18} className="text-[#E1306C]" />
                      ) : (
                        <Copy size={18} className="text-[#E1306C]" />
                      )}
                    </button>
                    <a
                      href={personalInfo.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#E1306C]/10 hover:bg-[#E1306C]/20 transition-colors"
                      title="Instagram'da Aç"
                      aria-label="Instagram'da aç"
                    >
                      <ArrowUpRight size={18} className="text-[#E1306C]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="contact-card transform transition-all duration-300 hover:scale-105">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#EA4335]/10 to-[#EA4335]/5 border border-[#EA4335]/30">
                <div className="absolute top-0 left-0 w-16 h-16 -translate-x-6 -translate-y-6 rounded-full bg-[#EA4335]/20"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 translate-x-6 translate-y-6 rounded-full bg-[#EA4335]/20"></div>

                <div className="p-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#EA4335]/20 flex items-center justify-center shadow-lg">
                      <Mail size={24} className="text-[#EA4335]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">E-posta</p>
                      <p className="text-white text-lg font-semibold truncate max-w-[180px]">{personalInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(personalInfo.email, "email")}
                      className="p-2 rounded-full bg-[#EA4335]/10 hover:bg-[#EA4335]/20 transition-colors"
                      title="Kopyala"
                      aria-label="E-posta adresini kopyala"
                    >
                      {copiedField === "email" ? (
                        <Check size={18} className="text-[#EA4335]" />
                      ) : (
                        <Copy size={18} className="text-[#EA4335]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={handleAddToContacts}
              className="bg-gradient-to-r from-[#0e84ff] to-[#0560ff] hover:from-[#0560ff] hover:to-[#0e84ff] text-white border-none shadow-lg shadow-[#0e84ff]/20 transition-all duration-500"
            >
              Tüm Bilgileri Rehbere Ekle
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "address"} onOpenChange={closeModal}>
        <DialogContent className="bg-[#1a1b20] text-white border border-[#0e84ff]/30">
          <DialogHeader>
            <DialogTitle className="text-[#0e84ff] text-xl font-bold">Adres Bilgileri</DialogTitle>
          </DialogHeader>
          <div className="p-4 rounded-lg bg-gradient-to-r from-[#17181d] to-[#1c1d24] border border-[#0e84ff]/20 flex flex-col items-center">
            <p className="text-center mb-4">{personalInfo.address}</p>
            <Button onClick={openWhatsApp} className="flex items-center gap-2 bg-[#0e84ff] hover:bg-[#0e84ff]/80">
              <WhatsApp size={16} />
              <span>İletişime Geç</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "qr"} onOpenChange={closeModal}>
        <DialogContent className="bg-[#1a1b20] text-white border border-[#0e84ff]/30">
          <DialogHeader>
            <DialogTitle className="text-[#0e84ff] text-xl font-bold">QR Kod</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <div className="p-2 border-2 border-[#0e84ff]/50 rounded-lg shadow-[0_0_10px_rgba(14,132,255,0.3)] bg-[#17181d]">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl || "/placeholder.svg"}
                  alt="QR Code"
                  className="h-48 w-48 rounded-md"
                  onError={(e) => {
                    console.error("QR kod yüklenemedi")
                    e.currentTarget.src = "/qr-code.png"
                  }}
                />
              ) : (
                <img src="/qr-code.png" alt="QR Code" className="h-48 w-48 rounded-md" />
              )}
            </div>
            <p className="text-center text-sm text-gray-400 mt-2 mb-4">
              Bu QR kodu taratarak kartviziti paylaşabilirsiniz
            </p>
            <div className="flex gap-4 mt-2">
              <Button onClick={downloadQRCode} className="flex items-center gap-2 bg-[#0e84ff] hover:bg-[#0e84ff]/80">
                <Download size={16} />
                <span>İndir</span>
              </Button>
              <Button onClick={shareQRCode} className="flex items-center gap-2 bg-[#0e84ff] hover:bg-[#0e84ff]/80">
                <Share2 size={16} />
                <span>Paylaş</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "share"} onOpenChange={closeModal}>
        <DialogContent className="bg-[#1a1b20] text-white border border-[#0e84ff]/30">
          <DialogHeader>
            <DialogTitle className="text-[#0e84ff] text-xl font-bold">Paylaş</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <button
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[#17181d] hover:bg-[#1e1f24] border border-[#0e84ff]/20 hover:border-[#0e84ff]/50 transition-all duration-300"
              onClick={openWhatsApp}
            >
              <WhatsApp className="text-[#0e84ff]" size={24} />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handleEmailClick}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[#17181d] hover:bg-[#1e1f24] border border-[#0e84ff]/20 hover:border-[#0e84ff]/50 transition-all duration-300"
            >
              <Mail className="text-[#0e84ff]" size={24} />
              <span>E-posta</span>
            </button>
            <a
              href={personalInfo.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[#17181d] hover:bg-[#1e1f24] border border-[#0e84ff]/20 hover:border-[#0e84ff]/50 transition-all duration-300"
            >
              <Twitter className="text-[#0e84ff]" size={24} />
              <span>Twitter</span>
            </a>
            <a
              href={personalInfo.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[#17181d] hover:bg-[#1e1f24] border border-[#0e84ff]/20 hover:border-[#0e84ff]/50 transition-all duration-300"
            >
              <Facebook className="text-[#0e84ff]" size={24} />
              <span>Facebook</span>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

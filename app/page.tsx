"use client"

import { useState } from "react"
import {
  Phone,
  Mail,
  MapPin,
  QrCode,
  Instagram,
  Facebook,
  Linkedin,
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function DigitalCard() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [emailCopied, setEmailCopied] = useState(false)

  const personalInfo = {
    name: "Yorgo Angelopoulos",
    title: "Exchange Global",
    company: "Exchange Global",
    website: "yorgoangelopoulos.app",
    websiteUrl: "https://yorgoangelopoulos.app",
    phone: "+90 850 430 02 67",
    phoneNoSpaces: "+908504300267",
    email: "yorgoangelopoulos@gmail.com",
    telegram: "yorgoangelopoulos",
    address: "Adres bilgileri için lütfen iletişime geçin.",
    socialMedia: {
      twitter: "https://x.com/ExchangeGlobal1",
      bluesky: "https://bsky.app/profile/yorgoangelopoulos.bsky.social",
    },
  }

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
        alert(`E-posta adresi kopyalandı: ${personalInfo.email}`)
      })
      .catch((err) => {
        console.error("Kopyalama hatası:", err)
        alert(`E-posta adresini manuel olarak kopyalayın: ${personalInfo.email}`)
      })
  }

  const closeModal = () => setActiveModal(null)

  const downloadQRCode = () => {
    const link = document.createElement("a")
    link.href = "/qr-code.png"
    link.download = "yorgo-angelopoulos-qr.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
        alert("Bağlantı panoya kopyalandı!")
      }
    } catch (error) {
      console.error("Paylaşım hatası:", error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#17181d] p-4">
      <div className="w-full max-w-md rounded-3xl bg-[#1e1f24] shadow-xl overflow-hidden border border-[#0e84ff]/20">
        {/* Header */}
        <div className="bg-[#1a1b20] p-4 relative">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0e84ff]">Exchange Global</h1>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mt-4">
          <div className="h-28 w-28 rounded-full border-2 border-[#0e84ff] overflow-hidden bg-transparent shadow-[0_0_10px_rgba(14,132,255,0.5)] flex items-center justify-center">
            <div className="h-full w-full bg-[#17181d] flex items-center justify-center">
              <img src="/eg-logo.png" alt={personalInfo.name} className="h-5/6 w-5/6 object-contain" />
            </div>
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
              <Linkedin size={18} className="text-[#0e84ff]" />
              <Facebook size={18} className="text-[#0e84ff]" />
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
            <DialogTitle className="text-white">Sosyal Medya</DialogTitle>
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
        <DialogContent className="bg-[#1a1b20] text-white border border-[#0e84ff]/30">
          <DialogHeader>
            <DialogTitle className="text-white">İletişim Bilgileri</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#17181d] border border-[#0e84ff]/20">
              <WhatsApp className="text-[#0e84ff]" />
              <div>
                <p className="text-sm text-gray-400">WhatsApp</p>
                <button
                  onClick={openWhatsApp}
                  className="text-[#0e84ff] hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  {personalInfo.phone}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#17181d] border border-[#0e84ff]/20">
              <MessageSquare className="text-[#0e84ff]" />
              <div>
                <p className="text-sm text-gray-400">Telegram</p>
                <button
                  onClick={openTelegram}
                  className="text-[#0e84ff] hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  {personalInfo.telegram}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#17181d] border border-[#0e84ff]/20">
              <Twitter className="text-[#0e84ff]" />
              <div>
                <p className="text-sm text-gray-400">Twitter</p>
                <a
                  href={personalInfo.socialMedia.twitter}
                  className="text-[#0e84ff] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @ExchangeGlobal1
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#17181d] border border-[#0e84ff]/20">
              <Cloud className="text-[#0e84ff]" />
              <div>
                <p className="text-sm text-gray-400">Bluesky</p>
                <a
                  href={personalInfo.socialMedia.bluesky}
                  className="text-[#0e84ff] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  yorgoangelopoulos.bsky.social
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#17181d] border border-[#0e84ff]/20">
              <Mail className="text-[#0e84ff]" />
              <div>
                <p className="text-sm text-gray-400">E-posta</p>
                <div className="flex items-center gap-2">
                  <span className="text-[#0e84ff]">{personalInfo.email}</span>
                  <button
                    onClick={handleEmailClick}
                    className="text-white bg-[#0e84ff] hover:bg-[#0e84ff]/80 p-1 rounded-md"
                    title="E-posta adresini kopyala"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "address"} onOpenChange={closeModal}>
        <DialogContent className="bg-[#1a1b20] text-white border border-[#0e84ff]/30">
          <DialogHeader>
            <DialogTitle className="text-white">Adres Bilgileri</DialogTitle>
          </DialogHeader>
          <div className="p-4 rounded-lg bg-[#17181d] border border-[#0e84ff]/20 flex flex-col items-center">
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
            <DialogTitle className="text-white">QR Kod</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <div className="p-2 border-2 border-[#0e84ff]/50 rounded-lg shadow-[0_0_10px_rgba(14,132,255,0.3)] bg-[#17181d]">
              <img src="/qr-code.png" alt="QR Code" className="h-48 w-48" />
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
            <DialogTitle className="text-white">Paylaş</DialogTitle>
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
              href={personalInfo.socialMedia.bluesky}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[#17181d] hover:bg-[#1e1f24] border border-[#0e84ff]/20 hover:border-[#0e84ff]/50 transition-all duration-300"
            >
              <Cloud className="text-[#0e84ff]" size={24} />
              <span>Bluesky</span>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

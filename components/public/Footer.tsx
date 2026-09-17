import { Mail, Phone, Globe, MapPin, ShieldCheck, Heart } from 'lucide-react'
import { workshopConfig } from '@/lib/config/workshop'

export default function Footer() {
  const { address } = workshopConfig

  return (
    <footer className="bg-[#05070B] border-t border-white/10 text-slate-400 py-16 relative z-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Brand & Mission */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt={workshopConfig.company}
                className="h-9 w-auto rounded-lg brightness-110"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs font-normal mb-4">
              Demystifying artificial intelligence and robotics for our local community through hands-on awareness sessions and live hardware demonstrations.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs font-semibold text-amber-400">
              <span className="text-amber-400">★★★★★</span>
              <span>5.0 Rating on Google Reviews</span>
            </div>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200 mb-4">
              Contact &amp; Inquiries
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${workshopConfig.phoneRaw}`}
                  className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                  <span>{workshopConfig.contactPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${workshopConfig.contactEmail}`}
                  className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                  <span>{workshopConfig.contactEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={workshopConfig.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Globe className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                  <span>weguide.work</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Venue & Location */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200 mb-4">
              Lab &amp; Workshop Venue
            </h3>
            <address className="not-italic space-y-2 text-sm text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 mt-1 text-cyan-400" aria-hidden="true" />
                <div>
                  <strong className="text-white font-semibold block">{workshopConfig.company} Robotics Lab</strong>
                  <span>{address.line1}</span><br />
                  <span>{address.locality}</span><br />
                  <span>{address.city}, {address.state} — {address.pincode}</span>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  <span>Get Directions on Google Maps</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Reassurance strip */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0F16] p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Community Educational Initiative by WeGuide AI • 100% Free Entry</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>for Palakkad &amp; Kerala Tech Community</span>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-white/[0.08] pt-8 text-center space-y-3">
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-4xl mx-auto">
            {workshopConfig.disclaimer}
          </p>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} {workshopConfig.company}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

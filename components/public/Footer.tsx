import { Mail, Phone, Globe, MapPin } from 'lucide-react'
import { workshopConfig } from '@/lib/config/workshop'

export default function Footer() {
  const { address } = workshopConfig

  return (
    <footer className="bg-slate-100/60 border-t border-slate-200/80 text-slate-600 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt={workshopConfig.company}
                className="h-9 w-auto rounded-lg shadow-xs"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs font-normal mb-3">
              Demystifying artificial intelligence and robotics for our local community
              through friendly, free awareness sessions and live demonstrations.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-3 py-1 text-xs font-semibold text-amber-800">
              <span className="text-amber-500">★★★★★</span>
              <span>5.0 on Google</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Contact &amp; Inquiries
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${workshopConfig.phoneRaw}`}
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>{workshopConfig.contactPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${workshopConfig.contactEmail}`}
                  className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>{workshopConfig.contactEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={workshopConfig.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <Globe className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>weguide.work</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Office &amp; Workshop Venue
            </h3>
            <address className="not-italic space-y-2 text-sm text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 mt-1 text-blue-600" aria-hidden="true" />
                <div>
                  <strong className="text-slate-900 font-semibold block">{workshopConfig.company}</strong>
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <span>Get Directions on Google Maps</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Interactive Google Map Embed */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-white/80 bg-white/80 shadow-md shadow-slate-200/50 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 bg-slate-50/80 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <MapPin className="h-4 w-4 text-blue-600" aria-hidden="true" />
              <span>Workshop Venue: 2nd Floor, Orchid Mall, Sekharipuram, Palakkad</span>
            </div>
            <a
              href={address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>Open Directions in Google Maps</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <iframe
            src={address.embedMapUrl}
            width="100%"
            height="240"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="We Guide Orchid Mall Palakkad Location Map"
            className="w-full"
          />
        </div>

        {/* Divider + Disclaimer */}
        <div className="border-t border-slate-200/80 pt-8">
          <p
            className="text-slate-400 leading-relaxed max-w-4xl mx-auto text-center font-normal"
            style={{ fontSize: '10px', lineHeight: '1.6' }}
          >
            {workshopConfig.disclaimer}
          </p>
          <p className="mt-4 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {workshopConfig.company}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

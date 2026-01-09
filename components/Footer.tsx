
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Play } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        {/* Brand Column */}
        <div className="space-y-8">
          <Link to="/" className="inline-block">
             <img src="https://lh3.googleusercontent.com/d/1nL_soXEMe720VRliyCDMODeuINsm7OJh" alt="Elite Inventory" className="w-[220px] h-auto" />
          </Link>
          <p className="text-slate-400 leading-relaxed text-sm text-justify font-light">
            Elite Inventory is the premier destination for verified digital infrastructure and professional software licenses. Instant delivery for global professionals.
          </p>
          <div className="flex space-x-4">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/eliteinventory.store" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#1877F2] text-white transition-all duration-300 group shadow-lg border border-white/10"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* X */}
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-black text-white transition-all duration-300 group shadow-lg border border-white/10">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.31 17.41z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#E4405F] text-white transition-all duration-300 group shadow-lg border border-white/10">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C8.74 0 8.33.015 7.05.073 5.77.13 4.9.332 4.14.627c-.783.303-1.446.708-2.11 1.372S.93 3.357.627 4.14C.332 4.9.13 5.77.073 7.05.015 8.33 0 8.74 0 12s.015 3.67.073 4.95c.057 1.28.258 2.15.553 2.91.303.783.708 1.446 1.372 2.11s1.372 1.07 2.11 1.372c.76.295 1.63.496 2.91.553 1.28.058 1.69.073 4.95.073s3.67-.015 4.95-.073c1.28-.057 2.15-.258 2.91-.553.783-.303 1.446-.708 2.11-1.372s1.07-1.372 1.372-2.11c.295-.76.496-1.63.553-2.91.058-1.28.073-1.69.073-4.95s-.015-3.67-.073-4.95c-.057-1.28-.258-2.15-.553-2.91-.303-.783-.708-1.446-1.372-2.11s-1.372-1.07-2.11-1.372c-.76-.295-1.63-.496-2.91-.553C15.67.015 15.26 0 12 0zm0 2.16c3.203 0 3.584.016 4.85.073 1.17.054 1.805.249 2.227.415.56.217.96.477 1.38.897.42.42.68.82.897 1.38.166.422.36.1.415 2.227.057 1.266.073 1.647.073 4.85s-.016 3.584-.073 4.85c-.054 1.17-.249 1.805-.415 2.227-.217.56-.477.96-.897 1.38-.42.42-.82.68-1.38.897-.422.166-1.056.36-2.227.415-1.266.057-1.647.073-4.85.073s-3.584-.016-4.85-.073c-1.17-.054-1.805-.249-2.227-.415-.56-.217-.96-.477-1.38-.897-.42-.42-.68-.82-.897-1.38-.166-.422-.36-1.056-.415-2.227-.057-1.266-.073-1.647-.073-4.85s.016-3.584.073-4.85c.054-1.17.249-1.805.415-2.227.217-.56.477-.96.897-1.38.42-.42.82-.68 1.38-.897.422-.166 1.056-.36 2.227-.415 1.266-.057 1.647-.073 4.85-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
              </svg>
            </a>
            {/* WhatsApp */}
            <a 
              href="https://wa.me/8801931900433" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#25D366] text-white transition-all duration-300 group shadow-lg border border-white/10"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Information Column */}
        <div>
          <h4 className="text-white text-lg font-bold mb-6 tracking-tight">Information</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 group">
              <Play className="w-2 h-2 text-white fill-current group-hover:translate-x-1 transition-transform" />
              <Link to="/about" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">About Us</Link>
            </li>
            <li className="flex items-center gap-3 group">
              <Play className="w-2 h-2 text-white fill-current group-hover:translate-x-1 transition-transform" />
              <Link to="/contact" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Contact Us</Link>
            </li>
            <li className="flex items-center gap-3 group">
              <Play className="w-2 h-2 text-white fill-current group-hover:translate-x-1 transition-transform" />
              <Link to="/shop" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">All Products</Link>
            </li>
            <li className="flex items-center gap-3 group">
              <Play className="w-2 h-2 text-white fill-current group-hover:translate-x-1 transition-transform" />
              <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Order History</Link>
            </li>
          </ul>
        </div>

        {/* Useful Links Column */}
        <div>
          <h4 className="text-white text-lg font-bold mb-6 tracking-tight">Useful Links</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 group">
              <Play className="w-2 h-2 text-white fill-current group-hover:translate-x-1 transition-transform" />
              <Link to="/faq" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">FAQ</Link>
            </li>
            <li className="flex items-center gap-3 group">
              <Play className="w-2 h-2 text-white fill-current group-hover:translate-x-1 transition-transform" />
              <Link to="/privacy" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link>
            </li>
            <li className="flex items-center gap-3 group">
              <Play className="w-2 h-2 text-white fill-current group-hover:translate-x-1 transition-transform" />
              <Link to="/returns" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Refund Policy</Link>
            </li>
            <li className="flex items-center gap-3 group">
              <Play className="w-2 h-2 text-white fill-current group-hover:translate-x-1 transition-transform" />
              <Link to="/terms" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="space-y-8">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm border-l-2 border-slate-700 pl-4">Elite Connect</h4>
          <ul className="space-y-6 text-sm">
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
              <span className="leading-relaxed">Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-slate-500" />
              <span className="font-bold flex flex-wrap gap-x-2">
                <a href="tel:+8801626881259" className="hover:text-white transition-colors">+880 1626-881259</a> 
                <a href="tel:+8801931900433" className="hover:text-white transition-colors">+880 1931-900433</a>
              </span>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-slate-500" />
              <a href="mailto:info@eliteinventory.store" className="hover:text-white transition-colors">info@eliteinventory.store</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
        <p className="text-center md:text-left leading-relaxed">
          &copy; {new Date().getFullYear()} Elite Inventory.
          <br className="md:hidden" />
          <span className="md:ml-1">Developed with precision.</span>
        </p>
        <div className="flex gap-10">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

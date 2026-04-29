import { Phone, Mail, MapPin, Globe, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="relative bg-zinc-950 pt-0 lg:pt-24 pb-12 border-t border-zinc-900 overflow-hidden">
      {/* LOGO3 BACKGROUND DEGRADE NO CANTO DIREITO */}
      <div className="absolute -right-20 bottom-20 lg:bottom-40 w-[400px] lg:w-[600px] opacity-[0.03] pointer-events-none z-0 select-none">
        <img
          src="/LOGO3-sem-fundo.png"
          alt=""
          className="w-full h-auto grayscale invert brightness-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-zinc-950 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <img src="/logo.png" alt="Helder Pinto" className="h-20 w-auto mb-8" />
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
              Consultor Imobiliário associado à RE/MAX Dinâmica Daire. Especialista em imóveis de luxo e investimentos imobiliários.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/helderpinto.consultor/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-brand hover:to-brand-red transition-colors text-white">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/p/Helder-Pinto-61576692584924/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://remax.pt/pt/agente/helder-pinto/126421031" target="_blank" rel="noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-brand transition-colors text-white">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://wa.me/351961526716" target="_blank" rel="noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors text-white">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Contatos</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-brand mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="text-zinc-400">Telemóvel Nacional</p>
                  <p className="text-white font-bold">+351 961 526 716</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-brand shrink-0" />
                <a href="mailto:hpinto@remax.pt" className="text-white font-bold text-sm hover:text-brand transition-colors">
                  hpinto@remax.pt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Localização</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-brand mt-0.5 shrink-0" />
                <a
                  href="https://maps.google.com/?q=Rua+Padre+Am%C3%A9rico+3B+3600-132+Castro+Daire"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 text-sm hover:text-brand-light transition-colors leading-relaxed"
                >
                  Rua Padre Américo, nº 3 B<br />
                  3600-132, Castro Daire<br />
                  Castro Daire, Portugal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 uppercase font-bold tracking-[0.2em]">
          <p>© 2024 Helder Pinto - RE/MAX Dinâmica Daire. Todos os direitos reservados.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand transition-colors">Privacidade</a>
            <a href="#" className="hover:text-brand transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

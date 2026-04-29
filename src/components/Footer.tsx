import { Phone, Mail, MapPin, Globe, MessageCircle, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 pt-24 pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <img src="/logo.png" alt="Helder Pinto" className="h-12 mb-8" />
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
              Consultor Imobiliário associado à RE/MAX Dinâmica Daire. Especialista em imóveis de luxo e investimentos imobiliários.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Contatos</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-purple-500 mt-1 shrink-0" />
                <div className="text-sm">
                  <p className="text-zinc-400">Telemóvel Nacional</p>
                  <p className="text-white font-bold">+351 961 526 716</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-purple-500 mt-1 shrink-0" />
                <div className="text-sm">
                  <p className="text-zinc-400">Rede Fixa Nacional</p>
                  <p className="text-white font-bold">+351 232 373 044</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Localização</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-purple-500 mt-1 shrink-0" />
                <a
                  href="https://maps.google.com/?q=Rua+Padre+Am%C3%A9rico+3B+3600-132+Castro+Daire"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 text-sm hover:text-purple-400 transition-colors leading-relaxed"
                >
                  Rua Padre Américo, nº 3 B<br />
                  3600-132, Castro Daire<br />
                  Castro Daire, Portugal
                </a>
              </li>
              <li className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-purple-500 mt-1 shrink-0" />
                <p className="text-white text-sm font-bold">hpinto@remax.pt</p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Newsletter</h4>
            <p className="text-zinc-500 text-sm mb-6">Receba as últimas oportunidades no seu email.</p>
            <div className="flex bg-zinc-900 rounded-xl p-1">
              <input
                type="email"
                placeholder="Seu email"
                className="bg-transparent border-none focus:ring-0 text-sm px-4 py-2 w-full"
              />
              <button className="bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-colors">
                Assinar
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 uppercase font-bold tracking-[0.2em]">
          <p>© 2024 Helder Pinto - RE/MAX Dinâmica Daire. Todos os direitos reservados.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-purple-500 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-purple-500 transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

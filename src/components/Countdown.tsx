import { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 13,
    hours: 21,
    minutes: 59,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-4">
      <div className="bg-purple-600 w-20 h-20 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/40 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="text-3xl font-black text-white relative z-10">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-[10px] uppercase font-bold tracking-widest text-zinc-500">{label}</span>
    </div>
  );

  return (
    <div className="bg-purple-600/10 py-12 border-y border-purple-500/20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-20">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-black uppercase tracking-tighter">Não perca tempo</h3>
          <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Esta oportunidade se encerra em:</p>
        </div>
        
        <div className="flex items-center">
          <TimeUnit value={timeLeft.days} label="Dias" />
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <TimeUnit value={timeLeft.minutes} label="Minutos" />
          <TimeUnit value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>
    </div>
  );
};

export default Countdown;

import React, { useState } from 'react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Users, Video, Loader2, CheckCircle, Trophy } from 'lucide-react';
import Button from './ui/Button';
import { cn } from '../lib/utils';
import { useFirebase } from '../lib/FirebaseContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';

const TIMESLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export default function BookingCalendar() {
  const { user, signIn } = useFirebase();
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));

  const handleBooking = async () => {
    if (!user) {
      await signIn();
      return;
    }

    if (!selectedSlot) return;

    setIsSubmitting(true);
    try {
      const bookingData = {
        userId: user.uid,
        serviceId: 'coaching_hourly',
        date: selectedDate.toISOString(),
        timeSlot: selectedSlot,
        status: 'pending',
        createdAt: Date.now(),
        serverTimestamp: serverTimestamp()
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      setSuccess(true);
    } catch (error) {
      handleFirestoreError(error, 'create', 'bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <section id="coaching" className="py-24 bg-dark-surface relative overflow-hidden">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,0,85,0.4)]"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>
          <h2 className="text-4xl font-extrabold mb-4 font-display italic uppercase">Booking Confirmed!</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Your coaching session has been scheduled. Check your email for more details and join our Discord for faster communication.
          </p>
          <Button variant="outline" onClick={() => setSuccess(false)}>Book Another Session</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="coaching" className="py-24 bg-dark-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-16 items-center">
          
          <div className="col-span-12 lg:col-span-7">
            <span className="text-[12px] font-mono text-brand-accent uppercase mb-6 tracking-[0.4em] font-bold block">// MASTER THE FIELD</span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase italic leading-[0.85]">Book Your Pro <br /><span className="text-stroke text-transparent">Coaching Session</span></h2>
            <p className="text-white/50 mb-12 max-w-lg leading-relaxed text-lg">
              Unlock your full potential with 1-on-1 coaching. Our Grand Champion coaches will analyze your gameplay, 
              identify mistakes, and provide structured drills to help you rank up.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Video, title: 'VOD Review', desc: 'Detailed mechanical analysis.' },
                { icon: Users, title: 'Live Drills', desc: 'Private training and lobby practice.' },
                { icon: Clock, title: '24/7 Access', desc: 'Sessions available in any timezone.' },
                { icon: Trophy, title: 'SSL Coaching', desc: 'Learn directly from the elite.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center p-4 bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center text-brand-accent">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-white/90">{item.title}</h4>
                    <p className="text-[10px] text-white/30 uppercase font-black">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 relative">
            <div className="rotate-1 glass-card p-1">
              <div className="bg-black/40 p-8 border border-white/10 flex flex-col gap-6">
                 <div className="flex items-center justify-between border-b border-white/10 pb-6 uppercase font-black italic">
                    <div className="flex items-center gap-3">
                       <CalendarIcon className="text-brand-accent" size={20} />
                       <span className="text-[11px] tracking-widest text-white/90">Slot Selection</span>
                    </div>
                    <div className="text-[9px] font-black text-white/30 tracking-widest uppercase">Select Date</div>
                 </div>

                 {/* Date Row */}
                 <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {next7Days.map(date => (
                      <button
                        key={date.toISOString()}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedSlot(null);
                        }}
                        className={cn(
                          "flex flex-col items-center min-w-[64px] py-4 transition-all border font-black uppercase italic",
                          isSameDay(selectedDate, date)
                            ? "bg-brand-accent border-brand-accent text-white"
                            : "bg-white/5 border-white/5 hover:border-white/20 text-white/30"
                        )}
                      >
                        <span className="text-[9px] mb-1">{format(date, 'eee')}</span>
                        <span className="text-lg tracking-tighter leading-none">{format(date, 'd')}</span>
                      </button>
                    ))}
                 </div>

                 <div className="grid grid-cols-2 gap-2">
                    {TIMESLOTS.map(slot => (
                      <button
                         key={slot}
                         onClick={() => setSelectedSlot(slot)}
                         className={cn(
                           "py-3 text-[10px] font-black transition-all border uppercase tracking-widest italic",
                           selectedSlot === slot
                             ? "bg-brand-accent border-brand-accent text-white"
                             : "bg-white/5 border-white/5 hover:border-white/20 text-white/40"
                         )}
                      >
                        {slot}
                      </button>
                    ))}
                 </div>

                 <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-end mb-8 uppercase font-black italic">
                       <span className="text-[10px] text-white/40 tracking-widest">Session cost</span>
                       <span className="text-4xl tracking-tighter text-white font-black">$25.00</span>
                    </div>

                    <Button 
                      variant="secondary" 
                      className="w-full" 
                      size="lg" 
                      glow={!!selectedSlot && !isSubmitting} 
                      disabled={!selectedSlot || isSubmitting}
                      onClick={handleBooking}
                    >
                      {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : (user ? 'Confirm' : 'Login')}
                    </Button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

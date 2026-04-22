import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { useFirebase } from '../lib/FirebaseContext';
import { Booking } from '../types';
import { format } from 'date-fns';
import { ShieldCheck, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminPanel() {
  const { profile } = useFirebase();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.role !== 'admin') return;

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      setBookings(docs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, 'list', 'bookings');
    });

    return () => unsubscribe();
  }, [profile]);

  const updateStatus = async (id: string, status: Booking['status']) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
    } catch (error) {
      handleFirestoreError(error, 'update', `bookings/${id}`);
    }
  };

  if (profile?.role !== 'admin') return null;

  return (
    <section id="admin" className="py-24 bg-black border-t border-brand-accent/20 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-extrabold uppercase italic mb-2">Command <span className="text-brand-accent">Center</span></h2>
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Administrative Booking Management</p>
          </div>
          <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-full flex items-center gap-2">
             <ShieldCheck size={16} className="text-brand-accent" />
             <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Admin Mode Active</span>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
           <table className="w-full text-left">
             <thead>
               <tr className="bg-white/5 text-[10px] uppercase font-bold tracking-widest text-white/40 border-b border-white/10">
                 <th className="px-6 py-4">Created</th>
                 <th className="px-6 py-4">Session Date</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {loading ? (
                   <tr>
                     <td colSpan={4} className="px-6 py-12 text-center">
                        <Loader2 className="animate-spin mx-auto text-brand-primary" />
                     </td>
                   </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                     <td colSpan={4} className="px-6 py-12 text-center text-white/20 italic">No bookings found in system.</td>
                  </tr>
                ) : bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-6 text-xs text-white/60">
                       {format(booking.createdAt, 'MMM d, p')}
                    </td>
                    <td className="px-6 py-6">
                       <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">{format(new Date(booking.date), 'EEEE, MMM d')}</span>
                          <span className="text-xs text-brand-primary font-mono">{booking.timeSlot}</span>
                       </div>
                    </td>
                    <td className="px-6 py-6">
                       <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                          booking.status === 'confirmed' && "bg-green-500/10 text-green-500 border border-green-500/20",
                          booking.status === 'pending' && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                          booking.status === 'cancelled' && "bg-red-500/10 text-red-500 border border-red-500/20",
                          booking.status === 'completed' && "bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
                       )}>
                          {booking.status}
                       </span>
                    </td>
                    <td className="px-6 py-6 text-right space-x-2">
                       {booking.status === 'pending' && (
                          <button 
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            className="p-2 hover:bg-green-500/20 rounded-sm text-green-500 transition-colors"
                            title="Confirm Booking"
                          >
                            <CheckCircle size={18} />
                          </button>
                       )}
                       {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                          <button 
                            onClick={() => updateStatus(booking.id, 'cancelled')}
                            className="p-2 hover:bg-red-500/20 rounded-sm text-red-500 transition-colors"
                            title="Cancel Booking"
                          >
                           <XCircle size={18} />
                          </button>
                       )}
                       {booking.status === 'confirmed' && (
                          <button 
                            onClick={() => updateStatus(booking.id, 'completed')}
                            className="p-2 hover:bg-brand-primary/20 rounded-sm text-brand-primary transition-colors"
                            title="Mark Completed"
                          >
                            <ShieldCheck size={18} />
                          </button>
                       )}
                    </td>
                  </tr>
                ))}
             </tbody>
           </table>
        </div>
      </div>
    </section>
  );
}

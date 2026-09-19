import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Share2, 
  MessageSquare, 
  FileText, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Store,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const ConsultationRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { consultations, recommendations, products, addToCart } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [activeSideTab, setActiveSideTab] = useState<'prescription' | 'chat'>('prescription');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string; isDoctor: boolean }>>([
    {
      sender: 'Dr. K. Srinivas Rao',
      text: 'Namaste Ramesh garu. I have reviewed your AI leaf scan for the Vaishnavi Tomato plot.',
      time: '11:02 AM',
      isDoctor: true
    },
    {
      sender: 'Ramesh Kumar (Farmer)',
      text: 'Namaste doctor. The lower leaves are developing concentric dark rings and turning yellow.',
      time: '11:03 AM',
      isDoctor: false
    },
    {
      sender: 'Dr. K. Srinivas Rao',
      text: 'Yes, this is classic Early Blight (Alternaria solani). Because morning humidity is high, we must prune lower leaves and use Trichoderma viride bio-fungicide immediately.',
      time: '11:04 AM',
      isDoctor: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const activeConsultation = consultations.find(c => c.id === id) || consultations[0];
  const activeRecommendation = recommendations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChatMessages(prev => [
      ...prev,
      {
        sender: 'Ramesh Kumar (Farmer)',
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDoctor: false
      }
    ]);
    setInputMessage('');

    // Simulate doctor quick reply
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'Dr. K. Srinivas Rao',
          text: 'Prescription details updated in your panel. You can order the Trichoderma pack directly from nearby verified sellers.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDoctor: true
        }
      ]);
    }, 1500);
  };

  const handleOrderPrescribedBioInput = () => {
    const trichoderma = products.find(p => p.name.includes('Trichoderma')) || products[0];
    addToCart(trichoderma, 2);
    navigate('/farmer/cart');
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Consultation Room Top Status Bar */}
      <div className="bg-stone-900 text-white px-5 py-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md border border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-bold tracking-wide">
              Live Consultation Room: {activeConsultation ? activeConsultation.cropName : 'Crop Tele-Advisory'}
            </h2>
          </div>
          <span className="hidden sm:inline text-stone-500">|</span>
          <span className="text-xs text-stone-300 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            Connected (08:42)
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800 flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Certified Plant Pathologist
          </span>
        </div>
      </div>

      {/* Main Grid: Video Stream (8 cols) & Side Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Video Conference Section (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-stone-950 rounded-3xl overflow-hidden border border-stone-800 shadow-xl min-h-[480px] sm:min-h-[540px] relative">
          
          {/* Main Doctor Screen */}
          <div className="relative flex-1 flex items-center justify-center p-6">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80"
              alt="Dr. Srinivas Rao"
              className="w-full h-full max-h-[420px] object-cover rounded-2xl border border-stone-800"
            />

            {/* Doctor Info Badge Overlay */}
            <div className="absolute top-8 left-8 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-700 text-white text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-bold">Dr. K. Srinivas Rao, Ph.D.</span>
              <span className="text-[10px] text-stone-400">(PJTSAU Warangal)</span>
            </div>

            {/* Speaking Waveform Pill */}
            <div className="absolute bottom-8 left-8 bg-emerald-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-emerald-200 border border-emerald-700 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <span className="w-1 h-3 bg-emerald-400 animate-pulse rounded-full" />
                <span className="w-1 h-5 bg-emerald-300 animate-pulse rounded-full" />
                <span className="w-1 h-2 bg-emerald-400 animate-pulse rounded-full" />
              </div>
              <span>Speaking: Early Blight Remediation</span>
            </div>

            {/* Farmer Self Video PIP Box */}
            <div className="absolute bottom-8 right-8 w-28 sm:w-36 h-20 sm:h-26 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-2xl bg-stone-900">
              {isVideoOn ? (
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                  alt="Ramesh Kumar Self Video"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400 font-bold bg-stone-800">
                  Camera Off
                </div>
              )}
              <div className="absolute bottom-1 left-1 bg-stone-900/80 text-white px-1.5 py-0.5 rounded text-[9px] font-bold">
                You (Farmer)
              </div>
            </div>
          </div>

          {/* Meeting Bottom Control Bar */}
          <div className="bg-stone-900/90 backdrop-blur-md px-6 py-4 border-t border-stone-800 flex items-center justify-center gap-4">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3.5 rounded-2xl transition-colors cursor-pointer ${
                isMicOn ? 'bg-stone-800 hover:bg-stone-700 text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
              title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3.5 rounded-2xl transition-colors cursor-pointer ${
                isVideoOn ? 'bg-stone-800 hover:bg-stone-700 text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
              title={isVideoOn ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => alert('Screen share simulated')}
              className="p-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Share Screen"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/farmer/professionals')}
              className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
              title="End Consultation"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Leave Room</span>
            </button>
          </div>

        </div>

        {/* Right Section: Prescription & Live Chat (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200/90 shadow-sm flex flex-col h-[540px] overflow-hidden">
          
          {/* Side Tabs */}
          <div className="flex border-b border-stone-200 bg-stone-50/50 p-2 gap-1.5">
            <button
              onClick={() => setActiveSideTab('prescription')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeSideTab === 'prescription'
                  ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Prescription Notes</span>
            </button>
            <button
              onClick={() => setActiveSideTab('chat')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeSideTab === 'chat'
                  ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consultation Chat</span>
            </button>
          </div>

          {/* Tab 1: Live Agronomist Prescription */}
          {activeSideTab === 'prescription' ? (
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h4 className="font-black text-stone-900 text-sm">Official Agronomic Slip</h4>
                  <p className="text-[11px] text-stone-500">Issued by Dr. K. Srinivas Rao</p>
                </div>
                <Badge variant="success">Verified Rx</Badge>
              </div>

              {activeRecommendation && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <p className="font-bold text-amber-900">Diagnosis:</p>
                    <p className="text-amber-800 mt-0.5">{activeRecommendation.identifiedProblem}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <p className="font-bold text-stone-800">Agronomic Cultural Advice:</p>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">{activeRecommendation.suggestedPractice}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-emerald-950">Recommended Bio-Input:</p>
                      <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                        Organic
                      </span>
                    </div>
                    <p className="font-semibold text-emerald-800">
                      {activeRecommendation.relevantProduct}
                    </p>
                    <p className="text-emerald-700 text-[11px]">
                      {activeRecommendation.usageInstructions}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      className="w-full"
                      size="sm"
                      icon={<Store className="w-4 h-4" />}
                      onClick={handleOrderPrescribedBioInput}
                    >
                      Add Prescribed Products to Cart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Tab 2: In-Room Live Chat */
            <div className="flex-1 flex flex-col h-full">
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.isDoctor ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5 text-[10px] text-stone-400">
                      <span className="font-semibold">{msg.sender}</span>
                      <span>•</span>
                      <span>{msg.time}</span>
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                        msg.isDoctor
                          ? 'bg-stone-100 text-stone-800 rounded-tl-none'
                          : 'bg-emerald-700 text-white rounded-tr-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-stone-200 bg-stone-50 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  placeholder="Ask agronomist a question..."
                  className="flex-1 px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

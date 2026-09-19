import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  FileText, 
  CheckCheck, 
  UserCircle2 
} from 'lucide-react';

export const MessagingPage: React.FC = () => {
  const { messages, sendMessage } = useStore();
  const { currentUser, currentRole } = useAuth();
  const { t } = useLanguage();

  const [activeConversationId, setActiveConversationId] = useState('conv_farmer_buyer');
  const [inputText, setInputText] = useState('');
  const [showAttachmentMock, setShowAttachmentMock] = useState(false);

  // Pre-configured multi-stakeholder chat channels
  const channels = [
    {
      id: 'conv_farmer_buyer',
      title: 'Kavita Reddy (Buyer - Priya Agro)',
      role: 'Buyer',
      preview: 'Namaste Ramesh ji! We saw your Vaishnavi Tomato listing...',
      time: '09:45 AM',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'
    },
    {
      id: 'conv_farmer_expert',
      title: 'Dr. K. Srinivas Rao (Agronomist)',
      role: 'Agronomist',
      preview: 'Ramesh garu, make sure you do not spray copper fungicides...',
      time: 'Yesterday',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100'
    },
    {
      id: 'conv_farmer_fpo',
      title: 'Kakatiya FPO Coordinator',
      role: 'FPO',
      preview: 'Tomato export lot aggregation closes on Sep 24th.',
      time: '2 days ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100'
    },
    {
      id: 'conv_farmer_seller',
      title: 'Kisan Krishi Kendra (Seller)',
      role: 'Input Seller',
      preview: 'Your 2 packs of Trichoderma are packed for dispatch.',
      time: '3 days ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'
    },
    {
      id: 'conv_farmer_transport',
      title: 'Sri Balaji Logistics (Driver Ravi)',
      role: 'Transport',
      preview: 'Mini Truck TS 03 UA 5421 reached Jangaon Toll Plaza.',
      time: '1 hour ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    }
  ];

  const activeChannel = channels.find(c => c.id === activeConversationId) || channels[0];

  const currentChannelMessages = messages.filter(
    m => m.conversationId === activeConversationId
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage({
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentRole,
      recipientId: 'recipient_id',
      recipientName: activeChannel.title,
      conversationId: activeConversationId,
      text: inputText
    });

    setInputText('');
  };

  const handleAttachMock = (type: 'image' | 'document') => {
    sendMessage({
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentRole,
      recipientId: 'recipient_id',
      recipientName: activeChannel.title,
      conversationId: activeConversationId,
      text: type === 'image' ? '📷 Attached photo: Tomato_leaf_sample.jpg' : '📄 Attached document: Soil_Test_Report_2026.pdf',
      attachmentUrl: type === 'image' ? 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400' : undefined,
      attachmentType: type
    });
    setShowAttachmentMock(false);
  };

  return (
    <div className="space-y-4 pb-12">
      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">
          In-App Agricultural Stakeholder Messaging
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Direct communication between Farmers, Buyers, Agronomists, FPOs, Input Sellers & Transporters
        </p>
      </div>

      {/* Split-pane Chat Layout */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm grid grid-cols-1 md:grid-cols-12 h-[600px] overflow-hidden">
        
        {/* Left Pane: Conversations List (4 cols) */}
        <div className="md:col-span-4 border-r border-stone-200 flex flex-col">
          <div className="p-4 border-b border-stone-100 bg-stone-50/50">
            <h3 className="font-bold text-stone-800 text-xs uppercase tracking-wider">
              Active Conversations
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {channels.map((ch) => {
              const isSelected = ch.id === activeConversationId;
              return (
                <div
                  key={ch.id}
                  onClick={() => setActiveConversationId(ch.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-emerald-50/80 border-l-4 border-l-emerald-600' : 'hover:bg-stone-50'
                  }`}
                >
                  <img
                    src={ch.avatar}
                    alt={ch.title}
                    className="w-11 h-11 rounded-2xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-stone-900 text-xs truncate">{ch.title}</h4>
                      <span className="text-[10px] text-stone-400 shrink-0">{ch.time}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded inline-block my-0.5">
                      {ch.role}
                    </span>
                    <p className="text-xs text-stone-500 truncate">{ch.preview}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Active Chat Window (8 cols) */}
        <div className="md:col-span-8 flex flex-col justify-between bg-stone-50/40">
          
          {/* Chat Header */}
          <div className="p-4 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeChannel.avatar}
                alt={activeChannel.title}
                className="w-10 h-10 rounded-xl object-cover border border-stone-200"
              />
              <div>
                <h3 className="font-bold text-stone-900 text-sm">{activeChannel.title}</h3>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online • {activeChannel.role}
                </span>
              </div>
            </div>

            <span className="text-xs font-mono text-stone-400 bg-stone-100 px-2 py-1 rounded-lg">
              Channel: {activeChannel.role}
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-3.5">
            {currentChannelMessages.map((msg) => {
              const isMine = msg.senderId === currentUser.id || msg.senderRole === currentRole;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-stone-400 mb-1 px-1">{msg.senderName}</span>
                  <div
                    className={`p-3.5 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                      isMine
                        ? 'bg-emerald-700 text-white rounded-tr-none shadow-sm'
                        : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-xs'
                    }`}
                  >
                    {msg.text}
                    {msg.attachmentUrl && (
                      <img
                        src={msg.attachmentUrl}
                        alt="attachment"
                        className="mt-2 rounded-xl max-h-44 object-cover border border-white/20"
                      />
                    )}
                  </div>
                  <span className="text-[9px] text-stone-400 mt-0.5 px-1">{msg.timestamp}</span>
                </div>
              );
            })}
          </div>

          {/* Input & Attachments Bar */}
          <div className="p-3.5 bg-white border-t border-stone-200 relative">
            {showAttachmentMock && (
              <div className="absolute bottom-16 left-4 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 flex gap-2 text-xs font-bold animate-fadeIn">
                <button
                  type="button"
                  onClick={() => handleAttachMock('image')}
                  className="px-3 py-2 rounded-xl hover:bg-stone-100 flex items-center gap-1.5 text-stone-700"
                >
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>Share Crop Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAttachMock('document')}
                  className="px-3 py-2 rounded-xl hover:bg-stone-100 flex items-center gap-1.5 text-stone-700"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Attach Document</span>
                </button>
              </div>
            )}

            <form onSubmit={handleSend} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAttachmentMock(!showAttachmentMock)}
                className="p-2.5 text-stone-400 hover:text-emerald-700 rounded-xl hover:bg-stone-100 transition-colors"
                title="Attach Document / Photo"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={`Message ${activeChannel.title.split(' ')[0]}...`}
                className="flex-1 px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={<Send className="w-4 h-4" />}
              >
                Send
              </Button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

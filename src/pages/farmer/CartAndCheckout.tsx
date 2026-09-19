import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartAndCheckout: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, createOrder, orders } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [address, setAddress] = useState('Ramesh Prakruthi Farm, Georai Village, Warangal District, Telangana - 506001');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Direct Escrow' | 'COD'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 1000 ? 0 : 60;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = createOrder(address, paymentMethod);
      setIsProcessing(false);
      setCompletedOrder(order);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/farmer/marketplace')}
          className="p-2 text-stone-500 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Input Cart & Checkout
          </h1>
          <p className="text-xs text-stone-500">
            Review certified inputs and arrange farmgate delivery
          </p>
        </div>
      </div>

      {completedOrder ? (
        /* Order Success Receipt Screen */
        <Card className="p-8 text-center space-y-6 border-2 border-emerald-500 bg-emerald-50/30">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-stone-900">Order Placed Successfully!</h2>
            <p className="text-xs text-stone-500">
              Order Number: <span className="font-mono font-bold text-stone-800">{completedOrder.orderNumber}</span>
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 bg-white rounded-2xl border border-stone-200 text-xs text-left space-y-2">
            <div className="flex justify-between py-1 border-b border-stone-100 font-bold">
              <span>Paid via {completedOrder.paymentMethod}:</span>
              <span className="text-emerald-700">₹{completedOrder.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100 text-stone-600">
              <span>Delivery To:</span>
              <span className="truncate max-w-[200px] text-stone-800">{completedOrder.shippingAddress.split(',')[0]}</span>
            </div>
            <div className="flex justify-between py-1 text-stone-600">
              <span>Estimated Delivery:</span>
              <span className="font-semibold text-emerald-800">{completedOrder.estimatedDelivery}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => navigate('/farmer/marketplace')}
            >
              Back to Marketplace
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/farmer/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      ) : cart.length === 0 ? (
        <Card className="p-12 text-center space-y-4 text-stone-500">
          <ShoppingCart className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">Your Cart is Empty</h3>
          <p className="text-xs">Browse the input marketplace to order bio-fertilizers, seeds, and protection products.</p>
          <Button variant="primary" onClick={() => navigate('/farmer/marketplace')}>
            Explore Input Marketplace
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Cart Items (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-sm flex items-center gap-4"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-stone-900 text-sm truncate">{item.product.name}</h4>
                    <p className="text-xs text-stone-500">{item.product.sellerName}</p>
                    <p className="text-xs font-bold text-emerald-800 mt-1">₹{item.product.price} / {item.product.unit}</p>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-sm space-y-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Farmgate Delivery Address
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Checkout Summary (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Card className="p-5 space-y-4">
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider pb-3 border-b border-stone-100">
                Payment Summary
              </h3>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-bold text-stone-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Farm Delivery Charge:</span>
                  <span className={deliveryFee === 0 ? "text-emerald-700 font-bold" : "text-stone-900"}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-100 text-base font-black text-stone-900">
                  <span>Total Payable:</span>
                  <span className="text-emerald-800">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2 space-y-2">
                <label className="block text-[11px] font-bold text-stone-700 uppercase">
                  Select Simulated Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'UPI', label: 'UPI / QR' },
                    { id: 'Direct Escrow', label: 'Escrow' },
                    { id: 'COD', label: 'Cash on Del' }
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`py-2 px-2 rounded-xl text-center font-bold border transition-colors ${
                        paymentMethod === m.id
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                          : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full mt-2"
                disabled={isProcessing}
                onClick={handleCheckout}
              >
                {isProcessing ? 'Processing Simulated Payment...' : `Confirm Order (₹${total.toLocaleString()})`}
              </Button>

              <p className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Simulated Hackathon Escrow Protection Active
              </p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, IceCream, Croissant, Utensils, Sparkles, Heart, CheckCircle2, ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';
import { useWishlist } from '../contexts/WishlistContext';

interface MenuItem {
  name: string;
  price: number;
  desc?: string;
  longDesc: string;
  ingredients: string[];
  image: string;
}

interface MenuCategory {
  category: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

const MENU_DATA: Record<'Drinks' | 'Food', MenuCategory[]> = {
  Drinks: [
    {
      category: "Season's Favorites",
      icon: <Sparkles className="text-cafe-gold" />,
      items: [
        { 
          name: "Tiramisu Cream Latte", 
          price: 183, 
          desc: "Tall: 183 | Grande: 199 | Venti: 208",
          longDesc: "Our signature seasonal drink. A decadent fusion of bold espresso and velvety tiramisu cream foam, topped with fine cocoa powder.",
          ingredients: ["Double Shot Espresso", "Fresh Milk", "Mascarpone Cream", "Cocoa Powder"],
          image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Iced Spanish Latte", 
          price: 188, 
          desc: "Tall: 188 | Grande: 203 | Venti: 218",
          longDesc: "The perfect balance of creamy sweetness and bold coffee. A smooth classic that never goes out of style.",
          ingredients: ["Double Shot Espresso", "Condensed Milk", "Steam-textured Milk"],
          image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Iced Matcha Latte", 
          price: 188, 
          desc: "Tall: 188 | Grande: 203 | Venti: 218",
          longDesc: "Premium grade ceremonial matcha whisked with silky milk. A refreshing and earthy energy boost.",
          ingredients: ["Ceremonial Matcha", "Fresh Milk", "Honey (Optional)"],
          image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Tiramisu Frappuccino",
          price: 208,
          desc: "Tall: 208 | Grande: 223 | Venti: 238",
          longDesc: "Blended bliss inspired by Italy's most famous dessert. Creamy, cold, and caffeinated with a tiramisu essence.",
          ingredients: ["Coffee Base", "Tiramisu Sauce", "Whipped Cream", "Cocoa Dust"],
          image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Iced Brown Sugar Oat Espresso",
          price: 198,
          desc: "Tall: 198 | Grande: 213 | Venti: 228",
          longDesc: "Shaken to perfection. The nutty notes of oat milk pair beautifully with the deep sweetness of brown sugar.",
          ingredients: ["Espresso", "Brown Sugar Syrup", "Oat Milk", "Ice"],
          image: "https://images.unsplash.com/photo-1551030173-122adbc5e586?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Cold Brew",
          price: 178,
          desc: "Tall: 178 | Grande: 193 | Venti: 208",
          longDesc: "Slow-steeped for over 20 hours for an ultra-smooth finish that highlights the beans' natural sweetness.",
          ingredients: ["Slow-steeped Coffee", "Filtered Water", "Ice"],
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },
    {
      category: "Espresso & More",
      icon: <Coffee className="text-cafe-gold" />,
      items: [
        { 
          name: "Caffé Latte", 
          price: 168, 
          desc: "Tall: 168 | Grande: 183 | Venti: 198", 
          longDesc: "A timeless classic. Silky steamed milk poured over a rich double-shot of our signature espresso.",
          ingredients: ["Espresso", "Silky Steamed Milk"],
          image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Iced Americano", 
          price: 148, 
          desc: "Tall: 148 | Grande: 163 | Venti: 178", 
          longDesc: "Bold and uncomplicated. Pure espresso shots topped with water to produce a light layer of crema.",
          ingredients: ["Triple Shot Espresso", "Purified Water"],
          image: "https://images.unsplash.com/photo-1551030173-122adbc5e586?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "White Chocolate Mocha", 
          price: 178, 
          desc: "Tall: 178 | Grande: 193 | Venti: 208", 
          longDesc: "Indulgent white chocolate syrup melted into our signature espresso and finished with creamy milk.",
          ingredients: ["Espresso", "White Cocoa", "Fresh Milk"],
          image: "https://images.unsplash.com/photo-1544006659-f0b21884cb1d?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Caramel Macchiato", 
          price: 178, 
          desc: "Tall: 178 | Grande: 193 | Venti: 208", 
          longDesc: "Freshly steamed milk with vanilla-flavored syrup marked with espresso and finished with a caramel drizzle.",
          ingredients: ["Espresso", "Vanilla Syrup", "Caramel Drizzle", "Milk"],
          image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Chai Tea Latte", 
          price: 178, 
          desc: "Tall: 178 | Grande: 193 | Venti: 208", 
          longDesc: "A warm and spicy blend of black tea, cinnamon, ginger, and cardamom, blended with steamed milk.",
          ingredients: ["Black Tea", "Chai Spices", "Steamed Milk"],
          image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Flat White", 
          price: 168, 
          desc: "Tall: 168 | Grande: 183 | Venti: 198", 
          longDesc: "Expertly pulled ristretto shots finished with a thin layer of velvety micro-foam for a rich, creamy texture.",
          ingredients: ["Ristretto Espresso", "Micro-foam Milk"],
          image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Cortado",
          price: 163,
          desc: "Tall: 163 | Grande: 178 | Venti: 193",
          longDesc: "A Spanish classic consisting of espresso mixed with a roughly equal amount of warm milk to reduce acidity.",
          ingredients: ["Double Shot Espresso", "Warm Textured Milk"],
          image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Turkish Coffee",
          price: 118,
          desc: "Tall: 118 | Grande: 128 | Venti: 138",
          longDesc: "Authentic unfiltered coffee prepared using very finely ground coffee beans. Intense and full of history.",
          ingredients: ["Extra-fine Grind Coffee", "Water", "Optional Cardamom"],
          image: "https://images.unsplash.com/photo-1588147814421-4d375319806b?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },
    {
      category: "Refresha & Frozen",
      icon: <IceCream className="text-cafe-gold" />,
      items: [
        { 
          name: "Mango Dragonfruit", 
          price: 188, 
          desc: "Tall: 188 | Grande: 203 | Venti: 218",
          longDesc: "A tropical vacation in a cup. Vibrant pink dragonfruit and sweet mango blended for a refreshing burst.",
          ingredients: ["Mango Juice", "Dragonfruit Pieces", "Ice", "Sweetener"],
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Cool Lime", 
          price: 188, 
          desc: "Tall: 188 | Grande: 203 | Venti: 218",
          longDesc: "Zesty and sharp. Fresh lime citrus notes with a hint of mint for the ultimate summer refresher.",
          ingredients: ["Lime Juice", "Fresh Mint", "Real Lime Slices", "Ice"],
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Orange Mango",
          price: 188,
          desc: "Tall: 188 | Grande: 203 | Venti: 218",
          longDesc: "A sun-kissed blend of sweet mango and tangy orange, chilled to perfection.",
          ingredients: ["Orange Concentrate", "Mango Puree", "Ice"],
          image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Strawberries & Cream",
          price: 183,
          desc: "Tall: 183 | Grande: 198 | Venti: 213",
          longDesc: "Sweet and creamy strawberry swirls blended with ice and milk, topped with our signature whipped cloud.",
          ingredients: ["Strawberry Purée", "Cream Base", "Ice", "Whipped Cream"],
          image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },
    {
      category: "Frappuccino",
      icon: <Utensils className="text-cafe-gold" />,
      items: [
        { 
          name: "Caramel Frappuccino", 
          price: 183, 
          desc: "Tall: 183 | Grande: 198 | Venti: 213",
          longDesc: "Our classic blended coffee with buttery caramel syrup and topped with fluffy whipped cream and extra drizzle.",
          ingredients: ["Blended Coffee", "Artisan Caramel", "Whipped Cream", "Milk"],
          image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Java Chip Frappuccino", 
          price: 183, 
          desc: "Tall: 183 | Grande: 198 | Venti: 213",
          longDesc: "A chocolate lover's dream. Rich mocha sauce and chocolatey chips blended with coffee and ice.",
          ingredients: ["Mocha Sauce", "Chocolate Chips", "Coffee Base", "Whipped Cream"],
          image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Espresso Frappuccino",
          price: 183,
          desc: "Tall: 183 | Grande: 198 | Venti: 213",
          longDesc: "Coffee is combined with a shot of espresso and milk, then blended with ice to give you a nice little jolt.",
          ingredients: ["Fresh Espresso", "Milk", "Coffee Base", "Ice"],
          image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800"
        }
      ]
    }
  ],
  Food: [
    {
      category: "Waffles",
      icon: <Utensils className="text-cafe-gold" />,
      items: [
        { 
          name: "Classic Butter Waffle", 
          price: 89,
          longDesc: "The original golden waffle. Crispy on the outside, light on the inside, served with organic butter and maple syrup.",
          ingredients: ["Artisan Flour", "Fresh Eggs", "Grass-fed Butter"],
          image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Biscoff Waffle", 
          price: 89,
          longDesc: "A delightful waffle topped with a generous spread of Biscoff and crunchy cookie bits.",
          ingredients: ["Lotus Biscoff Spread", "Cookie Crumbles", "Waffle Base"],
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Strawberry Waffle", 
          price: 89,
          longDesc: "Freshly sliced strawberries on a golden waffle base, topped with our house-made strawberry reduction.",
          ingredients: ["Fresh Strawberries", "Strawberry Syrup", "Golden Waffle"],
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Matcha Azuki Waffle", 
          price: 89,
          longDesc: "A Japanese twist with matcha glaze and sweet red beans, perfect for an afternoon tea pairing.",
          ingredients: ["Matcha Glaze", "Sweet Red Bean", "Mochi pieces"],
          image: "https://images.unsplash.com/photo-1598214813591-237a04159148?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Nutella Banana Waffle", 
          price: 89,
          longDesc: "Rich Nutella spread with fresh banana slices and a sprinkle of crushed hazelnuts.",
          ingredients: ["Nutella", "Fresh Banana", "Hazelnuts"],
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Choco Banana Waffle",
          price: 89,
          longDesc: "Indulgent chocolate drizzle paired with sweet banana slices on our signature waffle.",
          ingredients: ["Chocolate Sauce", "Banana", "Waffle"],
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },
    {
      category: "Pastries",
      icon: <Sparkles className="text-cafe-gold" />,
      items: [
        { 
          name: "San Sebastian Cheesecake", 
          price: 163,
          longDesc: "Basque-style burnt cheesecake with a creamy center and a caramelized top. A modern masterpiece.",
          ingredients: ["Cream Cheese", "Heavy Cream", "Organic Eggs"],
          image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Chocolate Brownie", 
          price: 120,
          longDesc: "Dense, fudgy, and intensely chocolatey—made with premium cocoa and finishing salt.",
          ingredients: ["Premium Cocoa", "Ebony Chocolate", "Sea Salt"],
          image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Lemon Cake", 
          price: 123,
          longDesc: "Zesty and moist lemon loaf with a sweet citrus glaze that melts in your mouth.",
          ingredients: ["Fresh Lemon Zest", "Citrus Glaze", "Organic Flour"],
          image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800"
        },
      ]
    }
  ]
};

export default function Menu() {
  const [mainTab, setMainTab] = useState<'Drinks' | 'Food'>('Drinks');
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const filteredData = MENU_DATA[mainTab].map(cat => ({
    ...cat,
    items: cat.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = priceFilter === null || 
        (priceFilter === 130 ? item.price <= 130 : 
         priceFilter === 160 ? item.price <= 160 : 
         item.price > 160);
      return matchesSearch && matchesPrice;
    })
  })).filter(cat => cat.items.length > 0);

  const isFiltering = searchQuery !== '' || priceFilter !== null;

  return (
    <section id="menu" className="py-32 px-4 bg-cafe-dark relative overflow-hidden">
      {/* Decorative Brand Accent - now adjusted for dark theme */}
      <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none select-none">
        <h2 className="text-[20vw] font-black leading-none uppercase italic text-white">Roasted</h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Decorative Gold Frame for the whole menu section similar to the image */}
        <div className="absolute inset-2 border border-cafe-gold/20 pointer-events-none" />
        <div className="absolute inset-4 border border-cafe-gold/10 pointer-events-none" />

        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-[2px] w-12 bg-cafe-gold/50" />
            <span className="text-cafe-gold font-black uppercase tracking-[0.6em] text-[10px] whitespace-nowrap">
              Italian Artisan Coffee
            </span>
            <div className="h-[2px] w-12 bg-cafe-gold/50" />
          </motion.div>
          
          <h2 className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight uppercase leading-none">
            Our Menu
          </h2>
          
          <p className="max-w-xl mx-auto text-white/50 font-bold uppercase tracking-widest text-[10px] mb-16 leading-relaxed">
            Cafe Norte · Freshly Made in Italy · Artisan Crafted
          </p>
          
          <div className="flex justify-center gap-6 mb-12 flex-wrap">
            {(['Drinks', 'Food'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setMainTab(tab); setActiveCategory(0); setSearchQuery(''); setPriceFilter(null); setExpandedItem(null); }}
                className={`px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 scale-100 active:scale-95 ${
                  mainTab === tab 
                  ? 'bg-cafe-gold text-white shadow-[0_20px_50px_rgba(201,160,80,0.3)]' 
                  : 'bg-cafe-brown/30 text-white border-2 border-white/10 hover:border-cafe-gold'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search/Price Filters */}
          <div className="max-w-3xl mx-auto mb-20 flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative group">
              <input 
                type="text" 
                placeholder="Find your favorite roast..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/10 px-8 py-5 rounded-2xl text-xs font-black text-white placeholder:text-white/30 focus:outline-none focus:border-cafe-gold/50 focus:bg-white/10 transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border-2 border-white/10">
              {[130, 160, 200].map(price => (
                <button
                  key={price}
                  onClick={() => setPriceFilter(priceFilter === price ? null : price)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    priceFilter === price 
                    ? 'bg-cafe-gold text-white shadow-lg' 
                    : 'text-white/40 hover:text-white'
                  }`}
                >
                  ₱{price}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Customize Your Drink Section from Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-24 mb-12 p-12 rounded-[3.5rem] bg-white/5 border-2 border-cafe-gold/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Coffee size={120} className="text-cafe-gold rotate-12" />
          </div>
          
          <h3 className="font-serif text-3xl text-white uppercase tracking-tight mb-8 relative z-10">
            Customize <span className="text-cafe-gold">Your Drink</span>
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 relative z-10">
            {[
              { name: "Plant Milk", price: "+P30" },
              { name: "Extra Shot", price: "+P30" },
              { name: "Syrup", price: "+P30" },
              { name: "Whipped Cream", price: "FREE" },
            ].map((addon) => (
              <div key={addon.name} className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{addon.name}</span>
                <span className="text-xl font-black text-cafe-gold uppercase tracking-tighter">{addon.price}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-6 relative z-10">
            {['Vanilla', 'Hazelnut', 'Classic', 'Mocha'].map(flavor => (
              <div key={flavor} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cafe-gold shadow-[0_0_8px_rgba(201,160,80,0.5)]" />
                <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">{flavor} FREE</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          {filteredData.length > 0 ? (
            filteredData.map((cat, idx) => {
              const isExpanded = isFiltering || activeCategory === idx;
              return (
                <div key={cat.category} className="group border border-cafe-gold/20 p-2 rounded-[3rem]">
                  <motion.button
                    whileHover="hover"
                    onClick={() => !isFiltering && setActiveCategory(activeCategory === idx ? -1 : idx)}
                    className={`w-full flex items-center justify-between p-8 rounded-[2.5rem] transition-all duration-500 text-left outline-none border-2 ${
                      isExpanded 
                      ? 'bg-white/10 border-cafe-gold shadow-[0_40px_80px_rgba(0,0,0,0.4)]' 
                      : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-cafe-gold/50'
                    } ${isFiltering ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-8">
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                        isExpanded ? 'bg-cafe-gold text-white rotate-12 scale-110' : 'bg-white/10 text-cafe-gold shadow-md border border-cafe-gold/30'
                      }`}>
                        <motion.div 
                          variants={{
                            hover: { scale: 1.2, filter: "drop-shadow(0 0 12px rgba(201, 160, 80, 0.4))" }
                          }}
                          className="scale-125"
                        >
                          {cat.icon}
                        </motion.div>
                      </div>
                      <div>
                        <h3 className={`font-serif text-3xl tracking-tight uppercase transition-colors duration-500 ${
                          isExpanded ? 'text-white' : 'text-white/40'
                        }`}>
                          {cat.category}
                        </h3>
                        <p className="text-[10px] font-black text-cafe-gold tracking-[0.3em] uppercase mt-2">
                          {cat.items.length} {cat.items.length === 1 ? 'Selection' : 'Selections'}
                        </p>
                      </div>
                    </div>
                    {!isFiltering && (
                      <motion.div
                        animate={{ rotate: activeCategory === idx ? 180 : 0 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                          activeCategory === idx ? 'border-cafe-gold text-cafe-gold' : 'border-white/10 text-white/20'
                        }`}
                      >
                        <ChevronDown size={24} />
                      </motion.div>
                    )}
                  </motion.button>

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-12 bg-black/20 rounded-[3rem] mt-6 border-2 border-cafe-gold/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {cat.items.map((item, i) => {
                          const isShowingDetails = expandedItem === item.name;
                          return (
                            <motion.div 
                              key={item.name}
                              initial={{ opacity: 0, y: 40 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ 
                                delay: i * 0.1,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                                scale: { duration: 0.2 },
                                boxShadow: { duration: 0.2 }
                              }}
                              whileHover={!isShowingDetails ? { 
                                scale: 1.03, 
                                boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.4)",
                                borderColor: "rgba(201, 160, 80, 0.4)"
                              } : {}}
                              className={`relative p-8 rounded-[2rem] transition-all cursor-pointer overflow-hidden border-2 group/item ${
                                isShowingDetails 
                                ? 'bg-white/10 border-cafe-gold shadow-2xl scale-[1.02]' 
                                : 'bg-transparent border-transparent hover:bg-white/5'
                              }`}
                              onClick={() => setExpandedItem(isShowingDetails ? null : item.name)}
                            >
                              <div className="flex gap-6 items-start">
                                {!isShowingDetails && (
                                  <motion.div 
                                    layoutId={`img-${item.name}`}
                                    className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border-2 border-cafe-gold/20"
                                  >
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-full h-full object-cover transform transition-transform group-hover/item:scale-110"
                                      referrerPolicy="no-referrer"
                                    />
                                  </motion.div>
                                )}

                                <div className="flex-1">
                                  <div className="flex justify-between items-start mb-4">
                                    <div>
                                      <h4 className="font-serif text-2xl text-white group-hover/item:text-cafe-gold transition-colors">
                                        {item.name}
                                      </h4>
                                      <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mt-1">
                                        {item.desc || 'Hand-crafted artisan choice'}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <span className="font-black text-xl text-cafe-gold">
                                        ₱{item.price}
                                      </span>
                                      {!isShowingDetails && (
                                        <p className="text-[7px] font-black text-cafe-gold uppercase tracking-widest mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                          Tap for details
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <AnimatePresence>
                                {isShowingDetails && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pt-6 mt-6 border-t border-white/10"
                                  >
                                    <div className="flex flex-col sm:flex-row gap-8 text-left">
                                      <motion.div 
                                        layoutId={`img-${item.name}`}
                                        className="w-full sm:w-1/2 h-72 sm:h-80 rounded-3xl overflow-hidden shadow-2xl bg-cafe-brown/20 flex-shrink-0 relative group/parallax"
                                      >
                                        <motion.img 
                                          src={item.image} 
                                          alt={item.name}
                                          initial={{ scale: 1.2 }}
                                          animate={{ 
                                            scale: 1.1,
                                            y: [0, -10, 0]
                                          }}
                                          transition={{
                                            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                                            scale: { duration: 1 }
                                          }}
                                          className="w-full h-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/parallax:opacity-100 transition-opacity duration-700" />
                                      </motion.div>
                                      
                                      <div className="flex-1 flex flex-col justify-between">
                                        <div className="space-y-6">
                                          <div>
                                            <h5 className="text-[9px] font-black uppercase tracking-widest text-cafe-gold mb-3">About this selection</h5>
                                            <p className="text-sm text-white/70 font-medium leading-relaxed italic">
                                              "{item.longDesc}"
                                            </p>
                                          </div>
                                          
                                          {item.ingredients.length > 0 && (
                                            <div>
                                              <h5 className="text-[9px] font-black uppercase tracking-widest text-cafe-gold mb-3">Key Ingredients</h5>
                                              <div className="flex flex-wrap gap-2">
                                                {item.ingredients.map(ing => (
                                                  <span key={ing} className="px-3 py-1.5 bg-white/10 text-[9px] font-bold text-cafe-gold rounded-lg uppercase">
                                                    {ing}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        
                                        <div className="flex gap-4 pt-8 mt-auto">
                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleWishlist({ 
                                                name: item.name, 
                                                price: item.price, 
                                                id: item.name,
                                                category: cat.category,
                                                image: item.image
                                              });
                                            }}
                                            className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all transform active:scale-95 ${
                                              isInWishlist(item.name)
                                              ? 'bg-cafe-gold text-white shadow-lg'
                                              : 'bg-white/10 text-white hover:bg-cafe-gold/20'
                                            }`}
                                          >
                                            {isInWishlist(item.name) ? <CheckCircle2 size={16} /> : <Heart size={16} />}
                                            {isInWishlist(item.name) ? 'Saved to Wishlist' : 'Add to Wishlist'}
                                          </button>
                                          <button 
                                            className="w-16 h-16 flex items-center justify-center bg-white/5 border border-white/10 text-cafe-gold rounded-xl hover:bg-cafe-gold hover:text-white transition-all transform active:scale-95 group/plus"
                                            onClick={(e) => { e.stopPropagation(); }}
                                          >
                                            <Plus size={20} className="group-hover/plus:rotate-90 transition-transform" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              
                              <div className={`absolute bottom-6 right-8 text-cafe-gold transition-all duration-500 ${isShowingDetails ? 'opacity-0 scale-0' : 'opacity-0 translate-y-2 group-hover/item:opacity-100 group-hover/item:translate-y-0'}`}>
                                <Plus size={20} />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-32 bg-white/5 rounded-[4rem] border-4 border-dashed border-cafe-gold/20">
              <div className="w-24 h-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-cafe-gold mx-auto mb-8 animate-pulse">
                <Coffee size={40} strokeWidth={1.5} />
              </div>
              <p className="font-serif text-4xl text-white mb-6 italic">No matches found.</p>
              <button 
                onClick={() => { setSearchQuery(''); setPriceFilter(null); }}
                className="px-12 py-5 bg-cafe-gold text-white text-[10px] font-black tracking-[0.4em] uppercase rounded-full hover:shadow-2xl transition-all"
              >
                Reset Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

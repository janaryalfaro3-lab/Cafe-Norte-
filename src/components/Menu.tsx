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
      category: "Signatures",
      icon: <Sparkles className="text-cafe-gold" />,
      items: [
        { 
          name: "Cafe Black", 
          price: 140, 
          desc: "espresso, water, tiramisu foam",
          longDesc: "A sophisticated take on the classic Americano, topped with our signature velvet tiramisu cloud for a bittersweet finish that lingers on the palate.",
          ingredients: ["Premium Espresso", "Purified Water", "Mascarpone Foam", "Cocoa Dust"],
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Cafe White", 
          price: 140, 
          desc: "espresso, milk, tiramisu foam",
          longDesc: "Creamy, dreamy, and decadent. Our signature white coffee blended with silky milk and topped with tiramisu-infused foam and a dusting of fine cocoa.",
          ingredients: ["Premium Espresso", "Whole Milk", "Tiramisu Cream", "Vanilla Bean"],
          image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Spanish Latte", 
          price: 140, 
          desc: "espresso, condensed milk",
          longDesc: "A crowd favorite featuring the perfect balance of bold espresso and sweet, creamy condensed milk. A smooth, comforting classic.",
          ingredients: ["Double Shot Espresso", "Condensed Milk", "Steam-textured Milk"],
          image: "https://imgs.search.brave.com/iA9nMQ_iQEIa9UCJgvKJjTz_0_mJ6eGt28Z2oyIlPg4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9saWZl/Ym9vc3Rjb2ZmZWUu/Y29tL2Nkbi9zaG9w/L2FydGljbGVzL0Zl/YXR1cmVfSW1hZ2Vf/Nl9hOGNkYjFkMC1l/NWQwLTQyMjktOTA1/OS0yNjNlNDFkZWI1/OWIuanBnP3Y9MTc2/NDY4MjUzMQ"
        },
        { 
          name: "Seasalt Latte", 
          price: 130, 
          desc: "espresso, milk, sea salt foam",
          longDesc: "The ultimate savory-sweet experience. Bold coffee paired with a hand-whisked salty cream topper that enhances the coffee's natural sweetness.",
          ingredients: ["Espresso", "Fresh Milk", "Handmade Sea Salt Cream"],
          image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Salted Caramel", 
          price: 130, 
          desc: "espresso, milk, caramel, foam",
          longDesc: "Rich buttery caramel notes balanced with a hint of salt and our signature espresso blend. Sweet, salty, and incredibly satisfying.",
          ingredients: ["Espresso", "Artisan Caramel", "Sea Salt", "Frother Milk"],
          image: "https://imgs.search.brave.com/k8UDeTMs6RSbpqF74Eq-CLLqTIbEU6R_73Yca5POrhk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly92aWJy/YW50YmV2ZXJhZ2Uu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzA3L1NhbHRl/ZF9DYXJhbWVsX0lj/ZWRfTGF0dGUuanBn"
        },
        { 
          name: "Roasted Almond", 
          price: 140, 
          desc: "espresso, milk, almond syrup, foam",
          longDesc: "Nutty and aromatic. We use roasted almond extracts to complement the deep chocolate notes of our beans for a toasted profile.",
          ingredients: ["Espresso", "Roasted Almond Syrup", "Velvet Milk"],
          image: "https://imgs.search.brave.com/TQhD6n9eR4IjOKJVz430k9br3Ig4ptTmRDXskwZKV9o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bmVzY2FmZS5jb20v/bXkvc2l0ZXMvZGVm/YXVsdC9maWxlcy8y/MDIzLTEwL3JvYXN0/ZWQtYWxtb25kLWNv/ZmZlZS1yZWNpcGUt/c3RlcC01LTcwNXg4/MzBweC5qcGc"
        },
        { 
          name: "Biscoff Latte", 
          price: 140, 
          desc: "espresso, milk, biscoff spread, foam",
          longDesc: "A dessert in a cup. Infused with real Lotus Biscoff spread for that signature spiced cookie flavor and a crunchy biscoff topping.",
          ingredients: ["Espresso", "Biscoff Cookie Butter", "Cinnamon", "Fresh Milk"],
          image: "https://imgs.search.brave.com/is-HJTtKvxKp3ouLD6f-ELPgaKjXHUvPr1y8HIMykcQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9teW1v/cm5pbmdtb2NoYS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjMvMDkvYmlzY29m/Zi1sYXR0ZS5qcGc"
        },
        { 
          name: "Toasted Mallows", 
          price: 140, 
          desc: "espresso, milk, mallow syrup, foam",
          longDesc: "Recapture campfire memories with toasted marshmallow syrup and a light, airy foam topper that tastes like a sweet cloud.",
          ingredients: ["Espresso", "Toasted Marshmallow Syrup", "Whipped Milk Cloud"],
          image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800"
        },
      ]
    },
    {
      category: "Classics",
      icon: <Coffee className="text-cafe-gold" />,
      items: [
        { 
          name: "Mocha", 
          price: 130, 
          desc: "espresso, milk, dark chocolate", 
          longDesc: "A rich fusion of our signature espresso and deep, velvet dark chocolate, balanced with silky steamed milk for a timeless indulgence.",
          ingredients: ["Espresso", "Dark Cocoa", "Fresh Milk"],
          image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "White Mocha", 
          price: 130, 
          desc: "espresso, milk, white chocolate", 
          longDesc: "Sweet, creamy, and sophisticated—a blend of premium white chocolate and bold espresso that melts on your tongue.",
          ingredients: ["Espresso", "White Cocoa", "Fresh Milk"],
          image: "https://imgs.search.brave.com/U9L_Dz5S3HcZ9xFfO9jvLBTT3GyBQ6Uify1tNdF0UoY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YmlzY3VpdHNhbmRi/dXJsYXAuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzEx/L3doaXRlLWNob2Nv/bGF0ZS1tb2NoYS03/LTczNXg0OTEuanBn"
        },
        { 
          name: "Capuccino", 
          price: 120, 
          desc: "espresso, milk, foam", 
          longDesc: "The classic morning ritual. Equal parts espresso, steamed milk, and a thick layer of luxurious foam for a perfect texture.",
          ingredients: ["Espresso", "Extra Frothy Milk"],
          image: "https://imgs.search.brave.com/OsRu5FDjoQcOlh00WI4NxmUTgHQ3YXaBlQEBUs_3EDI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGFua2NvZmZlZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjQvMTEvV2hhdC1B/cmUtVGhlLURpZmZl/cmVudC1UeXBlcy1P/Zi1DYXBwdWNjaW5v/LTEwMjR4NTc0LnBu/Zw"
        },
        { 
          name: "Cafe Latte", 
          price: 120, 
          desc: "espresso, milk, foam", 
          longDesc: "Smooth and lightly sweet, featuring a single or double shot of espresso balanced with silky-smooth steamed milk and a thin layer of microfoam.",
          ingredients: ["Espresso", "Silky Steamed Milk"],
          image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Americano", 
          price: 120, 
          desc: "espresso, water", 
          longDesc: "Pure and potent. Our signature double-shot espresso lengthened with hot water to highlight the bean's nuanced fruit and nut notes.",
          ingredients: ["Double Shot Espresso", "Hot Water"],
          image: "https://imgs.search.brave.com/wKem8iixSHCur5fOoQJR2oz5rRUz8b-MsNqZsp9skoo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzIwLzg1LzA0/LzM2MF9GXzUyMDg1/MDQ2Ml9SN3hLeWNL/eWZQRnhKZWJRQTdh/SU1HR2ozVnBQdldt/cC5qcGc"
        },
        { 
          name: "Espresso", 
          price: 80, 
          desc: "pure shot", 
          longDesc: "The heart of everything we do. A concentrated, complex shot with a rich crema, bright acidity, and deep cocoa undertones.",
          ingredients: ["Single Origin Beans"],
          image: "https://imgs.search.brave.com/u7UVxhB6jHuy0xizTVKvEhTlYSKxkKihS2hbmEtgfC4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE4Lzc1LzgxLzg1/LzM2MF9GXzE4NzU4/MTg1MzZfOFZWaVg3/UmdROWF1d3NUQWJH/V0xVclk3eEhyMERX/a2EuanBn"
        },
      ]
    },
    {
      category: "Refreshers",
      icon: <IceCream className="text-cafe-gold" />,
      items: [
        { 
          name: "Peach Berry Fizz", 
          price: 150, 
          desc: "strawberry, peach, carbonated water",
          longDesc: "Light, effervescent, and bursting with summer vibes. A sparkling blend of sweet peach and tart berries for an instant cool-down.",
          ingredients: ["Strawberry", "Peach", "Sparkling Water", "Mint"],
          image: "https://imgs.search.brave.com/ILu1nUWhNDphlb66S5Znj9QynBdZnIB4JXKuQn3L--I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oZXli/YWlydGVuZGVyLnMz/LmFtYXpvbmF3cy5j/b20vcmVjaXBlcy9w/ZWFjaC1jcmFuYmVy/cnktZml6ei5wbmc"
        },
        { 
          name: "Kiwi Passion", 
          price: 150, 
          desc: "kiwi, passion fruit, carbonated water",
          longDesc: "Exotic and zesty. A tropical escape combining sharp kiwi notes with fragrant passion fruit and a sparkling finish.",
          ingredients: ["Kiwi", "Passion Fruit", "Sparkling Water", "Lime"],
          image: "https://imgs.search.brave.com/q7v61HTn8ckolSBkU-PYzIgRnQNjebob2lkq-fWPrEM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYw/ODA0MTMyNS9waG90/by9yZWZyZXNoaW5n/LXBhc3Npb24tZnJ1/aXQtZHJpbmstd2l0/aC1taW50LWFuZC12/b2RrYS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9aWZWZkFL/RC1LMzhLMVZlbGxJ/bU1YTGRlWEFZRXky/TU9XeXVtd0t5VFVf/ND0"
        },
        { 
          name: "Purple Lemonade", 
          price: 130, 
          desc: "lemon, butterfly pea tea, carbonated water",
          longDesc: "A magical, color-changing lemonade infused with butterfly pea tea for a botanical twist and a vibrant purple hue.",
          ingredients: ["Lemon", "Butterfly Pea Tea", "Sparkling Water", "Natural Syrup"],
          image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Honey Peach Tea", 
          price: 150, 
          desc: "lemon, honey, peach, black tea",
          longDesc: "Soothing and fragrant. Our premium black tea cold-steeped with organic honey and ripe peach slices for a refined sweetness.",
          ingredients: ["Lemon", "Honey", "Peach", "Premium Black Tea"],
          image: "https://imgs.search.brave.com/bnlqoj63hxA5BqDarvKpMPwwsoA9Lgs3hLinMiE8EH0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/d2lsbGNvb2tmb3Jz/bWlsZXMuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzA1/L0dpbmdlci1QZWFj/aC1hbmQtSG9uZXkt/SWNlZC1HcmVlbi1U/ZWEtNS1mcm9tLXdp/bGxjb29rZm9yc21p/bGVzLmNvbV8uanBn"
        },
        { 
          name: "Earl Grey Tea", 
          price: 130, 
          desc: "lemon, honey, earl grey, black tea",
          longDesc: "The gentleman's classic. Robust black tea with a delicate citrus aroma from bergamot oil, finished with a touch of honey.",
          ingredients: ["Lemon", "Honey", "Earl Grey", "Black Tea"],
          image: "https://imgs.search.brave.com/iIqSI3XD5w6BFn4-DaojQnXk7gt8lX5wqHX_t1zcOKo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YmlnZWxvd3RlYS5j/b20vY2RuL3Nob3Av/ZmlsZXMveXE2cWFr/bmNva3JyYWsyOGZr/anIuanBnP3Y9MTc3/Njc1MzgzOSZ3aWR0/aD0xMDgw"
        },
      ]
    },
    {
      category: "Non-Espresso",
      icon: <CheckCircle2 className="text-cafe-gold" />,
      items: [
        { 
          name: "Matcha", 
          price: 130, 
          desc: "matcha, milk",
          longDesc: "Premium grade ceremonial matcha whisked into creamy milk for a grounded, earthy energy boost that stays with you all day.",
          ingredients: ["Ceremonial Matcha", "Fresh Milk", "Honey (Optional)"],
          image: "https://imgs.search.brave.com/Ej_vvpE7SJRpx_GAuTqK3IkGy5zUAfTcQO8fNxAI0UY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIy/MzQzOTgxMC9waG90/by9oYW5kLXJlYWNo/ZXMtZm9yLWEtcmVm/cmVzaGluZy1pY2Vk/LW1hdGNoYS1sYXR0/ZS1vbi1hLXRhYmxl/LWFjY29tcGFuaWVk/LWJ5LWEtZ2xhc3Mt/b2YtaWNlZC53ZWJw/P2E9MSZiPTEmcz02/MTJ4NjEyJnc9MCZr/PTIwJmM9N0tHREYt/SmdrT21pNk1uOEdt/cnc5dGNQZ1E4SG5a/RTE1MTFuU3I4cWZV/ST0"
        },
        { 
          name: "Strawberry Latte", 
          price: 130, 
          desc: "strawberry, milk",
          longDesc: "A nostalgic, fruity delight featuring hand-muddled strawberry compote and cold milk for a fresh, sweet treat.",
          ingredients: ["Strawberry Compote", "Fresh Milk", "Vanilla Cream"],
          image: "https://imgs.search.brave.com/T7gCikUSs1Dq-PvJnk5oNHTGnS1zeQGWI62S-gydD30/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGV4YW5lcmluLmNv/bS9jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/Ni9zdHJhd2JlcnJ5/LWxhdHRlLWltYWdl/LmpwZw"
        },
        { 
          name: "Horchata", 
          price: 130, 
          desc: "horchata, milk, cinnamon topping",
          longDesc: "Inspired by tradition. A creamy rice and cinnamon milk blend that's both refreshing and deeply comforting.",
          ingredients: ["Rice Milk", "Cinnamon", "Vanilla", "Brown Sugar"],
          image: "https://imgs.search.brave.com/6ucBLxXwfoO9ybRDFRRzpVUSFF0IxCCC8YvtQpHGOkA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9ob3Jj/aGF0YS0yNTY1Mjc3/Ni5qcGc"
        },
        { 
          name: "Dark Chocolate", 
          price: 150, 
          desc: "dark chocolate, milk",
          longDesc: "For the purists. A thick, indulgent drink made from 70% dark cocoa and farm-fresh milk for a rich, velvety mouthfeel.",
          ingredients: ["70% Dark Chocolate", "Fresh Milk", "Cocoa Nib Garnish"],
          image: "https://imgs.search.brave.com/91G-6_NGBZDA61_BJZby1Rx2vJGAySQaljKGTKuL2OE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE1/OTUzODE0Ny9waG90/by9ob3QtY2hvY29s/YXRlLXdpdGgtd2hp/cHBlZC1jcmVhbS1z/ZXJ2ZWQtaW4tZHJp/bmtpbmctZ2xhc3Mt/aW4tYS1jYWZlLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1m/NUxveTFCTXdOdXhY/YkJSMWM1Y2FNS1NY/VWtVUEFKeHZGZTJD/b1JZczQwPQ"
        },
        { 
          name: "Dark Choco Oats", 
          price: 160, 
          desc: "dark chocolate, oat milk, oats",
          longDesc: "A dairy-free powerhouse. Rich dark chocolate blended with creamy oat milk and whole grain oats for a filling, tasty drink.",
          ingredients: ["Dark Chocolate", "Premium Oat Milk", "Rolled Oats"],
          image: "https://imgs.search.brave.com/iAy-SrcJxj9tLYqUJGOizR1zODn5_tXQ7UwQw5befMU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9nbG93/LWRpYXJpZXMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI0/LzA3L0JsZW5kZWQt/Q2hvY29sYXRlLU9h/dHMtd2l0aC1TbWFz/aC1Ub3AtMS5qcGc"
        },
      ]
    }
  ],
  Food: [
    {
      category: "Waffles",
      icon: <Utensils className="text-cafe-gold" />,
      items: [
        { 
          name: "Butter Waffle", 
          price: 130,
          longDesc: "Classic golden waffle, crisp on the outside and fluffy on the inside. Served with whipped butter and maple syrup.",
          ingredients: ["Artisan Flour", "Fresh Eggs", "Creamy Butter"],
          image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Belgian Chocolate Waffle", 
          price: 170,
          longDesc: "Authentic Liege-style waffle topped with melted Belgian dark chocolate and fresh cream. The ultimate sweet treat.",
          ingredients: ["Pearl Sugar", "Dark Chocolate", "Whipped Cream"],
          image: "https://imgs.search.brave.com/aVDEihUru_z2FflYkwqvMFfjQLwY0rW8zSmtX9kUAKQ/rs:fit:500:0:1:0/g:ce/aHR0cDovL3d3dy5j/b25mZXR0aWFuZGJs/aXNzLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxOC8wMS9U/cmlwbGUtQ2hvY29s/YXRlLUJlbGdpYW4t/V2FmZmxlcy02LTgz/M3gxMDI0LmpwZw"
        },
        { 
          name: "Mixed Berry Waffle", 
          price: 180,
          longDesc: "Golden waffle topped with a medley of fresh strawberries, blueberries, and raspberries, finished with a drizzle of honey.",
          ingredients: ["Fresh Berries", "Organic Honey", "Waffle Batter"],
          image: "https://imgs.search.brave.com/rNEWMDsP2pgmiD2thRfX90iycF2VrETnbrfSoOm63O4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/a3J1c3RlYXouY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIx/LzA3L21peGVkYmVy/cnljcmVhbWNoZWVz/ZXdhZmZsZWNha2Vz/LmpwZWc"
        },
      ]
    },
    {
      category: "Pastries & Rolls",
      icon: <Sparkles className="text-cafe-gold" />,
      items: [
        { 
          name: "Cookies & Cream (NY Roll)", 
          price: 160,
          longDesc: "A swirl of flakey pastry filled with white chocolate ganache and crushed Oreo cookies for a modern pastry twist.",
          ingredients: ["Oreo Crumbles", "White Ganache", "Pastry Dough"],
          image: "https://imgs.search.brave.com/v1c7vqLIPYYKX6Fqzw4cJ3WOEhrhyQDDHoF2lu4zrhs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tdWNo/YnV0dGVyLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8x/MC9OZXd5b3JrLXJv/bGxzLTMwLTc2OHgx/MDI0LmpwZw"
        },
        { 
          name: "Choco Almond (NY Roll)", 
          price: 180,
          longDesc: "Our circular pastry roll filled with dark chocolate cream and encrusted with roasted almonds for a nutty finish.",
          ingredients: ["Dark Chocolate Cream", "Toasted Almonds", "Sweet Glaze"],
          image: "https://imgs.search.brave.com/IdRQVi6J6noWsj2fw681vMNwlgUMxfbZUUUXkevpABk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tdWNo/YnV0dGVyLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8x/MC9OZXd5b3JrLXJv/bGxzLTI5LTc2OHgx/MDI0LmpwZw"
        },
        { 
          name: "Cinnamon Danish", 
          price: 130,
          longDesc: "A spiral of buttery dough, spicy cinnamon sugar, and a drizzle of vanilla cream icing. Perfect with an Americano.",
          ingredients: ["Cinnamon", "Brown Sugar", "Vanilla Icing"],
          image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Ube Danish", 
          price: 140,
          longDesc: "Locally inspired. Filled with sweet purple yam halaya and topped with white coconut flakes for a tropical touch.",
          ingredients: ["Sweetened Ube Yam", "Coconut", "Danish Pastry"],
          image: "https://imgs.search.brave.com/uMeSs5_-ihQrpc9ft_Z5L2yp_7P6-RTlNNNKCZgL4lg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9ob31l/LW1hZGUtdWJlLWNy/b2lzc2FudHMtZnJl/c2gtYmFrZWQtdXNp/bmctZmxhdm91cmlu/Zy1wdXJwbGUteWFt/LXBvd2Rlci10aHJl/ZS1ib29rLWZvbGRz/LWxpZ2h0bHktc3By/aW5rbGVkLWNvY29u/dXQtMjUyMjA2NjI5/LmpwZw"
        },
        { 
          name: "Brownies", 
          price: 75,
          longDesc: "Dense, fudgy, and intensely chocolatey—made with local Batangas chocolate and sea salt. A decadent classic.",
          ingredients: ["Batangas Cocoa", "Ebony Choco", "Sea Salt"],
          image: "https://imgs.search.brave.com/Y1iexP2iYmLwy5my2v3TNyJ4d9PnSAPPFlf0xp0lqwA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9icm93/bmllcy1jaG9jb2xh/dGUtZGlzaC1pbmdy/ZWRpZW50cy00OTgy/ODc4MS5qcGc"
        },
        { 
          name: "Biscoff Muffin", 
          price: 100,
          longDesc: "A moist, spiced muffin with a hidden Biscoff center and a Lotus biscuit topper for a delightful surprise.",
          ingredients: ["Speculoos", "Cinnamon", "Brown Sugar"],
          image: "https://imgs.search.brave.com/Q2U8naRz2lsvFoBVYIXgv7nbQqYzSkLPXbGR-wnaW78/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb3Zl/YW5kZmxvdXJieXBv/b2phLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNS8xMC9C/aXNjb2ZmLW11ZmZp/bnMtNTA2eDY3NS5q/cGc"
        },
      ]
    },
    {
      category: "Hearty",
      icon: <Utensils className="text-cafe-gold" />,
      items: [
        { 
          name: "Lasagna", 
          price: 230, 
          desc: "Rich and cheesy classic pasta",
          longDesc: "Layers of house-made pasta, rich wagyu beef bolognese, creamy béchamel, and four melted cheeses. Comfort food at its best.",
          ingredients: ["Wagyu Beef", "Béchamel", "Mozzarella", "Parmesan"],
          image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800"
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
    <section id="menu" className="py-32 px-4 bg-white relative overflow-hidden">
      {/* Decorative Brand Accent */}
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[20vw] font-black leading-none uppercase italic">Roasted</h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-[2px] w-12 bg-cafe-gold/30" />
            <span className="text-cafe-gold font-black uppercase tracking-[0.6em] text-[10px] whitespace-nowrap">
              Italian Artisan Coffee
            </span>
            <div className="h-[2px] w-12 bg-cafe-gold/30" />
          </motion.div>
          
          <h2 className="text-6xl md:text-8xl font-serif text-cafe-dark mb-8 tracking-tight uppercase leading-none">
            Our Menu
          </h2>
          
          <p className="max-w-xl mx-auto text-cafe-dark/50 font-bold uppercase tracking-widest text-[10px] mb-16 leading-relaxed">
            Cafe Norte · Freshly Made in Italy · Artisan Crafted
          </p>
          
          <div className="flex justify-center gap-6 mb-12 flex-wrap">
            {(['Drinks', 'Food'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setMainTab(tab); setActiveCategory(0); setSearchQuery(''); setPriceFilter(null); setExpandedItem(null); }}
                className={`px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 scale-100 active:scale-95 ${
                  mainTab === tab 
                  ? 'bg-cafe-brown text-white shadow-[0_20px_50px_rgba(0,98,65,0.3)]' 
                  : 'bg-white text-cafe-brown border-2 border-cafe-brown/10 hover:border-cafe-brown'
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
                className="w-full bg-cafe-light/50 border-2 border-cafe-brown/5 px-8 py-5 rounded-2xl text-xs font-black text-cafe-dark placeholder:text-cafe-dark/30 focus:outline-none focus:border-cafe-brown/20 focus:bg-white transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-4 bg-cafe-light/50 p-2 rounded-2xl border-2 border-cafe-brown/5">
              {[130, 160, 200].map(price => (
                <button
                  key={price}
                  onClick={() => setPriceFilter(priceFilter === price ? null : price)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    priceFilter === price 
                    ? 'bg-cafe-gold text-white shadow-lg' 
                    : 'text-cafe-dark/40 hover:text-cafe-dark'
                  }`}
                >
                  ₱{price}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {filteredData.length > 0 ? (
            filteredData.map((cat, idx) => {
              const isExpanded = isFiltering || activeCategory === idx;
              return (
                <div key={cat.category} className="group">
                  <motion.button
                    whileHover="hover"
                    onClick={() => !isFiltering && setActiveCategory(activeCategory === idx ? -1 : idx)}
                    className={`w-full flex items-center justify-between p-8 rounded-[2.5rem] transition-all duration-500 text-left outline-none border-2 ${
                      isExpanded 
                      ? 'bg-white border-cafe-brown shadow-[0_40px_80px_rgba(30,57,50,0.08)]' 
                      : 'bg-white/50 border-transparent hover:bg-white hover:shadow-xl'
                    } ${isFiltering ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-8">
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                        isExpanded ? 'bg-cafe-brown text-white rotate-12 scale-110' : 'bg-white text-cafe-gold shadow-md'
                      }`}>
                        <motion.div 
                          variants={{
                            hover: { scale: 1.2, filter: "drop-shadow(0 0 12px rgba(181, 142, 105, 0.4))" }
                          }}
                          className="scale-125"
                        >
                          {cat.icon}
                        </motion.div>
                      </div>
                      <div>
                        <h3 className={`font-serif text-3xl tracking-tight uppercase transition-colors duration-500 ${
                          isExpanded ? 'text-cafe-dark' : 'text-cafe-dark/40'
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
                          activeCategory === idx ? 'border-cafe-brown text-cafe-brown' : 'border-cafe-dark/10 text-cafe-dark/20'
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
                    <div className="p-12 bg-white/40 rounded-[3rem] mt-6 border-2 border-cafe-brown/5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {cat.items.map((item, i) => {
                          const isShowingDetails = expandedItem === item.name;
                          return (
                            <motion.div 
                              key={item.name}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ 
                                delay: i * 0.05,
                                duration: 0.5,
                                ease: [0.215, 0.61, 0.355, 1],
                                scale: { duration: 0.2 },
                                boxShadow: { duration: 0.2 }
                              }}
                              whileHover={!isShowingDetails ? { 
                                scale: 1.03, 
                                boxShadow: "0 30px 60px -12px rgba(30, 57, 50, 0.2)",
                                borderColor: "rgba(30, 57, 50, 0.15)"
                              } : {}}
                              className={`relative p-8 rounded-[2rem] transition-all cursor-pointer overflow-hidden border-2 group/item ${
                                isShowingDetails 
                                ? 'bg-white border-cafe-gold shadow-2xl scale-[1.02]' 
                                : 'bg-transparent border-transparent hover:bg-white/90'
                              }`}
                              onClick={() => setExpandedItem(isShowingDetails ? null : item.name)}
                            >
                              <div className="flex gap-6 items-start">
                                {!isShowingDetails && (
                                  <motion.div 
                                    layoutId={`img-${item.name}`}
                                    className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border-2 border-cafe-brown/5"
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
                                      <h4 className="font-serif text-2xl text-cafe-dark group-hover/item:text-cafe-brown transition-colors">
                                        {item.name}
                                      </h4>
                                      <p className="text-cafe-dark/40 text-[9px] font-black uppercase tracking-[0.2em] mt-1">
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
                                    className="pt-6 mt-6 border-t border-cafe-brown/10"
                                  >
                                    <div className="space-y-6 text-left">
                                      <motion.div 
                                        layoutId={`img-${item.name}`}
                                        className="w-full h-56 rounded-2xl overflow-hidden shadow-inner bg-cafe-light"
                                      >
                                        <img 
                                          src={item.image} 
                                          alt={item.name}
                                          className="w-full h-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      </motion.div>
                                      <div>
                                        <h5 className="text-[9px] font-black uppercase tracking-widest text-cafe-gold mb-3">About this selection</h5>
                                        <p className="text-xs text-cafe-dark/70 font-medium leading-relaxed italic">
                                          "{item.longDesc}"
                                        </p>
                                      </div>
                                      
                                      {item.ingredients.length > 0 && (
                                        <div>
                                          <h5 className="text-[9px] font-black uppercase tracking-widest text-cafe-gold mb-3">Key Ingredients</h5>
                                          <div className="flex flex-wrap gap-2">
                                            {item.ingredients.map(ing => (
                                              <span key={ing} className="px-3 py-1.5 bg-cafe-light text-[9px] font-bold text-cafe-brown rounded-lg uppercase">
                                                {ing}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      <div className="flex gap-4 pt-4">
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
                                          className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all ${
                                            isInWishlist(item.name)
                                            ? 'bg-cafe-gold text-white'
                                            : 'bg-cafe-dark text-white hover:bg-cafe-brown'
                                          }`}
                                        >
                                          {isInWishlist(item.name) ? <CheckCircle2 size={14} /> : <Heart size={14} />}
                                          {isInWishlist(item.name) ? 'In Wishlist' : 'Add to Wishlist'}
                                        </button>
                                        <button 
                                          className="w-14 h-14 flex items-center justify-center bg-cafe-light text-cafe-brown rounded-xl hover:bg-cafe-brown hover:text-white transition-all group/plus"
                                          onClick={(e) => { e.stopPropagation(); /* Future cart logic */ }}
                                        >
                                          <Plus size={18} className="group-hover/plus:rotate-90 transition-transform" />
                                        </button>
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
            <div className="text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-cafe-brown/10">
              <div className="w-24 h-24 bg-cafe-light rounded-[2.5rem] flex items-center justify-center text-cafe-gold mx-auto mb-8 animate-pulse">
                <Coffee size={40} strokeWidth={1.5} />
              </div>
              <p className="font-serif text-4xl text-cafe-dark mb-6 italic">No matches found.</p>
              <button 
                onClick={() => { setSearchQuery(''); setPriceFilter(null); }}
                className="px-12 py-5 bg-cafe-brown text-white text-[10px] font-black tracking-[0.4em] uppercase rounded-full hover:shadow-2xl transition-all"
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

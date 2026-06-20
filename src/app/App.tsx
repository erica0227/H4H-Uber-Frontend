import { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  Trash2,
  Star,
  Clock,
  Tag,
  ArrowLeft,
  X,
  ShoppingCart,
  Users,
  ChefHat,
  ChevronDown,
  Trophy,
  LogOut,
  Utensils,
  Coffee,
  Cookie,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type View = "landing" | "friends" | "kitchen" | "tournament" | "result";
type KitchenTab = "main" | "snack" | "drink";

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  kitchen: KitchenTab;
}

interface Recommendation {
  id: string;
  dish: string;
  restaurant: string;
  time: string;
  deliveryCost: number;
  cost: number;
  rating: number;
  discount: string;
  ingredients: string[];
  description: string;
  cuisine: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const INGREDIENTS: Ingredient[] = [
  { id: "chicken", name: "Chicken", emoji: "🍗", kitchen: "main" },
  { id: "beef", name: "Beef", emoji: "🥩", kitchen: "main" },
  { id: "salmon", name: "Salmon", emoji: "🐟", kitchen: "main" },
  { id: "tofu", name: "Tofu", emoji: "🫘", kitchen: "main" },
  { id: "pasta", name: "Pasta", emoji: "🍝", kitchen: "main" },
  { id: "rice", name: "Rice", emoji: "🍚", kitchen: "main" },
  { id: "eggs", name: "Eggs", emoji: "🥚", kitchen: "main" },
  { id: "broccoli", name: "Broccoli", emoji: "🥦", kitchen: "main" },
  { id: "tomato", name: "Tomato", emoji: "🍅", kitchen: "main" },
  { id: "garlic", name: "Garlic", emoji: "🧄", kitchen: "main" },
  { id: "onion", name: "Onion", emoji: "🧅", kitchen: "main" },
  { id: "potato", name: "Potato", emoji: "🥔", kitchen: "main" },
  { id: "nuts", name: "Nuts", emoji: "🥜", kitchen: "snack" },
  { id: "cheese", name: "Cheese", emoji: "🧀", kitchen: "snack" },
  { id: "crackers", name: "Crackers", emoji: "🍘", kitchen: "snack" },
  { id: "apple", name: "Apple", emoji: "🍎", kitchen: "snack" },
  { id: "banana", name: "Banana", emoji: "🍌", kitchen: "snack" },
  { id: "yogurt", name: "Yogurt", emoji: "🥛", kitchen: "snack" },
  { id: "popcorn", name: "Popcorn", emoji: "🍿", kitchen: "snack" },
  { id: "chocolate", name: "Chocolate", emoji: "🍫", kitchen: "snack" },
  { id: "coffee", name: "Coffee", emoji: "☕", kitchen: "drink" },
  { id: "tea", name: "Tea", emoji: "🍵", kitchen: "drink" },
  { id: "juice", name: "Juice", emoji: "🧃", kitchen: "drink" },
  { id: "smoothie", name: "Smoothie", emoji: "🥤", kitchen: "drink" },
  { id: "soda", name: "Soda", emoji: "🫙", kitchen: "drink" },
  { id: "water", name: "Water", emoji: "💧", kitchen: "drink" },
  { id: "wine", name: "Wine", emoji: "🍷", kitchen: "drink" },
  { id: "boba", name: "Boba", emoji: "🧋", kitchen: "drink" },
];

const ALL_RECS: Recommendation[] = [
  {
    id: "r1",
    dish: "Grilled Chicken Teriyaki Bowl",
    restaurant: "Tokyo Garden",
    time: "25 min",
    deliveryCost: 1.99,
    cost: 14.99,
    rating: 4.8,
    discount: "15% off",
    ingredients: ["Chicken", "Rice", "Broccoli", "Garlic"],
    description:
      "Tender grilled chicken glazed with house-made teriyaki sauce over steamed jasmine rice, topped with sesame broccoli, pickled ginger, and toasted sesame seeds.",
    cuisine: "Japanese",
  },
  {
    id: "r2",
    dish: "Salmon Pasta al Limone",
    restaurant: "Trattoria Bella",
    time: "30 min",
    deliveryCost: 2.99,
    cost: 18.5,
    rating: 4.6,
    discount: "10% off",
    ingredients: ["Salmon", "Pasta", "Garlic", "Tomato"],
    description:
      "Fresh Atlantic salmon over al dente spaghetti with bright lemon cream sauce, cherry tomatoes, capers, and fresh dill. Light and aromatic.",
    cuisine: "Italian",
  },
  {
    id: "r3",
    dish: "Beef Bulgogi Bibimbap",
    restaurant: "Seoul Street",
    time: "20 min",
    deliveryCost: 0,
    cost: 16.99,
    rating: 4.9,
    discount: "Free delivery",
    ingredients: ["Beef", "Rice", "Eggs", "Broccoli"],
    description:
      "Marinated wagyu-style beef over stone pot rice with seasonal vegetables, a perfectly fried egg, house gochujang paste, and sesame oil drizzle.",
    cuisine: "Korean",
  },
  {
    id: "r4",
    dish: "Tofu Mapo Noodles",
    restaurant: "Spice Route",
    time: "15 min",
    deliveryCost: 1.49,
    cost: 12.99,
    rating: 4.5,
    discount: "20% off",
    ingredients: ["Tofu", "Pasta", "Garlic", "Tomato"],
    description:
      "Silken tofu in numbing Sichuan chili broth with wheat noodles, crispy scallions, chili oil, and house Sichuan peppercorn seasoning. Vegan-friendly.",
    cuisine: "Chinese",
  },
  {
    id: "r5",
    dish: "Egg Fried Rice Supreme",
    restaurant: "Golden Wok",
    time: "10 min",
    deliveryCost: 0.99,
    cost: 11.5,
    rating: 4.7,
    discount: "$2 off",
    ingredients: ["Eggs", "Rice", "Garlic", "Onion"],
    description:
      "Wok-tossed jasmine rice with farm-fresh eggs, roasted garlic, golden onions, soy-ginger glaze, and crispy shallots.",
    cuisine: "Chinese",
  },
  {
    id: "r6",
    dish: "Honey Garlic Salmon Steak",
    restaurant: "Harbor Fresh",
    time: "22 min",
    deliveryCost: 3.49,
    cost: 22.0,
    rating: 4.8,
    discount: "None",
    ingredients: ["Salmon", "Garlic", "Broccoli", "Potato"],
    description:
      "Pan-seared wild-caught salmon with honey-garlic glaze, roasted tenderstem broccoli, crispy potato wedges, and lemon caper butter.",
    cuisine: "Western",
  },
  {
    id: "r7",
    dish: "Classic Smash Burger",
    restaurant: "The Stack House",
    time: "18 min",
    deliveryCost: 1.99,
    cost: 15.99,
    rating: 4.4,
    discount: "Free fries",
    ingredients: ["Beef", "Tomato", "Onion", "Eggs"],
    description:
      "Double smashed beef patty with aged cheddar, beefsteak tomato, caramelised onion, special sauce on a toasted brioche bun with golden fries.",
    cuisine: "American",
  },
  {
    id: "r8",
    dish: "Chicken Tikka Masala",
    restaurant: "Bombay Brasserie",
    time: "28 min",
    deliveryCost: 2.49,
    cost: 17.5,
    rating: 4.7,
    discount: "12% off",
    ingredients: ["Chicken", "Tomato", "Garlic", "Rice"],
    description:
      "Chargrilled tandoor chicken in rich creamy tomato masala sauce, served with fragrant saffron basmati rice and warm garlic naan.",
    cuisine: "Indian",
  },
  {
    id: "r9",
    dish: "Classic Pasta Carbonara",
    restaurant: "Nonna Roma",
    time: "20 min",
    deliveryCost: 2.99,
    cost: 16.0,
    rating: 4.6,
    discount: "Happy hour",
    ingredients: ["Pasta", "Eggs", "Garlic"],
    description:
      "Traditional Roman carbonara — silky egg sauce, guanciale, freshly cracked black pepper, and aged pecorino romano. No cream, just pure technique.",
    cuisine: "Italian",
  },
  {
    id: "r10",
    dish: "Veggie Buddha Bowl",
    restaurant: "Green Earth",
    time: "12 min",
    deliveryCost: 0.99,
    cost: 13.5,
    rating: 4.5,
    discount: "15% off",
    ingredients: ["Tofu", "Rice", "Broccoli", "Tomato"],
    description:
      "Baked sesame tofu, brown rice, roasted broccoli, cherry tomatoes, edamame, pickled cabbage, and tahini miso dressing.",
    cuisine: "Healthy",
  },
  {
    id: "r11",
    dish: "Avocado Eggs Benedict",
    restaurant: "The Morning Table",
    time: "18 min",
    deliveryCost: 1.99,
    cost: 14.5,
    rating: 4.7,
    discount: "Free coffee",
    ingredients: ["Eggs", "Cheese", "Potato", "Coffee"],
    description:
      "Poached eggs on toasted sourdough with whipped ricotta, crispy hash browns, and a side of freshly brewed house coffee. Weekend brunch staple.",
    cuisine: "Brunch",
  },
  {
    id: "r12",
    dish: "Smoothie Bowl & Granola",
    restaurant: "Bloom Kitchen",
    time: "8 min",
    deliveryCost: 0.99,
    cost: 12.0,
    rating: 4.6,
    discount: "10% off",
    ingredients: ["Smoothie", "Banana", "Yogurt", "Nuts"],
    description:
      "Thick blended acai and banana base topped with house granola, fresh banana slices, toasted almonds, coconut flakes, and a drizzle of honey.",
    cuisine: "Healthy",
  },
  {
    id: "r13",
    dish: "Artisan Cheese Board",
    restaurant: "The Cork & Board",
    time: "10 min",
    deliveryCost: 2.49,
    cost: 19.0,
    rating: 4.8,
    discount: "Wine pairing included",
    ingredients: ["Cheese", "Crackers", "Nuts", "Wine"],
    description:
      "Three seasonal cheeses — aged cheddar, brie, and manchego — with seeded crackers, candied walnuts, fig preserve, and a glass of house red.",
    cuisine: "European",
  },
  {
    id: "r14",
    dish: "Chocolate Fondue Platter",
    restaurant: "Sweet Theory",
    time: "15 min",
    deliveryCost: 1.49,
    cost: 16.5,
    rating: 4.5,
    discount: "20% off after 8pm",
    ingredients: ["Chocolate", "Banana", "Nuts", "Apple"],
    description:
      "Rich 70% dark chocolate fondue with skewered banana, apple slices, toasted hazelnuts, and mini marshmallows for dipping.",
    cuisine: "Dessert",
  },
  {
    id: "r15",
    dish: "Cold Brew Protein Bowl",
    restaurant: "Fuel & Form",
    time: "10 min",
    deliveryCost: 0.99,
    cost: 13.0,
    rating: 4.4,
    discount: "Loyalty stamp",
    ingredients: ["Coffee", "Yogurt", "Banana", "Nuts"],
    description:
      "Greek yogurt base with cold brew–soaked oats, sliced banana, almond butter swirl, roasted mixed nuts, and a shot of cold brew on the side.",
    cuisine: "Healthy",
  },
  {
    id: "r16",
    dish: "Matcha Yogurt Parfait",
    restaurant: "Bloom Kitchen",
    time: "6 min",
    deliveryCost: 0.99,
    cost: 10.5,
    rating: 4.5,
    discount: "None",
    ingredients: ["Tea", "Yogurt", "Apple", "Nuts"],
    description:
      "Layers of ceremonial matcha-infused yogurt, caramelised apple compote, candied pecans, and house granola. Light, bright, and energising.",
    cuisine: "Healthy",
  },
  {
    id: "r17",
    dish: "Loaded Potato Skins",
    restaurant: "The Stack House",
    time: "20 min",
    deliveryCost: 1.99,
    cost: 11.0,
    rating: 4.3,
    discount: "$3 off",
    ingredients: ["Potato", "Cheese", "Onion", "Yogurt"],
    description:
      "Crispy twice-baked potato skins loaded with aged cheddar, caramelised onion, sour cream, and smoked paprika. A comfort classic.",
    cuisine: "American",
  },
  {
    id: "r18",
    dish: "Boba French Toast",
    restaurant: "Late Morn",
    time: "22 min",
    deliveryCost: 2.49,
    cost: 15.0,
    rating: 4.6,
    discount: "Brunch special",
    ingredients: ["Eggs", "Banana", "Boba", "Chocolate"],
    description:
      "Thick-cut brioche French toast, banana foster topping, crushed boba pearls, and a drizzle of dark chocolate ganache. A dessert for breakfast.",
    cuisine: "Fusion",
  },
  {
    id: "r19",
    dish: "Sparkling Juice & Mezze",
    restaurant: "The Vine Table",
    time: "12 min",
    deliveryCost: 1.99,
    cost: 17.0,
    rating: 4.5,
    discount: "None",
    ingredients: ["Juice", "Cheese", "Crackers", "Tomato"],
    description:
      "Chilled sparkling apple and elderflower juice paired with whipped feta, heirloom tomatoes, seeded crackers, and marinated olives.",
    cuisine: "Mediterranean",
  },
  {
    id: "r20",
    dish: "Popcorn Chicken Bento",
    restaurant: "Bento Box Co.",
    time: "16 min",
    deliveryCost: 1.49,
    cost: 14.0,
    rating: 4.6,
    discount: "Free drink",
    ingredients: ["Chicken", "Popcorn", "Rice", "Soda"],
    description:
      "Crispy popcorn chicken bites, steamed jasmine rice, pickled radish, edamame, and a cold soda. A proper lunchbox in a box.",
    cuisine: "Japanese-Fusion",
  },
];

const FRIENDS = [
  "Alex Chen",
  "Maya Patel",
  "Jordan Kim",
  "Sam Rivera",
  "Casey Wong",
  "Taylor Lee",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pickRecs(selected: Ingredient[]): Recommendation[] {
  if (selected.length === 0) {
    // Nothing selected — return top-rated recs
    return [...ALL_RECS].sort((a, b) => b.rating - a.rating).slice(0, 6);
  }

  const names = new Set(selected.map((i) => i.name));

  const scored = ALL_RECS.map((rec) => ({
    rec,
    // Count how many of this rec's ingredients the user actually selected
    score: rec.ingredients.filter((n) => names.has(n)).length,
  }));

  // Recs with at least one match, sorted by overlap then rating
  const matched = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.rec.rating - a.rec.rating)
    .map((s) => s.rec);

  // Recs with no overlap at all, sorted by rating as fallback padding
  const unmatched = scored
    .filter((s) => s.score === 0)
    .sort((a, b) => b.rec.rating - a.rec.rating)
    .map((s) => s.rec);

  // Fill to exactly 6: matched first, then pad with highest-rated unmatched
  const combined = [...matched, ...unmatched];
  return combined.slice(0, 6);
}

// ─── TiltCard ────────────────────────────────────────────────────────────────

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        setRot({ x: (ny - 0.5) * -16, y: (nx - 0.5) * 16 });
        setActive(true);
      }}
      onMouseLeave={() => {
        setRot({ x: 0, y: 0 });
        setActive(false);
      }}
      style={{
        transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale(${active ? 1.015 : 1})`,
        transition: active
          ? "transform 0.08s ease"
          : "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

// ─── Landing ─────────────────────────────────────────────────────────────────

function LandingPage({
  onMe,
  onFriend,
}: {
  onMe: () => void;
  onFriend: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
        <span className="absolute top-12 right-16 text-7xl opacity-[0.12]">🍜</span>
        <span className="absolute bottom-16 left-12 text-7xl opacity-[0.12]">🥗</span>
        <span className="absolute top-1/3 left-8 text-5xl opacity-[0.08]">🍕</span>
        <span className="absolute bottom-1/3 right-8 text-5xl opacity-[0.08]">🍣</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-xl relative z-10"
      >
        <div className="text-6xl mb-6 select-none">🧑‍🍳</div>
        <h1
          className="text-5xl sm:text-6xl font-bold text-foreground mb-5 leading-[1.1]"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          Who is choosing your ingredients today?
        </h1>
        <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
          Build your plate, then let us find your perfect meal match.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onMe}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl text-xl font-semibold hover:opacity-90 transition-opacity shadow-2xl shadow-primary/30"
          >
            Me 🙋
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onFriend}
            className="px-10 py-4 bg-card text-foreground border border-border rounded-2xl text-xl font-semibold hover:bg-secondary transition-colors"
          >
            Choose a Friend 👥
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Friends ─────────────────────────────────────────────────────────────────

function FriendsPage({ onBack }: { onBack: () => void }) {
  const [invited, setInvited] = useState<Set<string>>(new Set());

  return (
    <div className="min-h-screen p-8 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-10 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex items-center gap-3 mb-2">
          <Users size={22} className="text-primary" />
          <h2
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Friend List
          </h2>
        </div>
        <p className="text-muted-foreground mb-8 text-sm">
          Send an invitation to a friend to help choose your ingredients.
        </p>

        <div className="space-y-3">
          {FRIENDS.map((friend, i) => (
            <motion.div
              key={friend}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary">
                  {friend
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="font-medium">{friend}</span>
              </div>
              <button
                onClick={() =>
                  setInvited((p) => new Set([...p, friend]))
                }
                disabled={invited.has(friend)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  invited.has(friend)
                    ? "bg-green-500/15 text-green-400 cursor-default"
                    : "bg-primary text-primary-foreground hover:opacity-80 active:scale-95"
                }`}
              >
                {invited.has(friend) ? "✓ Sent" : "Invite"}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Kitchen ─────────────────────────────────────────────────────────────────

function KitchenSection({
  onConfirm,
  initialPlate = [],
}: {
  onConfirm: (ingredients: Ingredient[]) => void;
  initialPlate?: Ingredient[];
}) {
  const [activeKitchen, setActiveKitchen] = useState<KitchenTab>("main");
  const [plate, setPlate] = useState<Ingredient[]>(initialPlate);
  const [dragOver, setDragOver] = useState<"plate" | "trash" | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);

  // Extra display ingredients for the bowl-builder shelves.
  // These still behave like normal ingredients when selected.
  const EXTRA_BOWL_OPTIONS: Ingredient[] = [
    { id: "shrimp", name: "Shrimp", emoji: "🍤", kitchen: "main" },
    { id: "chili-oil", name: "Chili Oil", emoji: "🌶️", kitchen: "main" },
    { id: "sesame-sauce", name: "Sesame", emoji: "🥣", kitchen: "main" },
    { id: "soy-glaze", name: "Soy Glaze", emoji: "🍶", kitchen: "main" },
    { id: "miso-sauce", name: "Miso", emoji: "🍲", kitchen: "main" },
    { id: "greens", name: "Greens", emoji: "🥬", kitchen: "main" },
    { id: "corn", name: "Corn", emoji: "🌽", kitchen: "main" },
    { id: "carrots", name: "Carrots", emoji: "🥕", kitchen: "main" },
    { id: "mushrooms", name: "Mushrooms", emoji: "🍄", kitchen: "main" },
    { id: "cabbage", name: "Cabbage", emoji: "🥗", kitchen: "main" },
    { id: "edamame", name: "Edamame", emoji: "🫛", kitchen: "main" },
    { id: "broth", name: "Broth", emoji: "🍜", kitchen: "main" },
  ];

  const allOptions = [...INGREDIENTS, ...EXTRA_BOWL_OPTIONS];
  const byId = (ids: string[]) =>
    ids
      .map((id) => allOptions.find((ingredient) => ingredient.id === id))
      .filter((ingredient): ingredient is Ingredient => Boolean(ingredient));

  const addToPlate = (ingredient: Ingredient) => {
    if (!plate.find((p) => p.id === ingredient.id)) {
      setPlate((prev) => [...prev, ingredient]);
    }
  };

  const removeFromPlate = (id: string) =>
    setPlate((prev) => prev.filter((p) => p.id !== id));

  const onDragStart = (
    e: React.DragEvent,
    id: string,
    source: "panel" | "plate"
  ) => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("source", source);
    setDragging(id);
  };

  const onDragEnd = () => setDragging(null);

  const onPlateDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
    const id = e.dataTransfer.getData("id");
    const source = e.dataTransfer.getData("source");
    if (source === "panel") {
      const ing = allOptions.find((i) => i.id === id);
      if (ing) addToPlate(ing);
    }
  };

  const onTrashDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
    const id = e.dataTransfer.getData("id");
    const source = e.dataTransfer.getData("source");
    if (source === "plate") removeFromPlate(id);
  };

  const TABS: { id: KitchenTab; label: string; icon: React.ReactNode }[] = [
    { id: "main", label: "Change kitchen", icon: <ChefHat size={20} /> },
    { id: "drink", label: "Drink", icon: <Coffee size={20} /> },
    { id: "snack", label: "Snack", icon: <Cookie size={20} /> },
  ];

  const shelvesByKitchen: Record<
    KitchenTab,
    { title: string; subtitle: string; icon: string; items: Ingredient[] }[]
  > = {
    main: [
      {
        title: "Protein",
        subtitle: "Pick one or more.",
        icon: "🥢",
        items: byId(["chicken", "tofu", "shrimp", "beef", "salmon"]),
      },
      {
        title: "Vegetables",
        subtitle: "Add as many as you like.",
        icon: "🌿",
        items: byId(["greens", "mushrooms", "cabbage", "edamame", "corn", "carrots"]),
      },
      {
        title: "Spice & Sauce",
        subtitle: "Add some heat and flavor.",
        icon: "🌶️",
        items: byId(["chili-oil", "sesame-sauce", "soy-glaze", "miso-sauce", "garlic"]),
      },
      {
        title: "Base",
        subtitle: "Choose liquid or dry.",
        icon: "🥣",
        items: byId(["broth", "rice", "pasta", "greens"]),
      },
    ],
    drink: [
      {
        title: "Drink Kitchen",
        subtitle: "Pick a drink for the side.",
        icon: "🥤",
        items: byId(["coffee", "tea", "juice", "smoothie", "soda", "water", "boba"]),
      },
    ],
    snack: [
      {
        title: "Snack Kitchen",
        subtitle: "Add something small on the side.",
        icon: "🍪",
        items: byId(["nuts", "cheese", "crackers", "apple", "banana", "yogurt", "popcorn", "chocolate"]),
      },
    ],
  };

  const shelves = shelvesByKitchen[activeKitchen];
  const topShelf = shelves[0];
  const lowerShelves = shelves.slice(1);

  function IngredientTile({ ingredient }: { ingredient: Ingredient }) {
    const onPlate = !!plate.find((p) => p.id === ingredient.id);

    return (
      <div
        role="button"
        tabIndex={0}
        draggable={!onPlate}
        onDragStart={(e) => !onPlate && onDragStart(e, ingredient.id, "panel")}
        onDragEnd={onDragEnd}
        onClick={() => addToPlate(ingredient)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") addToPlate(ingredient);
        }}
        className={`relative min-w-[104px] sm:min-w-[122px] h-[118px] rounded-2xl border bg-white px-3 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.07)] transition-all select-none ${
          onPlate
            ? "border-primary/40 bg-primary/5 opacity-60 cursor-default"
            : "border-black/10 hover:border-primary/40 hover:-translate-y-0.5 cursor-grab active:cursor-grabbing"
        }`}
      >
        {onPlate && (
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary" />
        )}
        <span className="block text-4xl leading-none mb-3">{ingredient.emoji}</span>
        <span className="block text-sm font-semibold text-foreground leading-tight">
          {ingredient.name}
        </span>
      </div>
    );
  }

  function ShelfSection({
    title,
    subtitle,
    icon,
    items,
  }: {
    title: string;
    subtitle: string;
    icon: string;
    items: Ingredient[];
  }) {
    return (
      <section className="rounded-[28px] bg-white/90 border border-black/5 shadow-[0_12px_34px_rgba(0,0,0,0.05)] px-4 py-4 overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-xl shrink-0">
              {icon}
            </div>
            <div>
              <h3
                className="text-xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
            View all
          </button>
        </div>

        <div className="relative mt-4">
          {/* clean transparent shelf base */}
          <div className="absolute inset-x-0 bottom-0 h-9 rounded-2xl bg-[#8B5E34]/10 border border-[#8B5E34]/15 shadow-[0_12px_26px_rgba(92,64,31,0.10)] backdrop-blur-sm" />
          <div className="relative z-10 flex gap-3 overflow-x-auto px-1 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((ingredient) => (
              <IngredientTile key={ingredient.id} ingredient={ingredient} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF7] text-foreground px-4 py-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-md pb-28"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2
              className="text-4xl font-extrabold tracking-tight leading-none"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Build your bowl
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Customize fresh ingredients just the way you like.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-black/10 text-primary font-semibold shadow-sm">
              <span>♡</span>
              Save bowl
            </button>
            <button className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
              <ChefHat size={22} />
            </button>
          </div>
        </div>

        {/* First shelf */}
        <ShelfSection {...topShelf} />

        {/* Center bowl */}
        <div
          className={`relative my-6 rounded-[34px] border-2 border-dashed px-4 py-8 transition-all ${
            dragOver === "plate"
              ? "border-primary bg-primary/6 scale-[1.01]"
              : "border-transparent bg-white/45"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver("plate");
          }}
          onDragLeave={() => setDragOver(null)}
          onDrop={onPlateDrop}
        >
          <div className="absolute left-10 top-1/2 text-primary/25 text-4xl select-none">‹</div>
          <div className="absolute right-10 top-1/2 text-primary/25 text-4xl select-none">›</div>

          <div className="relative mx-auto h-44 w-full max-w-[310px]">
            <div className="absolute left-1/2 top-28 h-10 w-64 -translate-x-1/2 rounded-full bg-black/7 blur-sm" />
            <div className="absolute left-1/2 top-3 z-20 h-28 w-72 -translate-x-1/2 rounded-[999px] border-[3px] border-primary bg-[#FFF2DE] shadow-[0_16px_32px_rgba(0,0,0,0.08)]" />
            <div className="absolute left-1/2 top-[68px] z-10 h-24 w-60 -translate-x-1/2 rounded-b-[90px] border-x-[3px] border-b-[3px] border-primary bg-[#FFF8ED]" />
            <div className="absolute left-1/2 top-[116px] z-30 -translate-x-1/2 text-3xl text-primary">
              ♥
            </div>

            {plate.length > 0 && (
              <div className="absolute left-1/2 top-8 z-30 flex max-w-[230px] -translate-x-1/2 flex-wrap items-center justify-center gap-1.5">
                {plate.slice(0, 8).map((ing) => (
                  <span
                    key={ing.id}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl shadow-sm border border-black/5"
                  >
                    {ing.emoji}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="text-center -mt-2">
            <p className="text-primary font-bold text-sm">
              {plate.length === 0
                ? "Start building ↗"
                : `${plate.length} ingredient${plate.length > 1 ? "s" : ""} selected`}
            </p>
          </div>

          {plate.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {plate.map((ing) => (
                <div
                  key={ing.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, ing.id, "plate")}
                  onDragEnd={onDragEnd}
                  className={`flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold shadow-sm cursor-grab active:cursor-grabbing ${
                    dragging === ing.id ? "opacity-40" : "opacity-100"
                  }`}
                >
                  <span>{ing.emoji}</span>
                  <span>{ing.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromPlate(ing.id);
                    }}
                    className="ml-1 rounded-full p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div
            className={`mx-auto mt-4 flex max-w-xs items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-2.5 text-xs font-semibold transition-all ${
              dragOver === "trash"
                ? "border-destructive bg-destructive/10 text-destructive"
                : "border-black/10 bg-white/70 text-muted-foreground"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver("trash");
            }}
            onDragLeave={() => setDragOver(null)}
            onDrop={onTrashDrop}
          >
            <Trash2 size={14} />
            Drag selected items here to remove
          </div>
        </div>

        {/* Lower shelves */}
        <div className="space-y-4">
          {lowerShelves.map((section) => (
            <ShelfSection key={section.title} {...section} />
          ))}
        </div>

        {/* Kitchen / snack / drink switcher */}
        <div className="mt-4 rounded-[26px] border border-black/5 bg-white/90 shadow-[0_10px_26px_rgba(0,0,0,0.05)] overflow-hidden grid grid-cols-3">
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveKitchen(tab.id)}
              className={`flex items-center justify-center gap-2 px-2 py-4 text-xs sm:text-sm font-semibold transition-all ${
                activeKitchen === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary"
              } ${index > 0 ? "border-l border-black/5" : ""}`}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-[#FBFAF7] via-[#FBFAF7] to-transparent px-4 pb-4 pt-8">
        <div className="mx-auto max-w-md">
          <motion.button
            whileHover={{ scale: plate.length > 0 ? 1.01 : 1 }}
            whileTap={{ scale: plate.length > 0 ? 0.97 : 1 }}
            onClick={() => plate.length > 0 && onConfirm(plate)}
            disabled={plate.length === 0}
            className={`w-full rounded-2xl py-4 text-lg font-extrabold transition-all ${
              plate.length > 0
                ? "bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {plate.length > 0
              ? `Find my meal · ${plate.length} selected →`
              : "Add ingredients →"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── Recommendation Card ─────────────────────────────────────────────────────

function RecCard({
  rec,
  onChoose,
  label,
}: {
  rec: Recommendation;
  onChoose: () => void;
  label: "A" | "B";
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TiltCard className="flex flex-col bg-card border border-border rounded-3xl overflow-hidden h-full">
      <div
        className={`h-1 w-full ${
          label === "A" ? "bg-primary" : "bg-foreground"
        }`}
      />
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold ${
            label === "A"
              ? "bg-primary text-primary-foreground"
              : "bg-foreground text-background"
          }`}
        >
          {label}
        </div>

        <div>
          <h3
            className="text-xl font-bold leading-snug"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            {rec.dish}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            {rec.restaurant} · {rec.cuisine}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
            <Star
              size={13}
              className="text-amber-400 fill-amber-400 shrink-0"
            />
            <span className="text-sm font-semibold">{rec.rating}</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
            <Clock size={13} className="text-muted-foreground shrink-0" />
            <span className="text-sm font-medium">{rec.time}</span>
            <span className="text-muted-foreground text-xs">·</span>
            <span className="text-sm font-medium">
              {rec.deliveryCost === 0 ? "Free" : `$${rec.deliveryCost.toFixed(2)}`}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
            <span className="text-sm font-bold">${rec.cost.toFixed(2)}</span>
          </div>
          {rec.discount !== "None" ? (
            <div className="flex items-center gap-1.5 bg-primary/10 rounded-xl px-3 py-2">
              <Tag size={12} className="text-primary shrink-0" />
              <span className="text-xs font-semibold text-primary truncate">
                {rec.discount}
              </span>
            </div>
          ) : (
            <div className="bg-secondary rounded-xl px-3 py-2">
              <span className="text-xs text-muted-foreground">No discount</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
          {expanded ? "Hide details" : "View ingredients & description"}
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4 overflow-hidden"
          >
            <p className="mb-3">{rec.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {rec.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="px-2.5 py-1 bg-secondary rounded-full text-xs font-medium text-foreground"
                >
                  {ing}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex-1" />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={onChoose}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
            label === "A"
              ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20"
              : "bg-foreground text-background hover:opacity-90 shadow-lg shadow-foreground/15"
          }`}
        >
          Choose This One
        </motion.button>
      </div>
    </TiltCard>
  );
}

// ─── Tournament ───────────────────────────────────────────────────────────────

function TournamentSection({
  recs,
  winners,
  onChoose,
  onGoBack,
  onKitchen,
  onExit,
}: {
  recs: Recommendation[];
  winners: Recommendation[];
  onChoose: (rec: Recommendation) => void;
  onGoBack: () => void;
  onKitchen: () => void;
  onExit: () => void;
}) {
  const currentRound = winners.length; // 0–4
  const leftCard = currentRound === 0 ? recs[0] : winners[currentRound - 1];
  const rightCard = recs[currentRound + 1];

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-5xl mx-auto">
      {/* Nav */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          <button
            onClick={onGoBack}
            disabled={winners.length === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft size={15} />
            Previous
          </button>
          <button
            onClick={onKitchen}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-all"
          >
            <ChefHat size={15} />
            Kitchen
          </button>
        </div>
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground transition-all"
        >
          <LogOut size={15} />
          Exit
        </button>
      </div>

      {/* Round indicator */}
      <motion.div
        key={currentRound}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-4">
          <Trophy size={15} className="text-primary" />
          <span className="text-sm font-semibold">
            Round {currentRound + 1} of 5
          </span>
        </div>
        <div className="flex justify-center gap-1.5 mb-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i < currentRound
                  ? "w-8 bg-primary"
                  : i === currentRound
                  ? "w-8 bg-primary/40"
                  : "w-4 bg-border"
              }`}
            />
          ))}
        </div>
        <p className="text-muted-foreground text-sm">
          {currentRound === 0
            ? "Pick your first favourite to advance"
            : `Your Round ${currentRound} pick faces a new challenger`}
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] gap-4 items-start">
        <motion.div
          key={`left-${currentRound}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <RecCard
            rec={leftCard}
            onChoose={() => onChoose(leftCard)}
            label="A"
          />
        </motion.div>

        <div className="hidden md:flex flex-col items-center justify-center py-12 gap-2">
          <div className="h-16 w-px bg-border" />
          <span
            className="text-2xl font-black text-muted-foreground/30"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            VS
          </span>
          <div className="h-16 w-px bg-border" />
        </div>

        <div className="flex items-center justify-center md:hidden my-1">
          <span
            className="text-xl font-black text-muted-foreground/40"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            VS
          </span>
        </div>

        <motion.div
          key={`right-${currentRound}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <RecCard
            rec={rightCard}
            onChoose={() => onChoose(rightCard)}
            label="B"
          />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Result ───────────────────────────────────────────────────────────────────

function ResultPage({
  winner,
  onKitchen,
  onTournament,
  onExit,
}: {
  winner: Recommendation;
  onKitchen: () => void;
  onTournament: () => void;
  onExit: () => void;
}) {
  const [bought, setBought] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-3 select-none">🏆</div>
          <h2
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Your Winner!
          </h2>
          <p className="text-muted-foreground text-sm">
            After 5 rounds, this is your perfect meal choice.
          </p>
        </div>

        <TiltCard className="bg-card border-2 border-primary/25 rounded-3xl overflow-hidden mb-6">
          <div className="h-1 bg-primary w-full" />
          <div className="p-7">
            <h3
              className="text-3xl font-bold mb-1 leading-snug"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              {winner.dish}
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              {winner.restaurant} · {winner.cuisine}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="text-center p-3 bg-secondary rounded-2xl">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Star
                    size={14}
                    className="text-amber-400 fill-amber-400"
                  />
                  <span className="font-bold text-lg">{winner.rating}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">Rating</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-2xl">
                <p className="font-bold text-lg">{winner.time}</p>
                <p className="text-[11px] text-muted-foreground">
                  {winner.deliveryCost === 0
                    ? "Free delivery"
                    : `+$${winner.deliveryCost.toFixed(2)} delivery`}
                </p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-2xl">
                <p className="font-bold text-lg">${winner.cost.toFixed(2)}</p>
                <p className="text-[11px] text-muted-foreground">Total</p>
              </div>
            </div>

            {winner.discount !== "None" && (
              <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl mb-5">
                <Tag size={15} className="text-primary shrink-0" />
                <span className="text-sm font-semibold text-primary">
                  {winner.discount}
                </span>
              </div>
            )}

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {winner.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {winner.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="px-3 py-1 bg-secondary rounded-full text-sm font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: bought ? 1 : 1.02 }}
            whileTap={{ scale: bought ? 1 : 0.97 }}
            onClick={() => setBought(true)}
            disabled={bought}
            className={`w-full py-4 rounded-2xl text-lg font-bold transition-all ${
              bought
                ? "bg-green-500/15 text-green-400 cursor-default"
                : "bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:opacity-90"
            }`}
          >
            {bought ? (
              <span className="flex items-center justify-center gap-2">
                <span>✓</span> Order Placed!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Buy Now
              </span>
            )}
          </motion.button>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={onTournament}
              className="py-3 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              ← Round 5
            </button>
            <button
              onClick={onKitchen}
              className="py-3 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              Kitchen
            </button>
            <button
              onClick={onExit}
              className="py-3 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              Exit
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [winners, setWinners] = useState<Recommendation[]>([]);
  const [finalWinner, setFinalWinner] = useState<Recommendation | null>(null);
  // Persist plate across kitchen visits
  const [savedPlate, setSavedPlate] = useState<Ingredient[]>([]);

  const handleKitchenConfirm = (ingredients: Ingredient[]) => {
    setSavedPlate(ingredients);
    setRecs(pickRecs(ingredients));
    setWinners([]);
    setView("tournament");
  };

  const handleChoose = (rec: Recommendation) => {
    const next = [...winners, rec];
    setWinners(next);
    if (next.length === 5) {
      setFinalWinner(rec);
      setView("result");
    }
  };

  const handleReturnToTournament = () => {
    setWinners((w) => w.slice(0, 4));
    setView("tournament");
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "var(--font-family-sans)" }}
    >
      {view === "landing" && (
        <LandingPage
          onMe={() => setView("kitchen")}
          onFriend={() => setView("friends")}
        />
      )}
      {view === "friends" && (
        <FriendsPage onBack={() => setView("landing")} />
      )}
      {view === "kitchen" && (
        <KitchenSection
          onConfirm={handleKitchenConfirm}
          initialPlate={savedPlate}
        />
      )}
      {view === "tournament" && recs.length >= 6 && (
        <TournamentSection
          key={recs.map((r) => r.id).join(",")}
          recs={recs}
          winners={winners}
          onChoose={handleChoose}
          onGoBack={() => setWinners((w) => w.slice(0, -1))}
          onKitchen={() => setView("kitchen")}
          onExit={() => setView("landing")}
        />
      )}
      {view === "result" && finalWinner && (
        <ResultPage
          winner={finalWinner}
          onKitchen={() => setView("kitchen")}
          onTournament={handleReturnToTournament}
          onExit={() => setView("landing")}
        />
      )}
    </div>
  );
}

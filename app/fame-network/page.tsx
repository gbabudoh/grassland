"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Float, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, User, ShieldCheck } from "lucide-react";
import Link from "next/link";
import * as THREE from "three";

interface Member {
  id: string;
  name: string;
  tier: string;
  rank: number;
  gear: string[];
  position: THREE.Vector3;
}

// --- MOCK DATA FOR FN MEMBER NODES ---
// In production, this would fetch from the `users` table where isFnMember = true
const MOCK_MEMBERS: Member[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `fn-${i}`,
  name: i === 0 ? "Dr. Godwin" : `Member ${i}`,
  tier: i === 0 ? "ARCHITECT" : i < 10 ? "ELITE" : "PIONEER",
  rank: i + 1,
  gear: ["G1 Pro", "Neural Hoodie"],
  // Assign random 3D position on a sphere surface roughly
  position: new THREE.Vector3(
    (Math.random() - 0.5) * 10, 
    (Math.random() - 0.5) * 10, 
    (Math.random() - 0.5) * 10
  ).normalize().multiplyScalar(4 + Math.random() * 2) 
}));

// Helper to generate random points in a sphere
function generateSpherePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.cbrt(Math.random()) * radius;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

function Constellation({ onSelectNode }: { onSelectNode: (node: Member) => void }) {
  const ref = useRef<THREE.Points>(null!);
  
  // Generate 3000 background stars
  const sphere = useMemo(() => {
     return generateSpherePoints(3000, 12);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Background Starfield */}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
      
      {/* Interactive Member Nodes */}
      {MOCK_MEMBERS.map((member) => (
         <MemberNode key={member.id} member={member} onClick={() => onSelectNode(member)} />
      ))}
    </group>
  );
}

function MemberNode({ member, onClick }: { member: Member, onClick: () => void }) {
   const [hovered, setHovered] = useState(false);
   
   // Color based on tier
   const color = member.tier === "ARCHITECT" ? "#FFD700" : member.tier === "ELITE" ? "#00FFAB" : "#FFFFFF";
   const size = member.tier === "ARCHITECT" ? 0.3 : member.tier === "ELITE" ? 0.15 : 0.08;

   return (
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
         <mesh 
            position={member.position} 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
         >
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial 
               color={color} 
               emissive={color}
               emissiveIntensity={hovered ? 4 : 2}
               toneMapped={false}
            />
            {/* Label only visible on hover or if Architect */}
            {(hovered || member.tier === "ARCHITECT") && (
               <Html distanceFactor={10}>
                  <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 pointer-events-none transform -translate-x-1/2 -translate-y-8 min-w-max">
                     <span className="text-[8px] font-black uppercase tracking-widest text-white whitespace-nowrap">
                        {member.name}
                     </span>
                  </div>
               </Html>
            )}
         </mesh>
      </Float>
   );
}


export default function FameNetworkPage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
     e.preventDefault();
     // Simple client-side search simulation
     const found = MOCK_MEMBERS.find(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
     if (found) setSelectedMember(found);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
         <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <fog attach="fog" args={['black', 5, 25]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <Constellation onSelectNode={setSelectedMember} />
            <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} minDistance={2} maxDistance={20} />
         </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
         {/* Top Bar */}
         <div className="absolute top-0 w-full p-8 md:p-12 flex justify-between items-start pointer-events-auto">
            <div>
               <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
               >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 block mb-2">
                     Grassland Ecosystem
                  </span>
                  <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                     Fame <br /> Network
                  </h1>
               </motion.div>
            </div>

            {/* Search Bar */}
            <motion.form 
               onSubmit={handleSearch}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="relative group"
            >
               <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="LOCATE SIGNAL ID..."
                  className="w-48 md:w-64 bg-white/5 border border-white/20 rounded-full py-3 pl-5 pr-12 text-[10px] font-black uppercase tracking-widest text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 focus:bg-black/50 transition-all backdrop-blur-md"
               />
               <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all">
                  <Search className="h-4 w-4" />
               </button>
            </motion.form>
         </div>

         {/* Member Profile Sidebar */}
         <AnimatePresence>
            {selectedMember && (
               <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 30 }}
                  className="absolute right-0 top-0 h-full w-full md:w-96 bg-black/80 backdrop-blur-xl border-l border-white/10 p-8 md:p-12 pointer-events-auto flex flex-col pt-32"
               >
                  <button 
                     onClick={() => setSelectedMember(null)}
                     className="absolute top-8 left-8 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                  >
                     ← Close Transmission
                  </button>

                  <div className="mb-12">
                     <div className="h-24 w-24 rounded-full bg-gradient-to-br from-white/20 to-black border border-white/30 mb-6 flex items-center justify-center">
                        <User className="h-8 w-8 text-white/80" />
                     </div>
                     <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border ${
                        selectedMember.tier === "ARCHITECT" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40" : 
                        selectedMember.tier === "ELITE" ? "bg-green-500/20 text-green-400 border-green-500/40" : 
                        "bg-white/10 text-white/60 border-white/20"
                     }`}>
                        {selectedMember.tier} Class
                     </span>
                     <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">
                        {selectedMember.name}
                     </h2>
                     <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                        Network Rank #{selectedMember.rank}
                     </span>
                  </div>

                  <div className="space-y-8">
                     <div>
                        <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/10 pb-2 mb-4">
                           Verified Gear
                        </h3>
                        <div className="space-y-3">
                           {selectedMember.gear.map((item: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-3 text-white/80 group cursor-pointer hover:translate-x-2 transition-transform">
                                 <ShieldCheck className="h-4 w-4 text-green-500" />
                                 <span className="text-xs font-bold uppercase tracking-wider">{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div>
                        <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/10 pb-2 mb-4">
                           Network Stats
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                              <span className="block text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Referrals</span>
                              <span className="block text-xl font-black text-white">24</span>
                           </div>
                           <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                              <span className="block text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Points</span>
                              <span className="block text-xl font-black text-white">8.5K</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-auto">
                     <Link href={`/fame-network/${selectedMember.id}`} className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                        View Full Profile <ChevronRight className="h-3 w-3" />
                     </Link>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Footer Instructions */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between pointer-events-none mix-blend-difference z-0">
         <span className="text-[9px] font-black uppercase tracking-widest text-white/40">
            Drag to Rotate • Scroll to Zoom
         </span>
         <span className="text-[9px] font-black uppercase tracking-widest text-white/40">
            3,421 Active Nodes
         </span>
      </div>
    </div>
  );
}

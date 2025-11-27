// components/ForegroundLeaves.tsx (Global Atmospheric Grain)
export default function ForegroundLeaves() {
  return (
    <div className="fixed inset-0 z-[900] pointer-events-none opacity-[0.03] mix-blend-overlay pointer-events-none">
        {/* Subtle animated grain for underwater feel */}
        <div className="w-full h-full bg-repeat animate-pulse-slow" 
             style={{
                 backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2200/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")'
             }} 
        />
    </div>
  );
}

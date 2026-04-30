import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'PT. STARPACK INDAHMAJU - UV Plastic Coating Specialist';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f1016',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(227, 52, 54, 0.15), transparent 50%), radial-gradient(circle at 80% 50%, rgba(15, 16, 22, 0.1), transparent 50%)',
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '40px',
            padding: '60px 80px',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Logo Placeholder - In a real scenario we'd fetch the actual image buffer */}
          {/* But since we want to be safe with external assets in Edge, we use text or a simple SVG for now */}
          <div style={{ display: 'flex', marginBottom: '40px' }}>
             <img 
               src="https://starpackindahmaju.com/logo_starpack_white.png" 
               alt="Logo" 
               style={{ width: '600px' }}
             />
          </div>

          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            UV Plastic Coating Specialist
          </div>
          
          <div
            style={{
              fontSize: 24,
              color: '#a0a5b0',
              textAlign: 'center',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Precision • Stability • Quality
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

/**
 * Hero Section Component
 *
 * Responsive hero section with heading, description, and CTA buttons.
 * Uses semantic color tokens for automatic dark mode support.
 *
 * Usage:
 *   <HeroSection />
 */

export function HeroSection() {
  return (
    <section className='py-24 sm:py-32 lg:py-40'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
          {/* Badge (optional) */}
          <div className='bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium'>
            <svg className='h-4 w-4'>🚀</svg>
            <span>New: Feature announcement</span>
          </div>

          {/* Main Heading */}
          <h1 className='from-foreground to-foreground/70 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl'>
            Build Something Amazing Today
          </h1>

          {/* Description */}
          <p className='text-muted-foreground mb-8 text-lg leading-relaxed sm:text-xl'>
            Create beautiful, responsive web applications with production-ready
            Tailwind CSS patterns. Get started in minutes, not hours.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <button className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 font-medium transition-colors'>
              Get Started
            </button>
            <button className='border-border hover:bg-accent rounded-md border bg-transparent px-6 py-3 font-medium transition-colors'>
              Learn More
            </button>
          </div>

          {/* Social Proof (optional) */}
          <div className='text-muted-foreground mt-12 flex flex-col items-center justify-center gap-8 text-sm sm:flex-row'>
            <div className='flex items-center gap-2'>
              <svg className='text-primary h-5 w-5'>⭐</svg>
              <span>Trusted by 10,000+ developers</span>
            </div>
            <div className='flex items-center gap-2'>
              <svg className='text-primary h-5 w-5'>✓</svg>
              <span>Free and open source</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Alternative: Hero with Image
 */

export function HeroWithImage() {
  return (
    <section className='py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          {/* Left: Content */}
          <div>
            <h1 className='mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl'>
              Build Faster with Tailwind Patterns
            </h1>
            <p className='text-muted-foreground mb-8 text-lg'>
              Production-ready components that work out of the box. Copy, paste,
              and customize to match your brand.
            </p>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <button className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 transition-colors'>
                Get Started
              </button>
              <button className='border-border hover:bg-accent rounded-md border px-6 py-3 transition-colors'>
                View Examples
              </button>
            </div>
          </div>

          {/* Right: Image/Visual */}
          <div className='relative'>
            <div className='bg-muted aspect-square overflow-hidden rounded-lg'>
              <img
                src='/hero-image.jpg'
                alt='Product screenshot'
                className='h-full w-full object-cover'
              />
            </div>
            {/* Decorative elements */}
            <div className='bg-primary/20 absolute -top-4 -right-4 -z-10 h-72 w-72 rounded-full blur-3xl' />
            <div className='bg-accent/20 absolute -bottom-4 -left-4 -z-10 h-72 w-72 rounded-full blur-3xl' />
          </div>
        </div>
      </div>
    </section>
  );
}

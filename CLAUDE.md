# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build` 
- **Production start**: `npm start`
- **Lint**: `npm run lint`

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.3.1 with App Router architecture
- **Content**: MDX-based articles stored in `/articles` directory
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: Zustand for client-side state
- **Analytics**: Google Analytics, Google Tag Manager, Facebook tracking

### Key Directory Structure
```
├── src/app/                    # Next.js App Router pages
│   ├── (home)/                # Home page grouping
│   ├── (shared)/              # Shared components (nav, footer, CTAs)
│   ├── blog/                  # Blog listing and article pages
│   ├── course/                # Course landing page components
│   ├── sponsor/               # Sponsor/analytics dashboard
│   └── story/                 # Personal story page
├── articles/                  # MDX content files
├── src/components/ui/         # Reusable UI components
├── src/server/actions/        # Server actions for data fetching
└── public/                    # Static assets
```

### Content Management
- **Articles**: Stored as MDX files in `/articles` directory with frontmatter metadata
- **Article Processing**: Server actions in `/src/server/actions/articles.ts` handle MDX compilation
- **Article Types**: Standard articles, featured articles, and "shorts" (video content)
- **Frontmatter Fields**: Includes SEO metadata, categories, tags, reading time, related posts

### Routing Structure
- `/` - Home page with shorts and featured content
- `/blog` - Article listing with search functionality
- `/blog/[blogSlug]` - Individual article pages
- `/course` - Course landing page with A/B testing components
- `/sponsor` - Analytics dashboard with charts
- `/story` - Personal story page
- `/careers` - Job listings
- `/legal/*` - Legal pages (privacy, cookies, etc.)

### Key Features
- **Responsive Design**: Mobile-first with Tailwind CSS
- **SEO Optimized**: Comprehensive metadata and structured data
- **Content Search**: Client-side article search functionality
- **Analytics Integration**: Multiple tracking services
- **A/B Testing**: Course page has A/B testing wrapper components
- **Internationalization**: Spanish primary language with some English content

### Special Files
- `/hooks.md` - Marketing content and video script hooks (not code hooks)
- `/supabaseclient.js` - Database client (Supabase integration)
- Custom MDX components in `/src/components/ui/mdx.tsx`

### Development Notes
- Uses server actions for data fetching instead of API routes
- Articles are compiled at runtime using `next-mdx-remote`
- Heavy use of Radix UI components for accessibility
- Custom font loading with Geist font family
- Styled with Tailwind CSS and CSS custom properties

### Business Context
This is a Spanish real estate investment education website with:
- Blog articles about property investment in Spain
- Course landing page for real estate investment education
- Analytics dashboard for sponsors/partners
- Personal branding for the instructor "Guillermo"
- Focus on Spanish market and regulations
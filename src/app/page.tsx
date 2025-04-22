import Link from "next/link"
import { ChevronRight, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { fetchPosts } from "@/lib/contentful"

export const revalidate = 3600 // revalidate every hour

export default async function Home() {
  const posts = await fetchPosts()


  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Top navigation bar with purple accent */}
      <div className="w-full h-1 bg-purple-700"></div>

      <header className="border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              <span className="font-medium">Latest</span>
            </Link>

            

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              Sign In
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Site title and tagline */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold mb-4">Bits-Of-C0de</h1>
          <div className="flex items-center justify-center gap-2 text-5xl font-bold">
            <span>Explore</span>
            <span className="text-purple-600">Learn</span>
            <span>Build</span>
            <span className="animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2.5c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z"
                  fill="#F44336"
                />
                <path d="M12 4.5c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="#FFC107" />
                <path d="M12 6.5c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" fill="#FF9800" />
                <path d="M12 15.5c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" fill="#F44336" />
                <path d="M12 12.5l-1 4h2l-1-4z" fill="#F44336" />
                <path d="M12 12.5l-1-4h2l-1 4z" fill="#F44336" />
              </svg>
            </span>
          </div>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="border-t pt-6">
              <div className="mb-2">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <Link href={`/post/${post.slug}`} className="text-purple-600 flex items-center">
                  Learn More
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

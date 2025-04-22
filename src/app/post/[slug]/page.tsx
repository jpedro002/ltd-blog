import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { fetchPostBySlug } from "@/lib/contentful"
import { notFound } from "next/navigation"
import { RichTextRenderer } from "@/components/rich-text-renderer"

// Gera os parâmetros para as páginas estáticas
export async function generateStaticParams() {
  // Normalmente, você buscaria todos os slugs aqui
  // Mas para simplificar, vamos deixar isso para a sua implementação completa
  return []
}

export const revalidate = 3600 // Revalidate the data at most every hour

export default async function PostDetail({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  console.log(post);
  

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
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-3/4">
              <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 mb-8">
                {/* Post header image */}
                <div className="flex justify-center mb-6">
                 
                    <div className="w-full max-h-96 overflow-hidden rounded-lg">
                      <Image
                        src={post?.coverImage?.fields?.file?.url || "/placeholder.svg"}
                        alt={post.description || ""}
                        width={800}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  <span className="bg-purple-600 text-white text-xs font-medium px-4 py-1 rounded-full">
                    {post.category.toUpperCase()}
                  </span>
                </div>

                {/* Post title */}
                <h1 className="text-3xl font-bold mb-6">{post.title}</h1>

                

                {/* Post content */}
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <RichTextRenderer content={post.content} />
                </div>
              </div>
            </div>

            {/* Sidebar / Table of Contents */}
            <div className="lg:w-1/4 hidden md:block">
              <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                <nav className="space-y-3">
                  {post.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

import { createClient } from "contentful"
import type { Document } from "@contentful/rich-text-types"

// Inicializa o cliente Contentful com as credenciais
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  environment: 'master', // defaults to 'master' if not set
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN|| ""
})
// Função para buscar todos os posts para a página inicial
export async function fetchPosts() {
  const response = await client.getEntries({
    content_type: "blogPost",
    include: 2,
  })

  return response.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    category: item.fields.category || "",
    readTime: item.fields.readTime || "5 min read",
    createdAt: item.sys.createdAt,
  }))
}

export async function fetchPostBySlug(slug: string) {
  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
  })

  if (!response.items.length) {
    return null
  }

  const post = response.items[0]

  return {
    id: post.sys.id,
    title: post.fields.title,
    slug: post.fields.slug,
    content: post.fields.content, 
    excerpt: post.fields.excerpt,
    category: post.fields.category || "",
    readTime: post.fields.readTime || "5 min read",
    coverImage: post.fields?.coverImage || null,
    createdAt: post.sys.createdAt,
    sections: post.fields.content ? extractSectionsFromRichText(post.fields.content as Document) : [],
  }
}

// Função para extrair as seções do conteúdo Rich Text para o sumário
function extractSectionsFromRichText(content: Document) {
  const sections = []

  if (!content || !content.content) {
    return []
  }

  // Procura por nós de heading-2 no conteúdo
  for (const node of content.content) {
    if (node.nodeType === "heading-2" && node.content && node.content[0]) {
      // Verificar se o nó filho é do tipo texto
      if (node.content[0].nodeType === "text") {
        const textNode = node.content[0] as { value: string };
        const title = textNode.value;
        const id = title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-")
        sections.push({ title, id })
      }
    }
  }

  return sections
}

// // Função para buscar as categorias
// export async function fetchCategories() {
//   const response = await client.getEntries({
//     content_type: "category",
//   })

//   return response.items.map((item: any) => ({
//     id: item.sys.id,
//     name: item.fields.name,
//     slug: item.fields.slug,
//   }))
// }

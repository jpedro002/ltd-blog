import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type React from 'react'

import {
	BLOCKS,
	type Document,
	INLINES,
	MARKS,
} from '@contentful/rich-text-types'
import Image from 'next/image'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface RichTextRendererProps {
	content: Document
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
	// Opções de renderização para personalizar como cada nó é renderizado
	const options = {
		renderMark: {
			[MARKS.BOLD]: (text: React.ReactNode) => (
				<strong className="font-bold">{text}</strong>
			),
			[MARKS.ITALIC]: (text: React.ReactNode) => (
				<em className="italic">{text}</em>
			),
			[MARKS.UNDERLINE]: (text: React.ReactNode) => (
				<u className="underline">{text}</u>
			),
			[MARKS.CODE]: (text: React.ReactNode) => (
				<code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-sm">
					{text}
				</code>
			),
		},
		renderNode: {
			// Renderização de parágrafos
			[BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
				<p className="mb-4 leading-relaxed">{children}</p>
			),

			// Renderização de cabeçalhos
			[BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => {
				const id = children
					.toString()
					.toLowerCase()
					.replace(/[^\w\s]/gi, '')
					.replace(/\s+/g, '-')
				return (
					<h1 id={id} className="text-3xl font-bold mt-8 mb-4">
						{children}
					</h1>
				)
			},
			[BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => {
				const id = children
					.toString()
					.toLowerCase()
					.replace(/[^\w\s]/gi, '')
					.replace(/\s+/g, '-')
				return (
					<h2 id={id} className="text-2xl font-bold mt-8 mb-4">
						{children}
					</h2>
				)
			},
			[BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
				<h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
			),

			// Renderização de listas
			[BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
				<ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
			),
			[BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
				<ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
			),
			[BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
				<li>{children}</li>
			),

			// Renderização de citações
			[BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
				<blockquote className="border-l-4 border-purple-500 pl-4 py-1 mb-4 italic">
					{children}
				</blockquote>
			),

			// Renderização de blocos de código
			[BLOCKS.CODE]: (node: any) => {
				const language = node.data?.language || 'javascript'
				return (
					<div className="mb-6">
						<SyntaxHighlighter
							language={language}
							style={atomDark}
							className="rounded-md"
						>
							{node.content[0].value}
						</SyntaxHighlighter>
					</div>
				)
			},

			// Renderização de imagens incorporadas
			[BLOCKS.EMBEDDED_ASSET]: (node: any) => {
				const { title, description, file } = node.data.target.fields
				const { url, details } = file
				const { width, height } = details.image || { width: 800, height: 400 }

				return (
					<div className="my-6">
						<Image
							src={`https:${url}`}
							alt={description || title || 'Blog image'}
							width={width}
							height={height}
							className="rounded-lg mx-auto"
						/>
						{title && (
							<p className="text-center text-sm text-gray-500 mt-2">{title}</p>
						)}
					</div>
				)
			},

			// Renderização de entradas incorporadas (como posts relacionados)
			[BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
				const entry = node.data.target

				// Exemplo: renderizar um post relacionado
				if (entry.sys.contentType.sys.id === 'blogPost') {
					return (
						<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6">
							<h4 className="font-bold">Related Post:</h4>
							<Link
								href={`/post/${entry.fields.slug}`}
								className="text-purple-600 hover:underline"
							>
								{entry.fields.title}
							</Link>
							<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
								{entry.fields.excerpt}
							</p>
						</div>
					)
				}

				return null
			},

			// Renderização de hiperlinks
			[INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
				<Link
					href={node.data.uri}
					className="text-purple-600 hover:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					{children}
				</Link>
			),

			// Renderização de entradas de referência inline
			[INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
				const entry = node.data.target

				// Link para outro post
				if (entry.sys.contentType.sys.id === 'blogPost') {
					return (
						<Link
							href={`/post/${entry.fields.slug}`}
							className="text-purple-600 hover:underline"
						>
							{children}
						</Link>
					)
				}

				return <span>{children}</span>
			},

			// Renderização de assets de referência inline (como imagens clicáveis)
			[INLINES.ASSET_HYPERLINK]: (node: any, children: React.ReactNode) => (
				<a
					href={`https:${node.data.target.fields.file.url}`}
					target="_blank"
					rel="noopener noreferrer"
					className="text-purple-600 hover:underline"
				>
					{children}
				</a>
			),
		},
	}

	// Verifica se o conteúdo existe antes de renderizar
	if (!content) {
		return <div>No content available</div>
	}

	return (
		<div suppressHydrationWarning className="rich-text">
			{documentToReactComponents(content, options)}
		</div>
	)
}

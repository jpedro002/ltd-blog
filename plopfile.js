import path from 'path'

export default function (plop) {
	plop.setGenerator('mvvm', {
		description: 'Gerar estrutura MVVM com imports automáticos',
		prompts: [
			{
				type: 'list',
				name: 'componentType',
				message: 'Qual tipo de componente você deseja criar?',
				choices: [
					{
						name: 'Componente para pasta components (raiz)',
						value: 'component',
					},
					{
						name: 'Componente de página (app/page/...)',
						value: 'pageComponent',
					},
					{ name: 'Página completa (app/...)', value: 'page' },
				],
			},
			{
				type: 'input',
				name: 'path',
				message: 'Informe o path do componente (ex: ui/button):',
			},
			{
				type: 'checkbox',
				name: 'files',
				message:
					'Selecione os arquivos para gerar (todos estão selecionados por padrão):',
				choices: [
					{ name: 'ViewModel (Component)', value: 'viewmodel', checked: true },
					{ name: 'View', value: 'view', checked: true },
					{ name: 'Model', value: 'model', checked: true },
					{ name: 'Schema', value: 'schema', checked: true },
					{ name: 'Types', value: 'types', checked: true },
				],
			},
		],
		actions: function (data) {
			if (!data?.path) return []

			const cleanPath = data.path.replace(/\s+/g, '-')
			const name = path.basename(cleanPath)
			data.name = name
			data.folder = cleanPath

			let baseDir = 'src/components/'

			switch (data.componentType) {
				case 'component':
					baseDir = 'src/components/'
					break
				case 'pageComponent':
					baseDir = 'src/app/'
					data.folder = `components/${cleanPath}`
					break
				case 'page':
					baseDir = 'src/app/'
					data.isPage = true
					break
			}

			data.baseDir = baseDir

			const actions = []

			if (data.files.includes('viewmodel')) {
				actions.push({
					type: 'add',
					path: '{{baseDir}}{{folder}}/{{pascalCase name}}.tsx',
					templateFile: 'plop/templates/mvvm/viewmodel.hbs',
				})
			}

			if (data.files.includes('view')) {
				actions.push({
					type: 'add',
					path: '{{baseDir}}{{folder}}/{{pascalCase name}}.view.tsx',
					templateFile: 'plop/templates/mvvm/view.hbs',
				})
			}

			if (data.files.includes('model')) {
				actions.push({
					type: 'add',
					path: '{{baseDir}}{{folder}}/{{pascalCase name}}.model.tsx',
					templateFile: 'plop/templates/mvvm/model.hbs',
				})
			}

			if (data.files.includes('schema')) {
				actions.push({
					type: 'add',
					path: '{{baseDir}}{{folder}}/schema.ts',
					templateFile: 'plop/templates/mvvm/schema.hbs',
				})
			}

			if (data.files.includes('types')) {
				actions.push({
					type: 'add',
					path: '{{baseDir}}{{folder}}/types.ts',
					templateFile: 'plop/templates/mvvm/types.hbs',
				})
			}

			if (data.isPage) {
				actions.push({
					type: 'add',
					path: '{{baseDir}}{{folder}}/page.tsx',
					templateFile: 'plop/templates/mvvm/page.hbs',
				})
			}

			return actions
		},
	})
}

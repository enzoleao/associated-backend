const fs = require('fs');
const path = require('path');

// Função para converter strings para PascalCase ignorando traços/underscores/espaços
const toPascalCase = (str) =>
  str
    .split(/[-_ ]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('');

// Recebe nome do módulo via args: npm run generate -- client-address
const args = process.argv.slice(2);
const moduleName = args[0];

if (!moduleName) {
  console.error('❌ Informe o nome do módulo. Ex: npm run generate User');
  process.exit(1);
}

const className = toPascalCase(moduleName);
const fileName = moduleName.toLowerCase();

// --- Pastas ---
const baseFolder = path.join(__dirname, '..', 'src', 'modules', fileName);
const controllerFolder = path.join(baseFolder, 'controllers');
const repositoryFolder = path.join(baseFolder, 'repositories');
const repositoryImplFolder = path.join(repositoryFolder, 'implementation');
const useCasesFolder = path.join(baseFolder, 'use-cases');

// Criação de pastas
[baseFolder, controllerFolder, repositoryFolder, repositoryImplFolder, useCasesFolder].forEach(folder => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
});

// --- Templates ---
const moduleTemplate = `import { Module } from '@nestjs/common';
import { ${className}Controller } from './controllers/${fileName}.controller';
import { ${className}Repository } from './repositories/implementation/${fileName}.repository';

@Module({
  controllers: [${className}Controller],
  providers: [${className}Repository],
})
export class ${className}Module {}
`;

const controllerTemplate = `import { Controller } from '@nestjs/common';

@Controller('${fileName}')
export class ${className}Controller {
  constructor(){}
}
`;

const repositoryTemplate = `import { Injectable } from '@nestjs/common';

export interface I${className}Repository {}
`;

const repositoryImplTemplate = `import { Injectable } from '@nestjs/common';
import { I${className}Repository } from '../${fileName}.repository';

@Injectable()
export class ${className}Repository implements I${className}Repository {
  constructor(){}
}
`;

// --- Criação de arquivos ---
fs.writeFileSync(path.join(baseFolder, `${fileName}.module.ts`), moduleTemplate);
fs.writeFileSync(path.join(controllerFolder, `${fileName}.controller.ts`), controllerTemplate);
fs.writeFileSync(path.join(repositoryFolder, `${fileName}.repository.ts`), repositoryTemplate);
fs.writeFileSync(path.join(repositoryImplFolder, `${fileName}.repository.ts`), repositoryImplTemplate);

console.log(`✅ ${className}Module criado em src/modules/${fileName}/`);

// --- Atualiza index.ts da pasta modules ---
const modulesIndexPath = path.join(__dirname, '..', 'src', 'modules', 'index.ts');
if (!fs.existsSync(modulesIndexPath)) {
  fs.writeFileSync(modulesIndexPath, '', 'utf-8');
}
let indexContent = fs.readFileSync(modulesIndexPath, 'utf-8');
const exportLine = `export { ${className}Module } from './${fileName}/${fileName}.module';`;
if (!indexContent.includes(exportLine)) {
  indexContent = indexContent.trim() + '\n' + exportLine + '\n';
  fs.writeFileSync(modulesIndexPath, indexContent);
  console.log(`✅ ${className}Module exportado no index.ts da pasta modules`);
}

// --- Atualiza AppModule ---
const appModulePath = path.join(__dirname, '..', 'src', 'app.module.ts');
if (fs.existsSync(appModulePath)) {
  let appModuleContent = fs.readFileSync(appModulePath, 'utf-8');

  // Regex para encontrar import de @/modules
  const modulesImportRegex = /import\s*\{([^}]+)\}\s*from\s*['"]@\/modules['"];/;
  const match = appModuleContent.match(modulesImportRegex);

  if (match) {
    // Pega todos os módulos já importados
    let importedModules = match[1].split(',').map(m => m.trim()).filter(Boolean);
    if (!importedModules.includes(`${className}Module`)) {
      importedModules.push(`${className}Module`);
      // Mantém cada módulo em uma linha para legibilidade
      const newImport = `import {\n  ${importedModules.join(',\n  ')}\n} from '@/modules';`;
      appModuleContent = appModuleContent.replace(modulesImportRegex, newImport);
      console.log(`✅ ${className}Module adicionado na importação de @/modules`);
    }
  } else {
    // Se não existir import de @/modules, cria um novo
    const newImport = `import { ${className}Module } from '@/modules';\n`;
    appModuleContent = newImport + appModuleContent;
    console.log(`✅ ${className}Module importado de @/modules`);
  }

  // Adiciona na lista de imports do @Module
  const importsRegex = /imports\s*:\s*\[([^\]]*)\]/;
  const matchImports = appModuleContent.match(importsRegex);
  if (matchImports) {
    let importsArray = matchImports[1].split(',').map(i => i.trim()).filter(Boolean);
    if (!importsArray.includes(`${className}Module`)) {
      importsArray.push(`${className}Module`);
      const newImports = `imports: [${importsArray.join(', ')}]`;
      appModuleContent = appModuleContent.replace(importsRegex, newImports);
      fs.writeFileSync(appModulePath, appModuleContent);
      console.log(`✅ ${className}Module adicionado no AppModule imports`);
    }
  }
}


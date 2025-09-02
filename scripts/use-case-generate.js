const fs = require('fs');
const path = require('path');

// Função para transformar qualquer string em PascalCase
const toPascalCase = (str) =>
  str
    .split(/[-_ ]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('');

const args = process.argv.slice(2);
const moduleName = args[0];
const useCaseName = args[1];

if (!moduleName || !useCaseName) {
  console.error('❌ Informe o nome do módulo e do use-case. Ex: npm run generate-use-case -- User CreateUser');
  process.exit(1);
}

const className = toPascalCase(moduleName);
const fileName = moduleName.toLowerCase();
const useCaseClassName = toPascalCase(useCaseName) + 'UseCase';
const useCaseFileName = useCaseName.toLowerCase();

const moduleFolder = path.join(__dirname, '..', 'src', 'modules', fileName);
const useCasesFolder = path.join(moduleFolder, 'use-cases');
const useCaseFolder = path.join(useCasesFolder, useCaseFileName);

if (!fs.existsSync(useCaseFolder)) fs.mkdirSync(useCaseFolder, { recursive: true });

// --- Criação do arquivo do use-case ---
const useCaseTemplate = `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${useCaseClassName} {
  execute() {
    // lógica do use-case
  }
}
`;

const useCaseFilePath = path.join(useCaseFolder, `${useCaseFileName}.use-case.ts`);
fs.writeFileSync(useCaseFilePath, useCaseTemplate);

// --- Atualiza ou cria index.ts dentro da pasta use-cases ---
const useCasesIndexPath = path.join(useCasesFolder, 'index.ts');
let indexContent = '';
if (fs.existsSync(useCasesIndexPath)) {
  indexContent = fs.readFileSync(useCasesIndexPath, 'utf-8');
}

const exportLine = `export { ${useCaseClassName} } from './${useCaseFileName}/${useCaseFileName}.use-case';`;
if (!indexContent.includes(exportLine)) {
  indexContent = indexContent.trim() + '\n' + exportLine + '\n';
  fs.writeFileSync(useCasesIndexPath, indexContent);
  console.log(`✅ Use-case exportado no index.ts da pasta use-cases`);
}

// --- Atualiza o módulo ---
const moduleFilePath = path.join(moduleFolder, `${fileName}.module.ts`);
let moduleContent = fs.readFileSync(moduleFilePath, 'utf-8');

// Procura import existente do use-cases
const importRegex = /import\s+\{([^\}]+)\}\s+from\s+'\.\/use-cases';/;
const importMatch = moduleContent.match(importRegex);

if (importMatch) {
  const existingImports = importMatch[1].split(',').map(s => s.trim());
  if (!existingImports.includes(useCaseClassName)) {
    existingImports.push(useCaseClassName);
    const newImportLine = `import { ${existingImports.join(', ')} } from './use-cases';`;
    moduleContent = moduleContent.replace(importRegex, newImportLine);
    console.log(`✅ ${useCaseClassName} adicionado na importação existente do use-cases`);
  }
} else {
  // Se não existe, cria a importação
  const lastImportMatch = [...moduleContent.matchAll(/import .+ from .+;\n/g)].pop();
  const insertIndex = lastImportMatch ? lastImportMatch.index + lastImportMatch[0].length : 0;
  const newImportLine = `import { ${useCaseClassName} } from './use-cases';\n`;
  moduleContent =
    moduleContent.slice(0, insertIndex) +
    newImportLine +
    moduleContent.slice(insertIndex);
  console.log(`✅ ${useCaseClassName} importado no ${className}Module`);
}

// Adiciona no array de providers do @Module
const providersRegex = /providers:\s*\[([^\]]*)\]/;
const matchProviders = moduleContent.match(providersRegex);
if (matchProviders) {
  let providersArray = matchProviders[1].split(',').map(p => p.trim()).filter(Boolean);
  if (!providersArray.includes(useCaseClassName)) {
    providersArray.push(useCaseClassName);
    const newProviders = `providers: [${providersArray.join(', ')}]`;
    moduleContent = moduleContent.replace(providersRegex, newProviders);
    fs.writeFileSync(moduleFilePath, moduleContent);
    console.log(`✅ ${useCaseClassName} adicionado no array de providers do ${className}Module`);
  }
}

console.log(`✅ Use-case ${useCaseClassName} criado em ${useCaseFolder} e adicionado no ${className}Module`);

import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';
import { MinioStorageService } from '@/modules/storage/services/minio-storage.service';
import { GetTenantInformationsUsecase } from '@/modules/tenants/use-cases';

@Injectable()
export class PdfService {
  constructor(
    private readonly minioStorageService: MinioStorageService,
    private readonly tenantInformationsUseCase: GetTenantInformationsUsecase
  ){}

  private async compileTemplate(data: any): Promise<string> {
    const filePath = path.join(__dirname, '..', 'templates', 'user-report.hbs');

    console.log('[TEMPLATE PATH]', filePath);

    const templateHtml = fs.readFileSync(filePath, 'utf8');
    const template = Handlebars.compile(templateHtml);
    return template(data);
  }

  async generateUserReport(userData: any): Promise<Buffer> {

    const tenantInformations = await this.tenantInformationsUseCase.execute()

    const compiledData = {
      ...userData,
      initials: this.getInitials(userData.name),
      isActive: userData.status === 'Ativo',
      generatedAt: new Date().toLocaleString('pt-BR'),
      logoUrl: `${process.env.MINIO_PUBLIC_URL}${tenantInformations?.logo_image}`,
    };

    const html = await this.compileTemplate(compiledData);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '30px', bottom: '30px', left: '20px', right: '20px' },
    });

    await browser.close();
    return Buffer.from(pdf);
  }

  private getInitials(name: string): string {
    const parts = name.trim().split(' ');
    const initials = parts.map((p) => p[0]).join('').toUpperCase();
    return initials.slice(0, 2);
  }
}

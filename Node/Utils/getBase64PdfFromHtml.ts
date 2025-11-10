// npm install puppeteer
// npm install --save-dev @types/puppeteer @types/node
import puppeteer from 'puppeteer';

export async function getBase64PdfFromHtml(content: string, options: any): Promise<string | undefined> {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--proxy-server="direct://"', '--proxy-bypass-list=*'],
    });
    const page = await browser.newPage();
    //await page.setContent(content, { waitUntil: 'networkidle2' });
    await page.setContent(content, { waitUntil: 'domcontentloaded' });
    const buffer = await page.pdf({
      margin: {
        top: options?.margin?.top || '.15in',
        right: options?.margin?.right || '.2in',
        bottom: options?.margin?.bottom || '40px',
        left: options?.margin?.left || '.2in',
      },
      // path: options?.path || undefined, // If you want to save the PDF to a file
      format: options?.format || 'A4',
      printBackground: true,
      landscape: options?.landscape || false,
      displayHeaderFooter: options?.displayHeaderFooter || true,
      headerTemplate: options?.headerTemplate || ' ',
      footerTemplate:
        options?.footerTemplate ||
        '<div style="font-size:8px; width:100%; text-align:right; padding-right:16px">Page <span  class=pageNumber></span> of <span class=totalPages></span></div>',
    });
    await browser.close();
    // return buffer; // Uncomment this line to return the buffer

    return buffer.toString('base64');
  } catch (e) {
    throw e;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}


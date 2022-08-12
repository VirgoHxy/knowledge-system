const clsCanvas = require("canvas");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

const assert = require("assert").strict;

function NodeCanvasFactory() {}
NodeCanvasFactory.prototype = {
  create: function NodeCanvasFactory_create(width, height) {
    assert(width > 0 && height > 0, "Invalid canvas size");
    const canvas = clsCanvas.createCanvas(width, height);
    const context = canvas.getContext("2d");
    return {
      canvas,
      context,
    };
  },

  reset: function NodeCanvasFactory_reset(canvasAndContext, width, height) {
    assert(canvasAndContext.canvas, "clsCanvas is not specified");
    assert(width > 0 && height > 0, "Invalid canvas size");
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  },

  destroy: function NodeCanvasFactory_destroy(canvasAndContext) {
    assert(canvasAndContext.canvas, "clsCanvas is not specified");

    // Zeroing the width and height cause Firefox to release graphics
    // resources immediately, which can greatly reduce memory consumption.
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  },
};

/**
 * pdf转image
 * @param {Uint8Array} data
 * @return {Promise<Buffer>}
 */
async function pdfToImage(data) {
  // Some PDFs need external cmaps.
  const CMAP_URL = "../node_modules/pdfjs-dist/cmaps/";
  const CMAP_PACKED = true;
  // Where the standard fonts are located.
  const STANDARD_FONT_DATA_URL = "../node_modules/pdfjs-dist/standard_fonts/";
  // Load the PDF file.
  const loadingTask = pdfjsLib.getDocument({
    data,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
    standardFontDataUrl: STANDARD_FONT_DATA_URL,
  });
  const pdfDocument = await loadingTask.promise;
  // Get the first page.
  const page = await pdfDocument.getPage(1);
  // Render the page on a Node canvas with 100% scale.
  const viewport = page.getViewport({ scale: 1.5 });
  const canvasFactory = new NodeCanvasFactory();
  const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);
  const renderContext = {
    canvasContext: canvasAndContext.context,
    viewport,
    canvasFactory,
  };

  const renderTask = page.render(renderContext);
  await renderTask.promise;
  // Convert the canvas to an image buffer.
  const image = canvasAndContext.canvas.toBuffer();
  // Release page resources.
  page.cleanup();
  return image;
}

module.exports = {
  pdfToImage,
};

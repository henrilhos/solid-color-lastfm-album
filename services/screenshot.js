import { Options } from "html2canvas";

class Screenshot {
  node;
  html2canvas;

  constructor({ node }) {
    const html2canvas = require("html2canvas");

    this.html2canvas = html2canvas;
    this.node = node;
  }

  async downloadImage(fileName) {
    const canvas = await this.generateCanvas();

    if (!canvas) return;

    const a = document.createElement("a");
    a.href = canvas
      .toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream");
    a.download = `${fileName}.jpg`;
    a.click();
  }

  async getImage() {
    const canvas = await this.generateCanvas();
    if (!canvas) return;

    return canvas.toDataURL("image/jpeg");
  }

  async generateCanvas() {
    if (!this.node) throw Error("Node element was not provide");
    if (!this.html2canvas) return;

    return this.html2canvas(this.node, {
      allowTaint: true,
      useCORS: true,
      backgroundColor: "#000",
      scale: 1.5,
    });
  }
}

export { Screenshot };

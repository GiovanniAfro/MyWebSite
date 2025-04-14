// Implementazione di Perlin Noise
export class Noise {
    private grad3: number[][];
    private p: number[];
    private perm: number[];
    private permMod12: number[];
  
    constructor(seed = Math.random()) {
      this.grad3 = [
        [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
        [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
        [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
      ];
  
      this.p = [];
      for (let i = 0; i < 256; i++) {
        this.p[i] = Math.floor(seed * 256);
      }
  
      // To remove the need for index wrapping, double the permutation table length
      this.perm = new Array(512);
      this.permMod12 = new Array(512);
      for (let i = 0; i < 512; i++) {
        this.perm[i] = this.p[i & 255];
        this.permMod12[i] = this.perm[i] % 12;
      }
    }
  
    private dot(g: number[], x: number, y: number): number {
      return g[0] * x + g[1] * y;
    }
  
    private fade(t: number): number {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
  
    private lerp(a: number, b: number, t: number): number {
      return (1 - t) * a + t * b;
    }
  
    // 2D Perlin Noise
    perlin2(x: number, y: number): number {
      // Find unit grid cell containing point
      let X = Math.floor(x) & 255;
      let Y = Math.floor(y) & 255;
      
      // Get relative coords of point within cell
      x -= Math.floor(x);
      y -= Math.floor(y);
      
      // Compute fade curves
      const u = this.fade(x);
      const v = this.fade(y);
      
      // Hash coordinates of the 4 square corners
      const A = this.perm[X] + Y;
      const B = this.perm[X + 1] + Y;
      
      // And add blended results from 4 corners of square
      const aa = this.perm[A];
      const ba = this.perm[B];
      const ab = this.perm[A + 1];
      const bb = this.perm[B + 1];
      
      // Calculate noise contributions from each corner
      const g1 = this.grad3[this.permMod12[aa]];
      const g2 = this.grad3[this.permMod12[ba]];
      const g3 = this.grad3[this.permMod12[ab]];
      const g4 = this.grad3[this.permMod12[bb]];
      
      const n00 = this.dot(g1, x, y);
      const n10 = this.dot(g2, x - 1, y);
      const n01 = this.dot(g3, x, y - 1);
      const n11 = this.dot(g4, x - 1, y - 1);
      
      // Blend contributions along x
      const nx0 = this.lerp(n00, n10, u);
      const nx1 = this.lerp(n01, n11, u);
      
      // Blend results along y
      return this.lerp(nx0, nx1, v);
    }
  }
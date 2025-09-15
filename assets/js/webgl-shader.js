/* ========================================
   WEBGL SHADER - Aero Digital
   Animated background shader
   ======================================== */

class WebGLShader {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = null;
        this.program = null;
        this.uniforms = {};
        this.animationId = null;
        this.time = 0;
        
        this.init();
    }

    init() {
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        
        if (!this.gl) {
            console.error('WebGL not supported');
            return;
        }

        this.setupShaders();
        this.setupBuffers();
        this.setupUniforms();
        this.animate();
        this.handleResize();
    }

    setupShaders() {
        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision highp float;
            uniform vec2 resolution;
            uniform float time;
            uniform float xScale;
            uniform float yScale;
            uniform float distortion;

            void main() {
                vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
                
                float d = length(p) * distortion;
                
                float rx = p.x * (1.0 + d);
                float gx = p.x;
                float bx = p.x * (1.0 - d);

                float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
                float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
                float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
                
                // Add blue tint for Aero Digital theme
                vec3 color = vec3(r * 0.3, g * 0.1, b * 0.8);
                
                gl_FragColor = vec4(color, 0.3);
            }
        `;

        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.program = this.createProgram(vertexShader, fragmentShader);
        this.gl.useProgram(this.program);
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Program linking error:', this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
            return null;
        }

        return program;
    }

    setupBuffers() {
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1
        ]);

        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

        const positionLocation = this.gl.getAttribLocation(this.program, 'position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    setupUniforms() {
        this.uniforms.resolution = this.gl.getUniformLocation(this.program, 'resolution');
        this.uniforms.time = this.gl.getUniformLocation(this.program, 'time');
        this.uniforms.xScale = this.gl.getUniformLocation(this.program, 'xScale');
        this.uniforms.yScale = this.gl.getUniformLocation(this.program, 'yScale');
        this.uniforms.distortion = this.gl.getUniformLocation(this.program, 'distortion');

        this.gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
        this.gl.uniform1f(this.uniforms.time, this.time);
        this.gl.uniform1f(this.uniforms.xScale, 1.0);
        this.gl.uniform1f(this.uniforms.yScale, 0.5);
        this.gl.uniform1f(this.uniforms.distortion, 0.05);
    }

    animate() {
        const animate = () => {
            this.time += 0.01;
            
            if (this.uniforms.time) {
                this.gl.uniform1f(this.uniforms.time, this.time);
            }
            
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    handleResize() {
        const resize = () => {
            const rect = this.canvas.getBoundingClientRect();
            this.canvas.width = rect.width * window.devicePixelRatio;
            this.canvas.height = rect.height * window.devicePixelRatio;
            
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            
            if (this.uniforms.resolution) {
                this.gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
            }
        };
        
        resize();
        window.addEventListener('resize', resize);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.handleResize);
    }
}

// Initialize WebGL Shader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('webgl-shader');
    if (canvas) {
        new WebGLShader(canvas);
    }
});

(function () {
	'use strict';

	var Mat4 = {
		identity: function () {
			return [
				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1
			];
		},

		multiply: function (a, b) {
			var o = new Array(16);
			for (var r = 0; r < 4; r++) {
				for (var c = 0; c < 4; c++) {
					o[c * 4 + r] =
						a[0 * 4 + r] * b[c * 4 + 0] +
						a[1 * 4 + r] * b[c * 4 + 1] +
						a[2 * 4 + r] * b[c * 4 + 2] +
						a[3 * 4 + r] * b[c * 4 + 3];
				}
			}
			return o;
		},

		perspective: function (fovy, aspect, near, far) {
			var f = 1 / Math.tan(fovy * 0.5);
			var nf = 1 / (near - far);
			return [
				f / aspect, 0, 0, 0,
				0, f, 0, 0,
				0, 0, (far + near) * nf, -1,
				0, 0, (2 * far * near) * nf, 0
			];
		},

		translate: function (m, x, y, z) {
			var t = Mat4.identity();
			t[12] = x;
			t[13] = y;
			t[14] = z;
			return Mat4.multiply(m, t);
		},

		rotateX: function (m, a) {
			var c = Math.cos(a);
			var s = Math.sin(a);
			return Mat4.multiply(m, [
				1, 0, 0, 0,
				0, c, s, 0,
				0, -s, c, 0,
				0, 0, 0, 1
			]);
		},

		rotateY: function (m, a) {
			var c = Math.cos(a);
			var s = Math.sin(a);
			return Mat4.multiply(m, [
				c, 0, -s, 0,
				0, 1, 0, 0,
				s, 0, c, 0,
				0, 0, 0, 1
			]);
		}
	};

	function createCameraMatrix(pos, rot) {
		var m = Mat4.identity();
		m = Mat4.rotateX(m, -rot[0]);
		m = Mat4.rotateY(m, -rot[1]);
		m = Mat4.translate(m, -pos[0], -pos[1], -pos[2]);
		return m;
	}

	function clamp(v, lo, hi) {
		return Math.max(lo, Math.min(hi, v));
	}

	function fract(v) {
		return v - Math.floor(v);
	}

	function hash2(ix, iy) {
		var h = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453123;
		return fract(h);
	}

	function smooth01(t) {
		return t * t * (3 - 2 * t);
	}

	function lerp(a, b, t) {
		return a + (b - a) * t;
	}
/*
	function sampleValueNoise(nx, ny, grid) {
		var fx = nx * grid;
		var fy = ny * grid;
		var ix = Math.floor(fx);
		var iy = Math.floor(fy);
		var tx = smooth01(fx - ix);
		var ty = smooth01(fy - iy);

		var v00 = hash2(ix, iy);
		var v10 = hash2(ix + 1, iy);
		var v01 = hash2(ix, iy + 1);
		var v11 = hash2(ix + 1, iy + 1);

		var a = lerp(v00, v10, tx);
		var b = lerp(v01, v11, tx);
		return lerp(a, b, ty);
	}

	function createValueNoise(size) {
		var out = new Float32Array(size * size);
		var octaves = [4, 8, 16, 32];
		var amps = [0.55, 0.25, 0.14, 0.06];

		for (var y = 0; y < size; y++) {
			for (var x = 0; x < size; x++) {
				var nx = x / (size - 1);
				var ny = y / (size - 1);
				var h = 0;
				for (var i = 0; i < octaves.length; i++) {
					h += sampleValueNoise(nx, ny, octaves[i]) * amps[i];
				}
				out[y * size + x] = clamp(h, 0, 1);
			}
		}
		return out;
	}*/

    function hash(x, y) {
        var n = x * 374761393 + y * 668265263;
        n = (n ^ (n >> 13)) * 1274126177;
        return ((n ^ (n >> 16)) >>> 0) / 4294967295;
    }

    function sampleValueNoise(nx, ny, frequency) {
        var x = nx * frequency;
        var y = ny * frequency;

        var x0 = Math.floor(x);
        var y0 = Math.floor(y);

        var x1 = (x0 + 1) % frequency;
        var y1 = (y0 + 1) % frequency;

        x0 = x0 % frequency;
        y0 = y0 % frequency;

        var tx = x - Math.floor(x);
        var ty = y - Math.floor(y);

        var v00 = hash(x0, y0);
        var v10 = hash(x1, y0);
        var v01 = hash(x0, y1);
        var v11 = hash(x1, y1);

        var sx = tx * tx * (3 - 2 * tx);
        var sy = ty * ty * (3 - 2 * ty);

        var a = v00 + (v10 - v00) * sx;
        var b = v01 + (v11 - v01) * sx;

        return a + (b - a) * sy;
    }
    function createValueNoise(size) {
        var out = new Float32Array(size * size);

        var octaves = [4, 8, 16, 32];
        var amps = [0.55, 0.25, 0.14, 0.06];

        for (var y = 0; y < size; y++) {
            for (var x = 0; x < size; x++) {

                // IMPORTANT: divide by size, not size-1
                var nx = x / size;
                var ny = y / size;

                var h = 0;

                for (var i = 0; i < octaves.length; i++) {
                    h += sampleValueNoise(nx, ny, octaves[i]) * amps[i];
                }

                out[y * size + x] = clamp(h, 0, 1);
            }
        }

        return out;
    }

	function createNormalMap(heightMap, size, strength) {
		var out = new Uint8Array(size * size * 4);
		for (var y = 0; y < size; y++) {
			for (var x = 0; x < size; x++) {
				var xm = (x - 1 + size) % size;
				var xp = (x + 1) % size;
				var ym = (y - 1 + size) % size;
				var yp = (y + 1) % size;

				var hl = heightMap[y * size + xm];
				var hr = heightMap[y * size + xp];
				var hd = heightMap[ym * size + x];
				var hu = heightMap[yp * size + x];

				var nx = (hl - hr) * strength;
				var ny = (hd - hu) * strength;
				var nz = 1;
				var l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;

				nx /= l;
				ny /= l;
				nz /= l;

				var o = (y * size + x) * 4;
				out[o + 0] = ((nx * 0.5 + 0.5) * 255) | 0;
				out[o + 1] = ((ny * 0.5 + 0.5) * 255) | 0;
				out[o + 2] = ((nz * 0.5 + 0.5) * 255) | 0;
				out[o + 3] = 255;
			}
		}
		return out;
	}

	function createHeightTextureData(heightMap, size) {
		var out = new Uint8Array(size * size * 4);
		for (var i = 0; i < size * size; i++) {
			var v = (heightMap[i] * 255) | 0;
			var o = i * 4;
			out[o + 0] = v;
			out[o + 1] = v;
			out[o + 2] = v;
			out[o + 3] = 255;
		}
		return out;
	}

	var CUBE_VERT_SRC = [
		'attribute vec3 aPos;',
		'attribute vec3 aNormal;',
		'attribute vec3 aColor;',
		'uniform mat4 uModel;',
		'uniform mat4 uView;',
		'uniform mat4 uProj;',
		'varying vec3 vWorldPos;',
		'varying vec3 vWorldNormal;',
		'varying vec3 vColor;',
		'void main() {',
		'  vec4 wp = uModel * vec4(aPos, 1.0);',
		'  vWorldPos = wp.xyz;',
		'  vWorldNormal = normalize(mat3(uModel) * aNormal);',
		'  vColor = aColor;',
		'  gl_Position = uProj * uView * wp;',
		'}'
	].join('\n');

	var CUBE_FRAG_SRC = [
		'precision mediump float;',
		'varying vec3 vWorldPos;',
		'varying vec3 vWorldNormal;',
		'varying vec3 vColor;',
		'uniform vec3 uCamPos;',
		'uniform vec3 uSunDir;',
		'void main() {',
		'  vec3 N = normalize(vWorldNormal);',
		'  vec3 L = normalize(uSunDir);',
		'  vec3 V = normalize(uCamPos - vWorldPos);',
		'  float diffuse = max(dot(N, L), 0.0);',
		'  vec3 H = normalize(L + V);',
		'  float spec = pow(max(dot(N, H), 0.0), 48.0);',
		'  vec3 color = vColor * (0.2 + diffuse * 0.9) + vec3(spec) * 0.15;',
		'  gl_FragColor = vec4(color, 1.0);',
		'}'
	].join('\n');

	var WATER_VERT_SRC = [
		'attribute vec3 aPos;',
		'attribute vec3 aNormal;',
		'attribute vec2 aUv;',
		'uniform mat4 uModel;',
		'uniform mat4 uView;',
		'uniform mat4 uProj;',
		'varying vec3 vWorldPos;',
		'varying vec3 vWorldNormal;',
		'varying vec2 vUv;',
		'void main() {',
		'  vec4 wp = uModel * vec4(aPos, 1.0);',
		'  vWorldPos = wp.xyz;',
		'  vWorldNormal = normalize(mat3(uModel) * aNormal);',
		'  vUv = aUv;',
		'  gl_Position = uProj * uView * wp;',
		'}'
	].join('\n');

	var WATER_FRAG_SRC = [
		'precision mediump float;',
		'varying vec3 vWorldPos;',
		'varying vec3 vWorldNormal;',
		'varying vec2 vUv;',
		'uniform vec3 uCamPos;',
		'uniform vec3 uSunDir;',
		'uniform vec3 uBaseColor;',
		'uniform float uTime;',
		'uniform sampler2D uHeightTex;',
		'uniform sampler2D uNormalTex;',
		'void main() {',
		'  vec3 N = normalize(vWorldNormal);',
		'  vec3 L = normalize(uSunDir);',
		'  vec3 V = normalize(uCamPos - vWorldPos);',
		'  vec2 flowA = vUv * 4.0 + vec2(uTime * 0.03, uTime * 0.017);',
		'  vec2 flowB = vUv * 4.0 + vec2(-uTime * 0.022, uTime * 0.026);',
		'  vec3 tnA = texture2D(uNormalTex, flowA).xyz * 2.0 - 1.0;',
		'  vec3 tnB = texture2D(uNormalTex, flowB).xyz * 2.0 - 1.0;',
		'  vec3 tn = normalize(mix(tnA, tnB, 0.5));',
		'  vec3 tangentX = vec3(1.0, 0.0, 0.0);',
		'  vec3 tangentZ = vec3(0.0, 0.0, 1.0);',
		'  vec3 up = vec3(0.0, 1.0, 0.0);',
		'  N = normalize(tangentX * tn.x + tangentZ * tn.y + up * tn.z);',
		'  float diffuse = max(dot(N, L), 0.0);',
		'  vec3 H = normalize(L + V);',
		'  float spec = pow(max(dot(N, H), 0.0), 120.0);',
		'  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.0);',
		'  float h = texture2D(uHeightTex, flowA * 0.5).r;',
		'  vec3 deep = uBaseColor * 0.65;',
		'  vec3 shallow = uBaseColor * 1.25;',
		'  vec3 water = mix(deep, shallow, h);',
		'  vec3 color = water * (0.16 + diffuse * 0.9) + vec3(spec) * (0.7 + fresnel * 0.8);',
		'  gl_FragColor = vec4(color, 1.0);',
		'}'
	].join('\n');

	function compileShader(gl, type, src) {
		var sh = gl.createShader(type);
		gl.shaderSource(sh, src);
		gl.compileShader(sh);
		if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
			var msg = gl.getShaderInfoLog(sh) || 'Unknown shader compile error';
			gl.deleteShader(sh);
			throw new Error(msg);
		}
		return sh;
	}

	function createProgram(gl, vsSrc, fsSrc) {
		var vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc);
		var fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc);
		var p = gl.createProgram();
		gl.attachShader(p, vs);
		gl.attachShader(p, fs);
		gl.linkProgram(p);
		gl.deleteShader(vs);
		gl.deleteShader(fs);
		if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
			var msg = gl.getProgramInfoLog(p) || 'Unknown link error';
			gl.deleteProgram(p);
			throw new Error(msg);
		}
		return p;
	}

	function createTexture(gl, size, rgbaData) {
		var t = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, t);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, rgbaData);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.generateMipmap(gl.TEXTURE_2D);
		return t;
	}

	function makeCubeMesh() {
		var verts = [];
		var idx = [];
		var faces = [
			{ n: [0, 0, 1], c: [0.25, 0.72, 0.92], pts: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]] },
			{ n: [0, 0, -1], c: [0.92, 0.43, 0.82], pts: [[1, -1, -1], [-1, -1, -1], [-1, 1, -1], [1, 1, -1]] },
			{ n: [0, 1, 0], c: [0.95, 0.65, 0.28], pts: [[-1, 1, 1], [1, 1, 1], [1, 1, -1], [-1, 1, -1]] },
			{ n: [0, -1, 0], c: [0.32, 0.85, 0.58], pts: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]] },
			{ n: [1, 0, 0], c: [0.95, 0.83, 0.22], pts: [[1, -1, 1], [1, -1, -1], [1, 1, -1], [1, 1, 1]] },
			{ n: [-1, 0, 0], c: [0.46, 0.65, 0.95], pts: [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]] }
		];
		var uv = [[0, 0], [1, 0], [1, 1], [0, 1]];

		for (var fi = 0; fi < faces.length; fi++) {
			var base = verts.length / 11;
			for (var j = 0; j < 4; j++) {
				var pt = faces[fi].pts[j];
				var n = faces[fi].n;
				var c = faces[fi].c;
				verts.push(
					pt[0], pt[1], pt[2],
					n[0], n[1], n[2],
					uv[j][0], uv[j][1],
					c[0], c[1], c[2]
				);
			}
			idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
		}

		return {
			vertices: new Float32Array(verts),
			indices: new Uint16Array(idx)
		};
	}

	function makePlaneMesh(size, uvScale) {
		var s = size;
		var verts = new Float32Array([
			-s, 0, -s, 0, 1, 0, 0, 0, 1, 1, 1,
			s, 0, -s, 0, 1, 0, uvScale, 0, 1, 1, 1,
			s, 0, s, 0, 1, 0, uvScale, uvScale, 1, 1, 1,
			-s, 0, s, 0, 1, 0, 0, uvScale, 1, 1, 1
		]);
		return {
			vertices: verts,
			indices: new Uint16Array([0, 2, 1, 0, 3, 2])
		};
	}

	function uploadMesh(gl, mesh) {
		var vbo = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(gl.ARRAY_BUFFER, mesh.vertices, gl.STATIC_DRAW);

		var ibo = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);

		return {
			vbo: vbo,
			ibo: ibo,
			count: mesh.indices.length
		};
	}

	function bindMesh(gl, mesh, loc) {
		var stride = 11 * 4;
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vbo);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.ibo);

		if (loc.aPos >= 0) {
			gl.enableVertexAttribArray(loc.aPos);
			gl.vertexAttribPointer(loc.aPos, 3, gl.FLOAT, false, stride, 0);
		}
		if (loc.aNormal >= 0) {
			gl.enableVertexAttribArray(loc.aNormal);
			gl.vertexAttribPointer(loc.aNormal, 3, gl.FLOAT, false, stride, 3 * 4);
		}
		if (loc.aUv >= 0) {
			gl.enableVertexAttribArray(loc.aUv);
			gl.vertexAttribPointer(loc.aUv, 2, gl.FLOAT, false, stride, 6 * 4);
		}
		if (loc.aColor >= 0) {
			gl.enableVertexAttribArray(loc.aColor);
			gl.vertexAttribPointer(loc.aColor, 3, gl.FLOAT, false, stride, 8 * 4);
		}
	}

	function mount(container) {
		var canvas = document.createElement('canvas');
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		canvas.style.display = 'block';
		container.appendChild(canvas);

		var gl = canvas.getContext('webgl', { antialias: true });
		if (!gl) {
			container.textContent = 'WebGL is not available in this browser.';
			return { destroy: function () {} };
		}

		var cubeProgram;
		var waterProgram;
		try {
			cubeProgram = createProgram(gl, CUBE_VERT_SRC, CUBE_FRAG_SRC);
			waterProgram = createProgram(gl, WATER_VERT_SRC, WATER_FRAG_SRC);
		} catch (err) {
			container.textContent = 'WebGL shader error: ' + err.message;
			return { destroy: function () {} };
		}

		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);
		gl.frontFace(gl.CCW);

		var cubeLoc = {
			aPos: gl.getAttribLocation(cubeProgram, 'aPos'),
			aNormal: gl.getAttribLocation(cubeProgram, 'aNormal'),
			aUv: -1,
			aColor: gl.getAttribLocation(cubeProgram, 'aColor'),
			uModel: gl.getUniformLocation(cubeProgram, 'uModel'),
			uView: gl.getUniformLocation(cubeProgram, 'uView'),
			uProj: gl.getUniformLocation(cubeProgram, 'uProj'),
			uCamPos: gl.getUniformLocation(cubeProgram, 'uCamPos'),
			uSunDir: gl.getUniformLocation(cubeProgram, 'uSunDir')
		};

		var waterLoc = {
			aPos: gl.getAttribLocation(waterProgram, 'aPos'),
			aNormal: gl.getAttribLocation(waterProgram, 'aNormal'),
			aUv: gl.getAttribLocation(waterProgram, 'aUv'),
			aColor: -1,
			uModel: gl.getUniformLocation(waterProgram, 'uModel'),
			uView: gl.getUniformLocation(waterProgram, 'uView'),
			uProj: gl.getUniformLocation(waterProgram, 'uProj'),
			uCamPos: gl.getUniformLocation(waterProgram, 'uCamPos'),
			uSunDir: gl.getUniformLocation(waterProgram, 'uSunDir'),
			uBaseColor: gl.getUniformLocation(waterProgram, 'uBaseColor'),
			uTime: gl.getUniformLocation(waterProgram, 'uTime'),
			uHeightTex: gl.getUniformLocation(waterProgram, 'uHeightTex'),
			uNormalTex: gl.getUniformLocation(waterProgram, 'uNormalTex')
		};

		var cube = uploadMesh(gl, makeCubeMesh());
		var plane = uploadMesh(gl, makePlaneMesh(60, 12));

		var noiseSize = 256;
		var heightMap = createValueNoise(noiseSize);
		var normalMap = createNormalMap(heightMap, noiseSize, 7.5);
		var heightTex = createTexture(gl, noiseSize, createHeightTextureData(heightMap, noiseSize));
		var normalTex = createTexture(gl, noiseSize, normalMap);

		var camPos = [0, 1.8, 7.5];
		var camRot = [-0.18, 0.0];
		var keys = Object.create(null);
		var rafId = 0;
		var lastTime = 0;

		function onKeyDown(e) {
			keys[e.code] = true;
		}
		function onKeyUp(e) {
			keys[e.code] = false;
		}
		function onMouseMove(e) {
			if (document.pointerLockElement !== canvas) return;
			camRot[1] -= e.movementX * 0.0022;
			camRot[0] -= e.movementY * 0.0018;
			camRot[0] = clamp(camRot[0], -1.45, 1.45);
		}
		function onCanvasClick() {
			if (canvas.requestPointerLock) canvas.requestPointerLock();
		}

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
		document.addEventListener('mousemove', onMouseMove);
		canvas.addEventListener('click', onCanvasClick);

		function resize() {
			var w = Math.max(1, container.clientWidth | 0);
			var h = Math.max(1, container.clientHeight | 0);
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w;
				canvas.height = h;
				gl.viewport(0, 0, w, h);
			}
		}
		window.addEventListener('resize', resize);
		resize();

		function updateCamera(dt) {
			var move = (keys.ShiftLeft || keys.ShiftRight) ? 6.0 : 3.5;
			var speed = move * dt;
			var yaw = camRot[1];
			var fx = -Math.sin(yaw);
			var fz = -Math.cos(yaw);
			var rx = Math.cos(yaw);
			var rz = -Math.sin(yaw);

			if (keys.KeyW || keys.ArrowUp) {
				camPos[0] += fx * speed;
				camPos[2] += fz * speed;
			}
			if (keys.KeyS || keys.ArrowDown) {
				camPos[0] -= fx * speed;
				camPos[2] -= fz * speed;
			}
			if (keys.KeyA || keys.ArrowLeft) {
				camPos[0] -= rx * speed;
				camPos[2] -= rz * speed;
			}
			if (keys.KeyD || keys.ArrowRight) {
				camPos[0] += rx * speed;
				camPos[2] += rz * speed;
			}
			if (keys.Space) camPos[1] += speed;
			if (keys.ControlLeft || keys.ControlRight) camPos[1] -= speed;
			camPos[1] = clamp(camPos[1], 0.7, 8.0);
		}

		function render(nowMs) {
			var now = nowMs * 0.001;
			var dt = Math.min(0.05, lastTime ? (now - lastTime) : 0.016);
			lastTime = now;

			resize();
			updateCamera(dt);

			var aspect = canvas.width / canvas.height;
			var proj = Mat4.perspective(60 * Math.PI / 180, aspect, 0.1, 220);
			var view = createCameraMatrix(camPos, camRot);
			var sunDir = new Float32Array([0.35, 0.9, 0.25]);
			var camPosArr = new Float32Array(camPos);

			gl.clearColor(0.035, 0.06, 0.095, 1.0);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			gl.useProgram(cubeProgram);
			bindMesh(gl, cube, cubeLoc);
			gl.uniformMatrix4fv(cubeLoc.uProj, false, new Float32Array(proj));
			gl.uniformMatrix4fv(cubeLoc.uView, false, new Float32Array(view));
			gl.uniform3fv(cubeLoc.uCamPos, camPosArr);
			gl.uniform3fv(cubeLoc.uSunDir, sunDir);
			var cubeModel = Mat4.translate(Mat4.identity(), 0, 1.15, 0);
			gl.uniformMatrix4fv(cubeLoc.uModel, false, new Float32Array(cubeModel));
			gl.drawElements(gl.TRIANGLES, cube.count, gl.UNSIGNED_SHORT, 0);

			gl.useProgram(waterProgram);
			bindMesh(gl, plane, waterLoc);
			gl.uniformMatrix4fv(waterLoc.uProj, false, new Float32Array(proj));
			gl.uniformMatrix4fv(waterLoc.uView, false, new Float32Array(view));
			gl.uniform3fv(waterLoc.uCamPos, camPosArr);
			gl.uniform3fv(waterLoc.uSunDir, sunDir);
			gl.uniform3fv(waterLoc.uBaseColor, new Float32Array([0.08, 0.28, 0.58]));
			gl.uniform1f(waterLoc.uTime, now);
			gl.uniformMatrix4fv(waterLoc.uModel, false, new Float32Array(Mat4.identity()));

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, heightTex);
			gl.uniform1i(waterLoc.uHeightTex, 0);
			gl.activeTexture(gl.TEXTURE1);
			gl.bindTexture(gl.TEXTURE_2D, normalTex);
			gl.uniform1i(waterLoc.uNormalTex, 1);

			gl.drawElements(gl.TRIANGLES, plane.count, gl.UNSIGNED_SHORT, 0);

			rafId = requestAnimationFrame(render);
		}

		rafId = requestAnimationFrame(render);

		return {
			destroy: function () {
				cancelAnimationFrame(rafId);
				window.removeEventListener('resize', resize);
				window.removeEventListener('keydown', onKeyDown);
				window.removeEventListener('keyup', onKeyUp);
				document.removeEventListener('mousemove', onMouseMove);
				canvas.removeEventListener('click', onCanvasClick);
				if (document.pointerLockElement === canvas && document.exitPointerLock) {
					document.exitPointerLock();
				}

				gl.deleteTexture(heightTex);
				gl.deleteTexture(normalTex);
				gl.deleteBuffer(cube.vbo);
				gl.deleteBuffer(cube.ibo);
				gl.deleteBuffer(plane.vbo);
				gl.deleteBuffer(plane.ibo);
				gl.deleteProgram(cubeProgram);
				gl.deleteProgram(waterProgram);

				if (canvas.parentNode) {
					canvas.parentNode.removeChild(canvas);
				}
			}
		};
	}

	window.CubeDemo = { mount: mount };
})();

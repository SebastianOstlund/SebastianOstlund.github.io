/*
 * cube.js — a self-contained WebGL rotating cube with mouse/touch rotation.
 * No external libraries. Exposes window.CubeDemo.mount(container).
 *
 * The cube auto-spins gently until you grab it; drag with mouse or finger to
 * rotate, release to keep spinning with the velocity you let go at.
 */
(function () {
	'use strict';

	/* ---- tiny 4x4 matrix helpers (column-major, like WebGL expects) ---- */
	var M = {
		identity: function () {
			return [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
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
			var f = 1 / Math.tan(fovy / 2);
			var nf = 1 / (near - far);
			return [
				f / aspect, 0, 0, 0,
				0, f, 0, 0,
				0, 0, (far + near) * nf, -1,
				0, 0, (2 * far * near) * nf, 0
			];
		},
		translate: function (m, x, y, z) {
			var t = M.identity();
			t[12] = x; t[13] = y; t[14] = z;
			return M.multiply(m, t);
		},
		rotateX: function (m, a) {
			var c = Math.cos(a), s = Math.sin(a);
			return M.multiply(m, [1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1]);
		},
		rotateY: function (m, a) {
			var c = Math.cos(a), s = Math.sin(a);
			return M.multiply(m, [c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1]);
		}
	};

	var VERT = [
		'attribute vec3 aPos;',
		'attribute vec3 aNormal;',
		'attribute vec3 aColor;',
		'uniform mat4 uModel;',
		'uniform mat4 uProj;',
		'varying vec3 vColor;',
		'varying vec3 vNormal;',
		'void main() {',
		'  gl_Position = uProj * uModel * vec4(aPos, 1.0);',
		'  vNormal = mat3(uModel) * aNormal;',
		'  vColor = aColor;',
		'}'
	].join('\n');

	var FRAG = [
		'precision mediump float;',
		'varying vec3 vColor;',
		'varying vec3 vNormal;',
		'void main() {',
		'  vec3 light = normalize(vec3(0.4, 0.7, 1.0));',
		'  float diff = max(dot(normalize(vNormal), light), 0.0);',
		'  float shade = 0.35 + 0.65 * diff;',          // ambient + diffuse
		'  gl_FragColor = vec4(vColor * shade, 1.0);',
		'}'
	].join('\n');

	function compile(gl, type, src) {
		var s = gl.createShader(type);
		gl.shaderSource(s, src);
		gl.compileShader(s);
		if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
			throw new Error('Shader compile error: ' + gl.getShaderInfoLog(s));
		}
		return s;
	}

	// Per-face cube: 6 faces * 4 verts. Each vertex = pos(3) normal(3) color(3).
	function buildCube() {
		var faces = [
			// dir,            normal,        color
			{ n: [0, 0, 1],  c: [0.27, 0.78, 0.92] }, // +Z  cyan
			{ n: [0, 0, -1], c: [0.55, 0.45, 0.96] }, // -Z  violet
			{ n: [0, 1, 0],  c: [0.96, 0.45, 0.66] }, // +Y  pink
			{ n: [0, -1, 0], c: [0.40, 0.85, 0.62] }, // -Y  green
			{ n: [1, 0, 0],  c: [0.98, 0.70, 0.35] }, // +X  amber
			{ n: [-1, 0, 0], c: [0.45, 0.62, 0.98] }  // -X  blue
		];
		// Corner offsets for a face given its normal axis.
		var corners = [[-1,-1],[1,-1],[1,1],[-1,1]];
		var verts = [], indices = [];
		faces.forEach(function (f, fi) {
			var n = f.n;
			for (var i = 0; i < 4; i++) {
				var u = corners[i][0], v = corners[i][1], p;
				if (n[2] !== 0)      p = [u * n[2], v, n[2]];      // facing Z
				else if (n[1] !== 0) p = [u, n[1], v * n[1]];      // facing Y
				else                 p = [n[0], v, u * -n[0]];     // facing X
				verts.push(p[0], p[1], p[2], n[0], n[1], n[2], f.c[0], f.c[1], f.c[2]);
			}
			var b = fi * 4;
			indices.push(b, b + 1, b + 2, b, b + 2, b + 3);
		});
		return { verts: new Float32Array(verts), indices: new Uint16Array(indices) };
	}

	function mount(container) {
		var canvas = document.createElement('canvas');
		canvas.className = 'cube-canvas';
		canvas.setAttribute('aria-label', 'Interactive rotating cube — drag to spin');
		container.appendChild(canvas);

		var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		if (!gl) {
			container.innerHTML = '<p class="cube-fallback">Your browser doesn’t support WebGL.</p>';
			return { destroy: function () {} };
		}

		var prog = gl.createProgram();
		gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
		gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
		gl.linkProgram(prog);
		gl.useProgram(prog);

		var geo = buildCube();
		var vbo = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(gl.ARRAY_BUFFER, geo.verts, gl.STATIC_DRAW);
		var ibo = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.indices, gl.STATIC_DRAW);

		var stride = 9 * 4;
		function attrib(name, size, offset) {
			var loc = gl.getAttribLocation(prog, name);
			gl.enableVertexAttribArray(loc);
			gl.vertexAttribPointer(loc, size, gl.FLOAT, false, stride, offset);
		}
		attrib('aPos', 3, 0);
		attrib('aNormal', 3, 3 * 4);
		attrib('aColor', 3, 6 * 4);

		var uModel = gl.getUniformLocation(prog, 'uModel');
		var uProj = gl.getUniformLocation(prog, 'uProj');

		gl.enable(gl.DEPTH_TEST);
		gl.clearColor(0.043, 0.059, 0.090, 1.0); // matches page background

		/* ---- interaction state ---- */
		var rotX = -0.5, rotY = 0.7;     // current orientation
		var velX = 0, velY = 0.006;      // angular velocity (idle auto-spin on Y)
		var dragging = false, lastX = 0, lastY = 0, moved = false;

		function pointerDown(e) {
			dragging = true; moved = false;
			var p = point(e);
			lastX = p.x; lastY = p.y;
			velX = velY = 0;
			canvas.setPointerCapture && e.pointerId != null && canvas.setPointerCapture(e.pointerId);
		}
		function pointerMove(e) {
			if (!dragging) return;
			var p = point(e);
			var dx = p.x - lastX, dy = p.y - lastY;
			lastX = p.x; lastY = p.y;
			if (Math.abs(dx) + Math.abs(dy) > 1) moved = true;
			rotY += dx * 0.01;
			rotX += dy * 0.01;
			velY = dx * 0.01;            // remember last delta for inertia
			velX = dy * 0.01;
			e.preventDefault();
		}
		function pointerUp() {
			dragging = false;
			if (!moved) velY = 0.006;    // a tap with no drag resumes gentle spin
		}
		function point(e) {
			var r = canvas.getBoundingClientRect();
			var src = e.touches ? e.touches[0] : e;
			return { x: src.clientX - r.left, y: src.clientY - r.top };
		}

		// Pointer events cover mouse + touch + pen in one path.
		canvas.addEventListener('pointerdown', pointerDown);
		window.addEventListener('pointermove', pointerMove, { passive: false });
		window.addEventListener('pointerup', pointerUp);
		canvas.style.touchAction = 'none';

		function resize() {
			var dpr = Math.min(window.devicePixelRatio || 1, 2);
			var w = container.clientWidth, h = container.clientHeight;
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			canvas.style.width = w + 'px';
			canvas.style.height = h + 'px';
			gl.viewport(0, 0, canvas.width, canvas.height);
		}
		var ro = ('ResizeObserver' in window) ? new ResizeObserver(resize) : null;
		if (ro) ro.observe(container); else window.addEventListener('resize', resize);
		resize();

		var running = true;
		function frame() {
			if (!running) return;
			if (!dragging) {
				rotX += velX; rotY += velY;
				velX *= 0.95; velY *= 0.95;             // inertia decay
				if (Math.abs(velY) < 0.006 && Math.abs(velX) < 0.001) {
					velY += (0.006 - velY) * 0.02;       // ease back to idle spin
				}
			}
			var aspect = canvas.width / canvas.height;
			var proj = M.perspective(45 * Math.PI / 180, aspect, 0.1, 100);
			var model = M.translate(M.identity(), 0, 0, -5);
			model = M.rotateX(model, rotX);
			model = M.rotateY(model, rotY);

			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			gl.uniformMatrix4fv(uProj, false, new Float32Array(proj));
			gl.uniformMatrix4fv(uModel, false, new Float32Array(model));
			gl.drawElements(gl.TRIANGLES, geo.indices.length, gl.UNSIGNED_SHORT, 0);
			requestAnimationFrame(frame);
		}
		requestAnimationFrame(frame);

		return {
			destroy: function () {
				running = false;
				canvas.removeEventListener('pointerdown', pointerDown);
				window.removeEventListener('pointermove', pointerMove);
				window.removeEventListener('pointerup', pointerUp);
				if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
				var ext = gl.getExtension('WEBGL_lose_context');
				if (ext) ext.loseContext();
			}
		};
	}

	window.CubeDemo = { mount: mount };
})();

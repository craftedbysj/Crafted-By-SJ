"use client";

import { useEffect } from "react";

const vertexShaderSource = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform sampler2D uScene;
uniform vec2 uCanvasSize;
uniform vec4 uGlassRect;
uniform vec4 uImageRect;
uniform vec2 uImageSize;
uniform vec2 uBackgroundPosition;
uniform vec2 uPointer;
uniform float uHover;
uniform float uRadius;
uniform float uBezel;
uniform float uThickness;
uniform float uIOR;
uniform float uMobile;

float roundedRectangle(vec2 p, vec2 halfSize, float radius) {
  vec2 q = abs(p) - halfSize + radius;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - radius;
}

float lensProfile(float t) {
  float s = 1.0 - t;
  return pow(max(0.0, 1.0 - s * s * s * s), 0.25);
}

vec3 sampleScene(vec2 screenPixel) {
  float coverScale = max(
    uImageRect.z / uImageSize.x,
    uImageRect.w / uImageSize.y
  );

  vec2 renderedSize = uImageSize * coverScale;
  vec2 imageOffset = (uImageRect.zw - renderedSize) * uBackgroundPosition;
  vec2 imagePixel = (screenPixel - uImageRect.xy - imageOffset) / renderedSize * uImageSize;

  vec2 imageUV = vec2(
    imagePixel.x / uImageSize.x,
    1.0 - imagePixel.y / uImageSize.y
  );

  imageUV = clamp(imageUV, vec2(0.001), vec2(0.999));
  vec3 colour = texture2D(uScene, imageUV).rgb;

  vec2 heroUV = (screenPixel - uImageRect.xy) / uImageRect.zw;

  if (uMobile < 0.5) {
    float shade = mix(1.0, 0.94, smoothstep(0.0, 0.10, heroUV.x));
    shade = mix(shade, 0.15, smoothstep(0.10, 0.47, heroUV.x));
    shade = mix(shade, 0.05, smoothstep(0.47, 1.0, heroUV.x));
    colour = mix(colour, vec3(0.0627, 0.0627, 0.0588), shade);
  } else {
    float fromBottom = 1.0 - heroUV.y;
    float shade = mix(1.0, 0.85, smoothstep(0.02, 0.35, fromBottom));
    shade = mix(shade, 0.10, smoothstep(0.35, 1.0, fromBottom));
    colour = mix(colour, vec3(0.0627, 0.0627, 0.0588), shade);
  }

  return colour;
}

void main() {
  vec2 localPixel = vec2(
    gl_FragCoord.x,
    uCanvasSize.y - gl_FragCoord.y
  );

  vec2 halfSize = uCanvasSize * 0.5;
  float radius = min(uRadius, halfSize.y - 0.5);
  vec2 point = localPixel - halfSize;
  float distanceToEdge = roundedRectangle(point, halfSize, radius);

  if (distanceToEdge > 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float insideDepth = -distanceToEdge;
  float bezel = max(2.0, min(uBezel, radius - 0.5));
  float t = clamp(insideDepth / bezel, 0.0, 1.0);

  float height = lensProfile(t);
  float nextHeight = lensProfile(min(t + 0.002, 1.0));
  float slope = (nextHeight - height) / 0.002;
  float incidentAngle = atan(slope * (uThickness / bezel));
  float transmittedSine = clamp(sin(incidentAngle) / uIOR, -0.98, 0.98);
  float transmittedAngle = asin(transmittedSine);

  float displacement = height * uThickness *
    (tan(incidentAngle) - tan(transmittedAngle));
  displacement = clamp(displacement, -10.0, 10.0);

  float epsilon = 0.5;
  vec2 gradient = vec2(
    roundedRectangle(point + vec2(epsilon, 0.0), halfSize, radius) -
      roundedRectangle(point - vec2(epsilon, 0.0), halfSize, radius),
    roundedRectangle(point + vec2(0.0, epsilon), halfSize, radius) -
      roundedRectangle(point - vec2(0.0, epsilon), halfSize, radius)
  );
  vec2 normal = normalize(gradient);

  vec2 screenPixel = uGlassRect.xy + localPixel;
  vec2 refractedPixel = screenPixel - normal * displacement;
  vec3 colour = sampleScene(refractedPixel);

  float edgeAmount = 1.0 - smoothstep(0.0, bezel, insideDepth);
  float dispersion = edgeAmount * 0.65;
  vec3 redSample = sampleScene(refractedPixel + vec2(dispersion, 0.0));
  vec3 blueSample = sampleScene(refractedPixel - vec2(dispersion, 0.0));
  colour.r = mix(colour.r, redSample.r, edgeAmount * 0.14);
  colour.b = mix(colour.b, blueSample.b, edgeAmount * 0.14);

  vec2 lightDirection = normalize(vec2(-0.42, -0.90));
  float rimLight = pow(max(dot(normal, lightDirection), 0.0), 2.0) * edgeAmount;
  float topReflection = pow(1.0 - localPixel.y / uCanvasSize.y, 5.0);
  float pointerDistance = length(localPixel / uCanvasSize - uPointer);
  float pointerReflection = exp(-pointerDistance * pointerDistance * 78.0) * uHover;
  float fineEdge = 1.0 - smoothstep(0.0, 1.5, insideDepth);

  colour += vec3(0.22, 0.20, 0.18) * rimLight * 0.22;
  colour += vec3(0.12, 0.11, 0.10) * topReflection * 0.10;
  colour += vec3(0.18, 0.15, 0.13) * pointerReflection * 0.11;
  colour += vec3(0.30, 0.28, 0.25) * fineEdge * 0.22;

  // Keep the resting surface clear; this is a tiny tint, not a blur layer.
  colour = mix(colour, vec3(0.94, 0.93, 0.91), 0.018);

  float alpha = smoothstep(0.0, 1.2, insideDepth) * 0.96;
  gl_FragColor = vec4(colour, alpha);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export default function LiquidGlass() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".main-nav");
    const heroImage = document.querySelector<HTMLElement>(".hero-image");

    if (!nav || !heroImage) return;

    nav.classList.add("liquid-glass-nav");

    const canvas = document.createElement("canvas");
    canvas.className = "liquid-glass-canvas";
    canvas.setAttribute("aria-hidden", "true");
    nav.prepend(canvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: "low-power"
    });

    if (!gl) {
      nav.classList.add("liquid-glass-fallback");
      canvas.remove();
      return () => {
        nav.classList.remove("liquid-glass-nav", "liquid-glass-fallback");
      };
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();

    if (!vertexShader || !fragmentShader || !program) {
      nav.classList.add("liquid-glass-fallback");
      canvas.remove();
      return () => {
        nav.classList.remove("liquid-glass-nav", "liquid-glass-fallback");
      };
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      nav.classList.add("liquid-glass-fallback");
      canvas.remove();
      gl.deleteProgram(program);
      return () => {
        nav.classList.remove("liquid-glass-nav", "liquid-glass-fallback");
      };
    }

    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1
    ]);

    const buffer = gl.createBuffer();
    const texture = gl.createTexture();

    if (!buffer || !texture) {
      nav.classList.add("liquid-glass-fallback");
      canvas.remove();
      gl.deleteProgram(program);
      return () => {
        nav.classList.remove("liquid-glass-nav", "liquid-glass-fallback");
      };
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uniforms = {
      scene: uniform("uScene"),
      canvasSize: uniform("uCanvasSize"),
      glassRect: uniform("uGlassRect"),
      imageRect: uniform("uImageRect"),
      imageSize: uniform("uImageSize"),
      backgroundPosition: uniform("uBackgroundPosition"),
      pointer: uniform("uPointer"),
      hover: uniform("uHover"),
      radius: uniform("uRadius"),
      bezel: uniform("uBezel"),
      thickness: uniform("uThickness"),
      ior: uniform("uIOR"),
      mobile: uniform("uMobile")
    };

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.uniform1i(uniforms.scene, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const image = new Image();
    let imageReady = false;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let hovering = 0;

    const draw = () => {
      if (!imageReady || !image.naturalWidth || !image.naturalHeight) return;

      const navRect = nav.getBoundingClientRect();
      const imageRect = heroImage.getBoundingClientRect();
      if (!navRect.width || !navRect.height || !imageRect.width || !imageRect.height) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = Math.max(1, Math.round(navRect.width * pixelRatio));
      const height = Math.max(1, Math.round(navRect.height * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uniforms.canvasSize, width, height);
      gl.uniform4f(
        uniforms.glassRect,
        navRect.left * pixelRatio,
        navRect.top * pixelRatio,
        navRect.width * pixelRatio,
        navRect.height * pixelRatio
      );
      gl.uniform4f(
        uniforms.imageRect,
        imageRect.left * pixelRatio,
        imageRect.top * pixelRatio,
        imageRect.width * pixelRatio,
        imageRect.height * pixelRatio
      );
      gl.uniform2f(uniforms.imageSize, image.naturalWidth, image.naturalHeight);

      const mobile = window.innerWidth <= 700;
      gl.uniform2f(
        uniforms.backgroundPosition,
        mobile ? 0.65 : 0.5,
        mobile ? 0.5 : 0.38
      );
      gl.uniform2f(uniforms.pointer, pointerX, pointerY);
      gl.uniform1f(uniforms.hover, hovering);
      gl.uniform1f(uniforms.radius, navRect.height * pixelRatio * 0.5);
      gl.uniform1f(uniforms.bezel, Math.min(navRect.height * pixelRatio * 0.34, 13 * pixelRatio));
      gl.uniform1f(uniforms.thickness, 6 * pixelRatio);
      gl.uniform1f(uniforms.ior, 1.46);
      gl.uniform1f(uniforms.mobile, mobile ? 1 : 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = nav.getBoundingClientRect();
      pointerX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      pointerY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      hovering = 1;
      draw();
    };

    const onPointerEnter = () => {
      hovering = 1;
      draw();
    };

    const onPointerLeave = () => {
      hovering = 0;
      pointerX = 0.5;
      pointerY = 0.5;
      draw();
    };

    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(nav);
    resizeObserver.observe(heroImage);

    nav.addEventListener("pointermove", onPointerMove, { passive: true });
    nav.addEventListener("pointerenter", onPointerEnter);
    nav.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", draw);
    window.addEventListener("scroll", draw, { passive: true });

    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      imageReady = true;
      nav.classList.add("liquid-glass-ready");
      draw();
    };

    image.onerror = () => {
      nav.classList.add("liquid-glass-fallback");
    };

    image.src = "/images/hero-portrait.png";

    return () => {
      resizeObserver.disconnect();
      nav.removeEventListener("pointermove", onPointerMove);
      nav.removeEventListener("pointerenter", onPointerEnter);
      nav.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", draw);
      window.removeEventListener("scroll", draw);
      image.onload = null;
      image.onerror = null;
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      nav.classList.remove(
        "liquid-glass-nav",
        "liquid-glass-ready",
        "liquid-glass-fallback"
      );
      canvas.remove();
    };
  }, []);

  return null;
}
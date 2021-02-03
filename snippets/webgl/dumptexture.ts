
/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {*} texture 
 */
function createProgram(gl, verSrc, fragSrc) {
    let program = gl.createProgram();

    let vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader, verSrc);
    gl.compileShader(vshader);

    let fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader, fragSrc);
    gl.compileShader(fshader);

    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);

    gl.deleteShader(vshader);
    gl.deleteShader(fshader);
    return program;
}

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLTexture} texture 
 */
function getTextureSize(gl, texture) {
    const v_src = ``;
    const f_src = ``;

    let program = createProgram(gl, v_src, f_src);
    gl.useProgram(program);


    gl.bindTexture(gl.TEXTURE0, texture);
    gl.drawElements(gl.TRIANGLES, 6, gl.)

}

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {number} width 
 * @param {number} height 
 */
function drawScreeRect(gl, width, height) {
    const vertices = [-1, 1, 0.0, 	//Vertex 0
    -1, -1, 0.0, 	//Vertex 1
        1, -1, 0.0, 	//Vertex 2
        1, 1, 0.0]; 	//Vertex 3

    const indices = [3, 2, 1, 3, 1, 0];

    //The following code snippet creates a vertex buffer and binds the vertices to it
    let squareVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //The following code snippet creates a vertex buffer and binds the indices to it
    squareIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


    let renderBuffer = gl.createRenderbuffer();
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA8)
    var frameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

}

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLTexture} texture 
 */
function dumpTexture(gl, texture) {
    var frameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    var data = null;

    var canRead = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE);
    if (canRead) {
        var size = helpers.getTextureSize(texture);
        var pixels = new Uint8Array(size.width * size.height * 4);
        gl.readPixels(0, 0, size.width, size.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        var canvas = document.createElement("canvas");
        canvas.width = size.width;
        canvas.height = size.height;

        var context = canvas.getContext("2d");
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        imageData.data.set(pixels);
        context.putImageData(imageData, 0, 0);

        data = {
            "url": canvas.toDataURL('image/png'),
            "width": size.width,
            "height": size.height,
        };
    }


    gl.deleteFramebuffer(frameBuffer);

    return data;
}
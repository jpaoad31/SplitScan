addEventListener("load", (event) => {
    const inputElement = document.getElementById("input");
    inputElement.addEventListener("change", handleFiles, false);
})

function handleFiles() {
    // need to reload page to use a new picture
    const input = document.getElementById("input")
    const body = document.getElementById("body")
    input.style = "display: none"
    const reloadText = document.createElement('p')
    reloadText.innerText = "reload page to process a new image"
    body.insertBefore(reloadText, input)

    const fileList = this.files;
    var file = fileList[0]
    showFileDetails(file)

    if (!file.type.startsWith("image")) {
        document.getElementById("preview-status").innerText = "cannot display: non-image data"
        return
    }
    var imgPreview = document.getElementById("image-preview")
    const reader = new FileReader();
    reader.onload = (event) => {
        imgPreview.src = event.target.result
        setTimeout(drawToCanvas(file), 300)
    }
    reader.readAsDataURL(file)

    document.getElementById("preview-status").innerText = "displaying original image"
}

function showFileDetails(file) {
    document.getElementById("file-name").innerText = file.name
    document.getElementById("file-type").innerText = file.type
    document.getElementById("file-size").innerText = file.size
}

function drawToCanvas(file) {
    // get image and set parameters
    const img = document.getElementById("image-preview")
    const width = Math.floor(img.width / 2)
    const height = Math.floor(img.height / 2)

    img.width = width
    img.height = height

    // get canvas objects
    const c0 = document.getElementById("canvas0")
    const c1 = document.getElementById("canvas1")
    const c2 = document.getElementById("canvas2")
    const c3 = document.getElementById("canvas3")
    const ct0 = c0.getContext('2d')
    const ct1 = c1.getContext('2d')
    const ct2 = c2.getContext('2d')
    const ct3 = c3.getContext('2d')
    
    // set canvas dimensions
    c0.width = width
    c0.height = height

    c1.width = width
    c1.height = height

    c2.width = width
    c2.height = height

    c3.width = width
    c3.height = height

    // draw images to canvas
    ct0.drawImage(img, 0, 0, width, height, 0, 0, width, height)
    ct1.drawImage(img, width, 0, width, height, 0, 0, width, height)
    ct2.drawImage(img, 0, height, width, height, 0, 0, width, height)
    ct3.drawImage(img, width, height, width, height, 0, 0, width, height)

    // setup download links
    const dl0 = document.getElementById("dl0")
    const dl1 = document.getElementById("dl1")
    const dl2 = document.getElementById("dl2")
    const dl3 = document.getElementById("dl3")

    setDownload(dl0, c0, file, "-0")
    setDownload(dl1, c1, file, "-1")
    setDownload(dl2, c2, file, "-2")
    setDownload(dl3, c3, file, "-3")
}

function setDownload(button, canvas, file, nameAppend) {
    button.addEventListener('click', event => {
        const canvasLink = canvas.toDataURL(file.type, 0.9)

        const link = document.createElement('a')
        link.href = canvasLink

        link.download = file.name.replace(/\.([^\.]*)$/, nameAppend + '.' + '$1')

        link.click()
        link.remove()
    })
}


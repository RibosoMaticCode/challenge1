let components = document.getElementById("components");
let objMediaInfo = {
    ext: "",
    name: "",
    type: "",
    size: ""
}

// CARGAR MULTIMEDIA
const loadFile = (event) => {

    // reset media
    document.querySelector("video").src = "";
    document.querySelector("audio").src = "";

    document.querySelector("video").removeAttribute("src");
    document.querySelector("audio").removeAttribute("src");
    
    // file info
    let file = event.target.files[0];
    let blobURL = URL.createObjectURL(file);
    let typeFile = file.type.substring(0, 5);

    // obj info update
    objMediaInfo.ext = file.name.split('.').pop();
    objMediaInfo.name = file.name;
    objMediaInfo.type = file.type;
    objMediaInfo.size = Math.round(file.size / 1024) + "KB";

    // show in control
    switch (typeFile) {
        case "video":
            document.querySelector("video").src = blobURL;
            break;
        case "audio":
            document.querySelector("audio").src = blobURL;
            break;
    }

    const formFile = document.getElementById('formdata');
    const formattedFormData = new FormData(formFile); 
    console.log(formattedFormData);
    loadFileServer(formattedFormData);
};

const loadFileServer = async(formattedFormData) => {

    const response = await fetch('upload.php',{
        method: 'POST',
        body: formattedFormData
    });
   
    const data = await response.text();
    alert(data);
}

const fileControl = document.getElementById('file');
fileControl.addEventListener('change', loadFile);


// MOSTRAR DATOS MULTIMEDIA

// GALERIA DE FOTOS

const showPhotos = () => {
    let subComponent = document.createElement("div");
    subComponent.className = "component component-scroll-images";
    for (let i = 1; i <= 8; i++) {
        let image = document.createElement("img");
        image.src = `img/${i}.jpg`;
        image.className = "image";
        subComponent.appendChild(image);
    }
    components.prepend(subComponent);
}

const btnShowPhotos = document.getElementById("showPhotos");
btnShowPhotos.addEventListener("click", showPhotos);

// INFO DE VIDEOS/AUDIOS

const mediaInfo = ( typeMedia ) => {
    console.log( typeMedia);

    switch (typeMedia) {
        case 'video':
            if(document.querySelector("video").src === ""){
                alert("Debe cargar video");
                return false;
            }

            break;
        case 'audio':
            if(document.querySelector("audio").src === ""){
                alert("Debe cargar audio");
                return false;
            }
            break;
    }
    
    let subComponent = document.createElement("div");
    subComponent.className = "component component-media-info";
    subComponent.innerHTML =  `
        Extension: <strong>${objMediaInfo.ext}</strong> <br >
        Nombre: <strong>${objMediaInfo.name}</strong><br >
        Tipo: <strong>${objMediaInfo.type}</strong> <br >
        Peso: <strong>${objMediaInfo.size}</strong>
        ` ;

    components.prepend(subComponent);

}

const btnShowDataVideo = document.getElementById("showDataVideo");
btnShowDataVideo.addEventListener("click", () => mediaInfo('video'), false);

const btnShowDataAudio = document.getElementById("showDataAudio");
btnShowDataAudio.addEventListener("click", () => mediaInfo('audio'), false);

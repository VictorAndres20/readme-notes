import React from 'react';

export default class ImageSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //shopId: props.shopId,
            nameImage: null,
            dataImage: null
        }
    }

    readFile = (event) => {
        var input = event.target;
        if (input.files && input.files[0]) {
            let file = input.files[0];
            this.setState({ nameImage: file.name });
            let reader = new FileReader();
            let previewAvatar = document.getElementById('previewAvatar');
            let preview = document.getElementById('previewImg');
            let previewImgBig = document.getElementById('previewImgBig');
            reader.onload = (e) => {
                let dataImg = e.target.result;
                this.setState({ dataImage: dataImg });
                previewAvatar.src = dataImg;
                preview.src = dataImg;
                previewImgBig.src = dataImg;
            }
            reader.readAsDataURL(file);
        } else {
            alert("No file detected");
        }
    }

    displayDataImage() {
        console.log(this.state.dataImage);
        console.log(this.getFileImageParts(this.state.nameImage, this.state.dataImage));
    }

    getFileImageParts(nameImage, dataImage) {
        let parts = { name: null, ext: null, contentBase64: null }
        let nameParts = nameImage.split('.');
        let dataParts = dataImage.split(';');
        let typeParts = dataParts[0].split('/');
        parts.name = nameParts[0];
        parts.ext = typeParts[1];
        parts.contentBase64 = dataParts[1].replace('base64,', '');
        return parts;
    }

    render() {
        return (
            <div style={{ marginBottom: '25px', borderRadius: '30px' }} class="card">
                <div class="card-body">
                    <h6><strong>Selecciona la imágen de tu tienda</strong></h6>
                    <hr />
                    <form>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input"
                                id="registerShopImage" lang="pl-Pl"
                                onChange={this.readFile} />
                            <label class="custom-file-label" for="registerShopImage">Click
                                para
                                                            buscar imagen</label>
                        </div>
                        <div style={{ display: 'flex', height: '205px', marginTop: '20px' }}>
                            <div
                                style={{ flex: '1 1 auto', justifyContent: 'center', alignItems: 'center' }}>
                                <img id="previewAvatar"
                                    src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"
                                    class="rounded-circle mr-3" height="50px" width="50px"
                                    alt="avatar" />
                            </div>
                            <div
                                style={{ flex: '1 1 auto', justifyContent: 'center', alignItems: 'center' }}>
                                <img id="previewImg"
                                    src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"
                                    height="100px" width="100px" alt="avatar2" />
                            </div>
                            <div
                                style={{ flex: '1 1 auto', justifyContent: 'center', alignItems: 'center' }}>
                                <img id="previewImgBig"
                                    src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"
                                    height="200px" width="200px" alt="avatar2" />
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span class="rounded-btn" style={{ backgroundColor: '#dd7234', width: '80%', marginBottom: '14px', marginTop: '14px' }}
                                type="button" onClick={() => { this.displayDataImage(); }}>Agregar imagen</span>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const FileUploadBox = (props) => {
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    
    const style = {
        ...(props.style && {
            height: props.style.height,
            width: props.style.width,
        }),
    };

    const maxSize = props.maxSize;

    const onTemplateSelect = (e) => {
        let _totalSize = 0;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });
    };

    const onTemplateRemove = (file, callback) => {
        callback();
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-file mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop File Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-file', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    const handleUpload = ({files}) => {
        const [file] = files;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {uploadFile(e.target.result)};
        fileReader.readAsDataURL(file);

        window.location.reload();
    };

    const uploadFile = async (file) => {
        let formData = new FormData();
        formData.append('file', file);

        // TODO: send request
    };

    return (
        <div style={style} className='bg-dark'>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload 
                ref={fileUploadRef} 
                customUpload={true}
                uploadHandler={handleUpload}
                multiple={true} 
                accept=".jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt" 
                maxFileSize={maxSize}
                onSelect={onTemplateSelect}
                headerTemplate={headerTemplate} 
                itemTemplate={itemTemplate} 
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} 
                uploadOptions={uploadOptions} 
                cancelOptions={cancelOptions} 
            />
        </div>
    );
}
 
export default FileUploadBox;
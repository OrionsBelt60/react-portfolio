import React, {Component} from "react";
import { DropzoneComponent } from "react-dropzone-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class ImgEdit extends Component {
    constructor(props) {
        super(props)

        this.isEditAndUrl = this.isEditAndUrl.bind(this);
    }

    isEditAndUrl() {
        if (this.props.image_url && this.props.editMode) {
                <div>
                <img src={this.props.image_url} />
                <div className="image-removal-link">
                            <a onClick={() => this.deleteImage("thumb_image")}>
                            <FontAwesomeIcon icon= "ban" />
                            </a>
                        </div>
                </div>
        } else {
        <DropzoneComponent 
                ref={this.props.ref}
                config={this.props.config()}
                djsConfig={this.props.djsConfig()}
                eventHandlers={this.props.eventHandlers()}
            >
                <div className="dz-message">{this.props.message}</div>
            </DropzoneComponent>
        }
    }
    render() {
        return (
            <div>
                {this.isEditAndUrl()}
            </div>
            

        )
    }
}
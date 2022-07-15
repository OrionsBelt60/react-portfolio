import axios from "axios";
import React, { Component } from "react";

/*banner_image_url: "https://devcamp-space.s3.amazonaws.com/cy5AuwV7ndhkq58QHetUBD6n?response-content-disposition=inline%3B%20filename%3D%22crondose.jpg%22%3B%20filename%2A%3DUTF-8%27%27crondose.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20220715%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220715T154428Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=bab102a353bd15d476f439223b0b1834a1158ea6b6fb9e419d46f4365debfe61"
category: "Technology"
column_names_merged_with_images: (9) ['id', 'name', 'description', 'url', 'category', 'position', 'thumb_image', 'banner_image', 'logo']
description: "Online tutorials and productivity tips"
id: 34582
logo_url: "https://devcamp-space.s3.amazonaws.com/wCF1RHqVetNk4CM7H5mzYM5D?response-content-disposition=inline%3B%20filename%3D%22crondose.png%22%3B%20filename%2A%3DUTF-8%27%27crondose.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20220715%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220715T154428Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ea17190ca4202dc1262db7c9c6c213949e104a58cc8168a91a7280cb26f63128"
name: "Crondose"
position: 3
thumb_image_url: "https://devcamp-space.s3.amazonaws.com/VkSf9jwHJzk1WVF39em45pay?response-content-disposition=inline%3B%20filename%3D%22crondose.jpg%22%3B%20filename%2A%3DUTF-8%27%27crondose.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20220715%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220715T154428Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=8ae5a26569eb1d18e2113087df380e7717a03a4b930a3841b2da8c400d803988"
url: "https://www.crondose.com" */

export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            portfolioItem: {}
        }
    }

    UNSAFE_componentWillMount() {
        this.getPortfolioItem();
    }

    getPortfolioItem() {
        axios.get(`https://owenpozo.devcamp.space/portfolio/portfolio_items/${
            this.props.match.params.slug}`, { withCredentials : true} 
        )
        .then(response => {
            this.setState({
                portfolioItem: response.data.portfolio_item
            })
        })
        .catch(error => {
            console.log("getportfolioItem error", error);
        });
    }


    render() {
        const {
            banner_image_url,
            description,
            id,
            logo_url,
            name,
            thumb_image_url,
            url
        } = this.state.portfolioItem;

        const bannerStyles = {
            backgroundImage: "url(" + banner_image_url + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"
        }
    return (
        <div className="portfolio-detail-wrapper">
            <div className="banner" style={bannerStyles}>
                <img src={logo_url} />
            </div>

            <div classname="portfolio-detail-description-wrapper">
                <div className="description">
                    {description}
                    </div>

                <div className="bottom-content-wrapper">
                    <a href={url} className="site-link" target="_blank">
                        {name}
                    </a>
                </div>
            </div>
        </div>
    );
    }
}
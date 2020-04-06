import React from 'react';
import services from '../services';


function convertFileToString(file) {


    return new Promise((c, e) => {


        let image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = function () {

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            // image.width *= 0.5;
            // image.height *= 0.5;

            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0 , 0);

            c(canvas.toDataURL());


        }


    });



}

export default class Ad_Form extends React.Component {

    state = {}

    updateData = (evt) => {


        if (evt.target.name == "img") {

            this.setState({
                [evt.target.name]: evt.target.files[0]
            })


        } else {

            this.setState({
                [evt.target.name]: evt.target.value
            })

        }

 

    }

    createAd = (evt) => {

        evt.preventDefault();
        services.createAd(this.state);

    }

    render() {

        return <form>

            <div>
                <input onChange={this.updateData} name="desc" placeholder="description" />
            </div>

            <div>
                <input onChange={this.updateData} name="price" placeholder="price" type="number" />
            </div>

            <div>
                <input onChange={this.updateData} name="img" placeholder="Image" type="file" />
            </div>

            <button onClick={this.createAd}>Create Ad</button>

        </form>

    }


}

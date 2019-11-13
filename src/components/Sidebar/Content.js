import React, { Component } from 'react'
import { texto } from '../../texto'
import '../../css/sidebar.css'
import Avatar from '../../assets/Avatar.png'


export default class Content extends Component {
    render() {
        return (
            <div id="container">


                <div id="texto">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas leo tortor, elementum vel tempus vel, luctus at elit. Maecenas ac mattis urna. Praesent a elementum ipsum. Praesent laoreet molestie tincidunt. Donec ullamcorper, eros quis porta dapibus, tellus mi gravida est, sagittis posuere velit nulla vitae massa. Suspendisse consectetur, dolor sit amet scelerisque cursus, dolor neque sodales ex, vitae facilisis ante lectus non turpis. Duis mattis porttitor lectus. Aliquam ac pharetra justo. Fusce elementum velit sed mauris scelerisque pretium at sit amet odio.
                    </p>
                </div>
            </div>
        )
    }
}

/*<div

className="content-container"
dangerouslySetInnerHTML={{ __html: texto }}


 <div>
                    <div>
                        <img id="user" src={Avatar} alt="" />
                    </div>
                    <div>
                        <img id="user" src={Avatar} alt="" />
                    </div>
                    <div>
                        <img id="user" src={Avatar} alt="" />
                    </div>
                    <div>
                        <img id="user" src={Avatar} alt="" />
                    </div>
                    <div>
                        <img id="user" src={Avatar} alt="" />
                    </div>
                    <div>
                        <img id="user" src={Avatar} alt="" />
                    </div>
                </div>
/>*/
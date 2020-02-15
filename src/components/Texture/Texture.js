import React, { Component } from 'react'


class Texture extends Component {

    componentWillMount() {
        let substance = document.createElement('script');
        substance.setAttribute('id', 'substanceEmbed');
        substance.src = "texture/lib/substance/substance.js";
        document.getElementsByTagName('head')[0].appendChild(substance);

        let katex = document.createElement('script');
        katex.setAttribute('id', 'katexEmbed');
        katex.src = "texture/lib/katex/katex.js";
        document.getElementsByTagName('head')[0].appendChild(katex);

        let texture = document.createElement('script');
        texture.setAttribute('id', 'textureEmbed');
        texture.src = "texture/texture.js";
        texture.onload = function() {
            let texturePlugin = document.createElement('script');
            texturePlugin.setAttribute('id', 'texturePluginEmbed');
            texturePlugin.src = "texture/plugins/texture-plugin-jats/texture-plugin-jats.js";
            document.getElementsByTagName('head')[0].appendChild(texturePlugin);

            let vfs = document.createElement('script');
            vfs.setAttribute('id', 'vfsEmbed');
            vfs.src = "texture/plugins/demo/vfs.js";
            document.getElementsByTagName('head')[0].appendChild(vfs);

            texturePlugin.onload = function() { 'use strict';

                window.addEventListener('load', () => {
                substance.substanceGlobals.DEBUG_RENDERING = true;
                texture.Texture.defaultDataFolder = './demo/data/';
                setTimeout(() => {
                    let app = DevWebApp.mount({
                    debug: true,
                    archiveId: substance.getQueryStringParam('archive') || 'kitchen-sink',
                    storageType: substance.getQueryStringParam('storage') || 'vfs',
                    storageUrl: substance.getQueryStringParam('storageUrl') || '/archives',
                    vfs: window.vfs,
                    enableRouting: true
                    }, document.getElementById('texture-file-loaded'));
            
                    // put the archive and some more things into global scope, for debugging
                    setTimeout(() => {
                    window.app = app;
                    }, 500);
                });
                });
            
                // This uses a monkey-patched VfsStorageClient that checks immediately
                // if the stored data could be loaded again, or if there is a bug in
                // Textures exporter
                class DevWebApp extends texture.TextureWebApp {
                _getStorage () {
                    let storageType = this.props.storageType;
                    let storage = super._getStorage();
                    if (storageType === 'vfs') {
                    texture.vfsSaveHook(storage, texture.TextureArchive);
                    }
                    return storage
                }
                }
            
            }
        }

        document.getElementsByTagName('head')[0].appendChild(texture);



        // let demo = document.createElement('script');
        // demo.setAttribute('id', 'demoEmbed');
        // demo.src = "texture/plugins/demo/demo.js";
        // document.getElementsByTagName('head')[0].appendChild(demo);

        // script.setAttribute('id', 'klipfolioEmbed');
        // script.onload = function() {
        //   let newScript = document.createElement('script');
        //   let inlineScript = document.createTextNode('KF.embed.embedKlip({profile : "your-kilpfolio-container-key",settings : {"width": 1141,"theme":"light","borderStyle":"square","borderColor":"#cccccc"},title : "Awesome Dashboard" });');
        //   newScript.setAttribute('id', 'klipfolioDashboard');
        //   newScript.appendChild(inlineScript); 
        //   document.getElementsByTagName('head')[0].appendChild(newScript); 
        
        // };
    
        // script.src = "https://embed.klipfolio.com/a/js/embed.api";

        document.getElementsByTagName('head')[0].appendChild(substance);
    }

    componentWillUnmount () {
        let substanceEmbed = document.getElementById('substanceEmbed');
        if(substanceEmbed) substanceEmbed.remove();

        let katexEmbed = document.getElementById('katexEmbed');
        if(katexEmbed) katexEmbed.remove();

        let textureEmbed = document.getElementById('textureEmbed');
        if(textureEmbed) textureEmbed.remove();

        let texturePluginEmbed = document.getElementById('texturePluginEmbed');
        if(texturePluginEmbed) texturePluginEmbed.remove();

        // let klipfolioDashboard = document.getElementById('klipfolioDashboard');
        // if (substanceEmbed) {
        //     substanceEmbed.remove(); 
        //    klipfolioDashboard.remove();
        // }
    }


    render(){
        return (
            < div id="texture-file-loaded"> 
                'Texture'
            </div>    
        )
    }
}

export default Texture;
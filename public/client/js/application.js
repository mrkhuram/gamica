let app = {
    controlPanel: {

        createNewProject() {

            pFileLocaterLBL.click();

        },
        attachToProject(args) {

            fetch('/attachtoproject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ path: args.path })
            });

        },
        onNewProjectLocation(evt) {


            var path = event.target.files[0].webkitRelativePath.split('/');
            path = path.slice(0, path.length - 1).join('/');
            console.log(path);

        }

    },
    editor: {
        events:{
            onFolderMentioned(evt){

                console.log(20);

            }  
        },
        loadComponent(){

            componentLoaderLBL.click();
        }
    },
    init() {

        ko.applyBindings(app, document.body);

        document.onkeydown = (evt) => {

            if (evt.ctrlKey && evt.keyCode == 65) {
                evt.preventDefault();
                this.display.toggleUI(componentsGallery);
            }

            setInterval(() => {


            });

        }

    },
    display: {

        toggleUI(element) {
            $(element).toggle();
        }

    },
    bindEvents() {


    }
}
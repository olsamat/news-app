class UI {
    constructor() {
        this.container = document.querySelector(".news-container .container .row");
    }

    createSelectResource(resouces,className,position) {
        let divResource = document.createElement('div');
        /*let a=`${className}`;
        console.log(a);*/
        divResource.className = `select-${className}`;
        let div = document.querySelector('.input-field.col.s12');
        div.insertAdjacentElement(position, divResource);
        let select = document.createElement('select');
        select.setAttribute('id',`${className}`);
        select.options[0] = new Option();
        select.options[0].text=`Choose ${className}`;
        select[0].disabled=true;
        select[0].selected=true;
        //select.options[0].setAttribute('disabled',true);
        resouces.forEach((resource, i) => {
            select.options[i+1] = new Option(resource.name, resource.source);

        })
        divResource.appendChild(select);
        console.log(divResource);
    }

    addNews(news) {
        const template = `
      <div class="col s12 m6">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
    `;

        this.container.insertAdjacentHTML("beforeend", template);
    }

    clearContainer() {
        this.container.innerHTML = "";
    }

    showLoader() {
        this.clearContainer();

        const template = `
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
    `;

        this.container.insertAdjacentHTML("beforeend", template);
    }

    showInfo(msg) {
        this.clearContainer();

        const template = `
      <div class="card blue lighten-4">
        <div class="card-content">
            <p>${msg}</p>
        </div>
      </div>
    `;

        this.container.insertAdjacentHTML("beforeend", template);
    }

    showError(err) {
        this.clearContainer();

        const template = `
      <div class="card red lighten-1">
        <div class="card-content">
            <span class="card-title">Error:</span>
            <p>${err}</p>
        </div>
      </div>
    `;

        this.container.insertAdjacentHTML("beforeend", template);
    }
}
document.addEventListener('DOMContentLoaded', function () {
// Init http
    const http = new Http();
// Init UI
    const ui = new UI();
// Api key
    const apiKey = "9c27b0f722b84da5a08312d2b125351b";


// Init elements
    const select = document.getElementById("country");
    const divInput = document.querySelector('.input-field.col.s12');
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");

// All events
    select.addEventListener("change", selectSomething);
    divInput.addEventListener('change', selectSomething);
    searchBtn.addEventListener("click", onSearch);

    function selectSomething(e) {
        let selectSources = document.getElementById('sources');
        let selectCategory = document.getElementById('category');
        if (e.target.id === 'sources') {
            document.querySelector('.select-category').style.display = 'none';
            resetOption(select, selectCategory);
            onChangeSomething('sources');
        }
        else if (e.target.id === 'country') {
            document.querySelector('.select-category').style.display = 'block';
            resetOption(selectSources);
            onChangeSomething('country');
        }
        else if (e.target.id === 'category') {
            resetOption(selectSources);
            onChangeSomething('category');
        }


    }

    function resetOption() {
        for (let argumentsKey in arguments) {
            arguments[argumentsKey][0].selected = true;
        }
        $('select').formSelect();
    }

// Event handlers
    function onChangeSomething(selectName) {
        let selectItem = document.getElementById(`${selectName}`);
        let country = select.selectedIndex ? `country=${select.value}&` : '';
        console.log(selectItem, country, category);
        // Показываю прелодер
        ui.showLoader();
        let request = '';
        let flag = 0;
        if (selectName === 'category') {
            let category = `category=${selectItem.value}`;
            // Делаем запрос на получение новостей по выбранной стране и категории
            request = `https://newsapi.org/v2/top-headlines?${country}${category}&apiKey=${apiKey}`;
            flag = 1;
        }
        // Делаем запрос на получение новостей или по стране или по категории или по ресурсу
        else {
            request = `https://newsapi.org/v2/top-headlines?${selectName}=${selectItem.value}&apiKey=${apiKey}`;
            flag = 0;
        }
        http.get(request, function (err, res) {
            if (!err) {
                // Прeобразовываем из JSON в обычный объект
                const response = JSON.parse(res);
                // Удаляем разметку из контейнера
                ui.clearContainer();
                if (!response.length && flag === 1) {
                    ui.showInfo(`По вашему запросу новостей в ${select.value} по категории ${selectItem.value} не найдено!`)
                }
                // перебираем новости из поля articles в объекте response
                response.articles.forEach(news =>  {
                    //console.log(i,news);
                    ui.addNews(news)
                });
            } else {
                // Выводим ошибку
                ui.showError(err);
            }
        });
    }

    function onSearch(e) {
        // Делаем запрос на получение новостей по тому что введено в инпут
        http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`, function (err, res) {
            if (err) return ui.showError(err);

            const response = JSON.parse(res);

            if (response.totalResults) {
                // Удаляем разметку из контейнера
                ui.clearContainer();
                // перебираем новости из поля articles в объекте response
                response.articles.forEach(news => ui.addNews(news));
            } else {
                ui.showInfo("По вашему запросу новостей не найдено!");
            }
        });
    }

// Отдельный запрос на получение ресурсов
// генерируем селект с ресурсами
// <option value="abc-news">Abc News</option>
// при выборе ресурса подгружаете новости с этим ресурсом
// возможность выбора новостей по категории и стране
// Если новостей нет по выбранной категоррии нужно вывести что "Новости по категории такой то по стране такойто не найдены"
    let resouces = [
        {
            name: "Google News (Russia)",
            source: 'google-news-ru'
        },
        {
            name: "BBC News",
            source: 'bbc-news'
        },
        {
            name: "CNN",
            source: 'cnn'
        },
        {
            name: "Google News",
            source: 'google-news'
        }
    ];
    let category = [
        {
            name: 'Business',
            source: 'business'
        },
        {
            name: 'Entertainment',
            source: 'entertainment'
        },
        {
            name: 'Health',
            source: 'health'
        },
        {
            name: 'Science',
            source: 'science'
        },
        {
            name: 'Sports',
            source: 'sports'
        }, {
            name: 'Technology',
            source: 'technology'
        }];
    ui.createSelectResource(resouces, 'sources', 'afterbegin');
    ui.createSelectResource(category, 'category', 'beforeend');
    document.querySelector('.select-category').style.display = 'none';

});
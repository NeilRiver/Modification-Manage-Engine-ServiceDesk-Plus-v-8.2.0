//class top_links
//menulist-ui3

window.$ = jQuery;

const getName = () => {

    let emptyDivs1 = $('.top_links').find('td').filter(function () {
        return this.innerHTML.match(/\[(.+?)\]/);
    })

    for (let i = 0; i < emptyDivs1.length; i++) {
        console.log(...emptyDivs1[i].innerText.match(/[a-z]+/))
        localStorage.setItem('login_name', ...emptyDivs1[i].innerText.match(/[a-z]+/));
    }

    //----FETCH------------------------------------------------------------

    let name = localStorage.getItem('login_name');

    //let name = 'shavel';

    fetch('http://servicedesk:8080/SearchN.do?fromModule=QuickReq&title=null&selectName=%D0%90%D0%B2%D1%82%D0%BE%D1%80+%D0%B7%D0%B0%D1%8F%D0%B2%D0%BA%D0%B8FromQuickReq&excludeUserID=null&searchText=' + name.substring(0, 3) + '&submitbutton=%D0%9F%D0%BE%D0%B8%D1%81%D0%BA&msp=null')
        .then(function (response) {

            return response.text()
        })
        .then(function (html) {

            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");

            let img = doc.querySelector('#AllUserView_TABLE');
            let t = img.childNodes[1].innerText;
            let t2 = t.trim().replace(/\s*\n\s*/gi, "\n").split('-').filter(v => v !== '\n');

            //  console.log(t2);
            let arr = [];
            for (let i = 0; i < t2.length; i++) {

                if (t2[i].split('\n').filter(element => (element === "" || element === null) ? null : element).length >= 3) {
                    arr.push(t2[i].split('\n').filter(element => (element === "" || element === null || element.length > 40) ? null : element))
                }
            }

            console.log(arr);

            //-----FETCH---LIST---FOR----MANUAL----SEARCHING--------------------------------



            //console.log(doc.activeElement.innerHTML);

            //--------------LIST---OF---FUNCTION---FRO--AUTO---SEACRH----USER------------
            //---------Function--for--find---max--array--id------------------------------

            const findmax = array => {
                let store;

                // for (let i = 0; i < array.length; i++) {
                //   (array[i].filter(x => x === "smirnov"? store =i:null)) 
                // }

                array.map(a => a.filter((x, i) => x === name ? store = a : null))
                return store;
                //return  
            };

            const regxname = array => {
                let login, fullname, email;

                console.log("--->", array);

                for (let i = 0; i < array.length; i++) {
                    console.log("--->", array[i]);

                    if (array[i].match(/(Начальник|Служб(а|ы))|(Служба|технической)/gi)) {
                        array[i] = "";
                    }

                    if (array[i].match(/(^(?![A-Z])[a-z]+$)/gm)) {
                        login = array[i].match(/(^(?![A-Z])[a-z]+$)/gm);
                        console.log('LOGIN ', login)
                    }
                    // if (array[i].match(/^[a-z]+./)) {
                    //   login = array[i].match(/[a-z]+/);
                    // }

                    if (array[i].match(/[А-Я][а-яё]*\s[А-Я][а-яё]*\s[А-Я][а-яё]*/)) {
                        fullname = array[i].match(/[А-Я][а-яё]*\s[А-Я][а-яё]*\s[А-Я][а-яё]*/);
                        console.log('FULLNAME ', fullname)
                    }
                    if (array[i].match(/(([a-z]+\.|[a-zA-Z])[a-zA-Z]+@[a-z]+\.[a-z]+[a-z])/g)) {
                        email = array[i].match(
                            /(([a-z]+\.|[a-zA-Z])[a-zA-Z]+@[a-z]+\.[a-z]+[a-z])/g
                        );
                        console.log('EMAIL ', email)
                    }
                    // if (array[i].match(/([a-z.]|[A-z])+@[a-z]+\.[a-z]+/g)) {
                    //   email = array[i].match(/([a-z.]|[A-z])+@[a-z]+\.[a-z]+/g);
                    // }
                }

                return {
                    login: login.toString(),
                    fullname: fullname.toString(),
                    email: email.toString()
                };
            };

            //----FUNCTION---LIST---FOR----MANUAL---SEACRH----USER-------------------------- 

            const arraytoObj = array => {
                let login, fullname, email;
                let new_array = [];

                for (let i = 0; i < array.length; i++) {

                    array[i].forEach((arrays, i, a) => {

                        if (arrays.match(/(Начальник|Служб(а|ы))|(Служба|технической)|(специалист)/gi)) {
                            arrays = "";
                        }

                        if (arrays.match(/(^(?![A-Z])[a-z]+$)/gm)) {
                            login = arrays.match(/(^(?![A-Z])[a-z]+$)/gm);
                            console.log(login.toString())

                        }
                        if (arrays.match(/[А-Я][а-яё]*\s[А-Я][а-яё]*\s[А-Я][а-яё]*/)) {
                            fullname = arrays.match(/[А-Я][а-яё]*\s[А-Я][а-яё]*\s[А-Я][а-яё]*/);
                            console.log(fullname.toString())

                        }
                        if (arrays.match(/(([a-z]+\.|[a-zA-Z])[a-zA-Z]+@[a-z]+\.[a-z]+[a-z])/g)) {
                            email = arrays.match(
                                /(([a-z]+\.|[a-zA-Z])[a-zA-Z]+@[a-z]+\.[a-z]+[a-z])/g
                            );
                            // console.log(email.toString())

                            new_array.push({
                                'login': (login !== undefined) ? login.toString() : 'DIO',
                                'fullname': (fullname !== undefined) ? fullname.toString() : 'BRANDO',
                                'email': email.toString()
                            })

                        }

                    });

                }

                let new_new_arr = [];

                new_array.forEach((element, index, array) => {

                    if (element.login === array[(index + 1 !== array.length) ? index + 1 : 0].login) {
                    } else {
                        return new_new_arr.push(element)
                    }
                }

                )

                return new_new_arr.filter(e => e.login !== 'DIO')

            };


            //-----CREATE FORM----------------------------------------------------------------

            //------TEMPLATE---DIV----------------------------------


            const divTemplate = (x) => {
                return `<div 
      style ="
            border: 2px solid #ccc;
            border-radius:10px;
            min-height: 70px;
            margin-bottom:10px;
            background: rgba(0, 0, 0, .5);
            padding: 0px 0px 0px 10px;
            cursor:pointer;
      "
    onMouseOver=" this.style.color ='red', this.style.fontSize = '12px' "
    onMouseOut=" this.style.color ='white', this.style.fontSize = '11px' " 
      onClick="(function clickHandler(x) {
      console.log('${x}')
      alert(x)
      })('${x}');">
       <strong>
            <h3>
                ${x}
            </h3>
        </strong>
    </div>`
            }

            //--------------------------------------------------

            $('body').append(`
    <div class='form_creater'
    style='
    display:flex;
    color:white;
    background: rgba(0,0,0, .7);
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 100;
    overflow: auto
    '>
        <div style=' 
        width:40%; 
        margin-top: 10%; 
        border: 2px solid #ccc;
        border-radius:10px;
        display: table;
        ' 
        class='form_container'>
        <div style ='
        display: flex;
        flex-direction: column;
        align-items: center;
        '>
            <div style='
            width: 70%;
            '>
                    <strong>
                            <h1>
                                Автоматический поиск
                            </h1>
                    </strong>
    ${ divTemplate(Object.values(regxname(findmax(arr))).map(x => x.replace(',', '') + '<br/>').join(''))}
            
             <div>
                <h1>
                    <strong>
                            Ручной поиск
                    </strong>
                </h1>
                
                   ${ arraytoObj(arr).map(x => divTemplate(Object.values(x).join('<br/>'))).join('')} 
            
                </div>
            </div>
        </div>
    </div>
            `);

        })
        .catch(function (err) {
            console.log('Failed to fetch page: ', err);
        });

}


$(".menulist-ui3").append("<li> <a  style ='cursor:pointer' class ='get_name_user'>Получить имя</a> </li>");
$(".get_name_user").click(() => getName());




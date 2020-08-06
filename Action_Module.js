var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://code.jquery.com/jquery-1.8.3.js';
document.head.appendChild(script);


function sayHi() {

    // <div> Текст1 </div>
    // <div> Текст2 </div>
    // <div> Текст3 </div>
    // <div> Текст4 </div>
    // <div> Текст5 </div>


    const superfunc = (id_quize, element, id_text) => {

        let currentCount = 0;

        //  console.log('--->', id_text);
        //  console.log('--->', id_quize);

        return function (id_quize, element, id_text) {

            if (currentCount > 0) {
                $('#div_quize_' + id_quize).remove();
                console.log('div_quize_' + id_quize);
                currentCount = 0;
                return
            }

            const close_query = (name) => {
                console.log(name);
            }


            $('#' + id_quize).append(`<div 
        id = div_quize_${id_quize}
        style ='
      //  position:fixed; 
        display:flex; 
        flex-direction:column;
        background: red;
        border: 1px solid;
       
      //  width: 100px;        
        '>
        
        <button  data-name="Выполнено" type="button" class="button-close">Заявка выполнена</button>
        <button  data-name="Колесник Олег Васильевич" type="button" class="button-re_send"> на Колесника </button>
        <button  data-name="Драб Александр Геннадьевич" type="button" class="button-re_send"> на Драба </button>
        <button  data-name="Киселёв Виталий Юрьевич" type="button" class="button-re_send"> на Юрича </button>
        <button  data-name="Селицкий Андрей Викторович" type="button" class="button-re_send"> на Викторовича </button>
        <button  data-name="Синяк Николай Валерьевич" type="button" class="button-re_send"> на Колю </button>
        <button  data-name="Шавель Антон Павлович" type="button" class="button-re_send"> на Антона </button>
        <button data-name="Сапрыкин Дмитрий Михайлович" type="button" class="button-re_send"> на Диму </button>
       
        </div>`);

            // 	Сапрыкин Дмитрий Михайлович  	
            //  Колесник Олег Васильевич     	
            //  Селицкий Андрей Викторович       	
            //  Киселёв Виталий Юрьевич   
            //  Драб Александр Геннадьевич         
            //  Синяк Николай Валерьевич    
            //  STATUS: "Открыта"

            $(`.button-re_send`).on({
                "click": function () {

                    console.log('-->', $(this).data('name'))

                    let api_key = localStorage.getItem('api_key');
                    let full_name = localStorage.getItem('full_name');

                    let data = `
                     <Operation>
                        <Details>
                            <technician>${$(this).data('name')}</technician>
                        </Details>
                      </Operation>
                    `;


                    fetch(`http://servicedesk:8080/sdpapi/request/${id_text}?OPERATION_NAME=EDIT_REQUEST&TECHNICIAN_KEY=${api_key}&INPUT_DATA=${data}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'text/xml;charset=UTF-8'
                        }

                    })
                        .then(response => console.log(response))


                    console.log('-----------------------------');
                    console.log('Кнопка', $(this).text());
                    // console.log('Кнопка', $(`.button-re_send`).text());
                    console.log('Заявка #', id_text);
                    console.log('Список #', id_quize);
                    console.log('-----------------------------');
                }
            });

            $(`.button-close`).on({
                "click": function () {

                   

                    let data2 = `
                    <Operation>
                    <Details>
                    
                    <parameter>
                    <name>category</name>
                    <value>УИТ</value>
                    </parameter>
                    

                    <parameter>
                    <name>TECHNICIAN</name>
                    <value>${localStorage.getItem('full_name')}</value>
                    </parameter>

                    <parameter>
                    <name>status</name>
                    <value>Выполнено</value>
                    </parameter>
                    
                    <parameter>
                    <name>priority</name>
                    <value>Нормально</value>
                    </parameter>
                    
                    <parameter>
                    <name>level</name>
                    <value>Уровень 3 (нормально)</value>
                    </parameter>
                    
                    </Details>
                    </Operation>`;

                    let api_key = localStorage.getItem('api_key');
                   

                    fetch(`http://servicedesk:8080/sdpapi/request/${id_text}?OPERATION_NAME=EDIT_REQUEST&TECHNICIAN_KEY=${api_key}&INPUT_DATA=${data2}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'text/xml;charset=UTF-8'
                        }

                    })
                        .then(response => console.log(response))

                    console.log('------------1111-----------------');
                    console.log('Кнопка', $(`.button-close-${id_text}`).text());
                    console.log('Заявка #', id_text);
                    console.log('Список #', id_quize);
                    console.log('-----------------------------');
                }
            });

            //http://servicedesk:8080/servlets/RequestServlet

            console.log('count', currentCount);
            return currentCount++;
        };


    }
    //fontBlackBold
    //evenRow
    //oddRow

    var emptyDivs1 = $('.evenRow').filter(function () {
        return $.trim($(this).text()) === "" && $(this).children().length === 0;
    });
    var emptyDivs2 = $('.oddRow').filter(function () {
        return $.trim($(this).text()) === "" && $(this).children().length === 0;
    });


    //-------------------------------START--------inion--object-----------------------------------//
    let t = {};

    for (let i = 0; i < emptyDivs1.prevObject.length; i++) {
        t[i] = (emptyDivs1.prevObject[i]);
        t[emptyDivs1.prevObject.length + i] = (emptyDivs2.prevObject[i])

    }

    //--------------------------------END--------inion--object------------------------------------//

    // ------------------------------START-------oddRow-------------------------------------------//

    // for (let i = 0; i < emptyDivs2.prevObject.length; i++) {
    //     if (emptyDivs2.prevObject[i].innerText.match(/^\d+$/)) {

    //         let counter2 = superfunc();
    //         emptyDivs2.prevObject[i].style.cssText = "text-align: center; background: lightcyan; padding: 0px;";

    //         emptyDivs2.prevObject[i].id = `quize_${i}`;
    //         $(`#quize_${i}`).html(`<a style="font-weight: bold" id="a_id_${i}">${emptyDivs2.prevObject[i].innerText}</a>`);

    //         $(`#a_id_${i}`).click(() => {

    //         counter2(`quize-${i}`, emptyDivs2.prevObject[i], emptyDivs2.prevObject[i].innerText)

    //         }).hover(function (e) {
    //             $(this).css({ "color": e.type === "mouseenter" ? "red" : "#2C539A", "cursor": "pointer" })
    //         })

    //         console.error(i, ' HACKED by Коля')

    //     }
    // }
    // --------------------------------END-----oddRow-------------------------------------------//

    // -----------------------------START--------evenRow-------------------------------------------//


    for (let i = 0; i < Object.keys(t).length; i++) {

        if (t[i] === undefined) return false

        if (t[i].innerText.match(/^\d+$/)) {

            let counter = superfunc();
            t[i].style.cssText = "text-align: center; background: lightcyan; padding: 0px;";

            // emptyDivs.prevObject[i].addEventListener('click', () => {  superfunc(`quize-${i}`, emptyDivs.prevObject[i], emptyDivs.prevObject[i].innerText) })

            // emptyDivs.prevObject[i].addEventListener('click', () => { console.log(emptyDivs.prevObject[i].innerText) })
            // console.log(emptyDivs.prevObject[i])


            t[i].id = `quize-${i}`;
            $(`#quize-${i}`).html(`<a style="font-weight: bold" id="a-id-${i}">${t[i].innerText}</a>`);

            //  superfunc(`quize-${i}`, emptyDivs.prevObject[i], emptyDivs.prevObject[i].innerText) 

            $(`#a-id-${i}`).click(() => {
                // console.log(`quize-${i}`, emptyDivs.prevObject[i], emptyDivs.prevObject[i].innerText)

                counter(`quize-${i}`, t[i], t[i].innerText)
                //counter()

                //}).css( "cursor", "pointer" ).hover(()=>$(`#a-id-${i}`).css("color","red"),()=>$(`#a-id-${i}`).css("color","none") );

                // }).hover(function () {
                //     $(`#a-id-${i}`).css("color", "red")
                // }, function () {
                //     $(`#a-id-${i}`).css("color", "#2C539A")

                // });

            }).hover(function (e) {
                $(this).css({ "color": e.type === "mouseenter" ? "red" : "#2C539A", "cursor": "pointer" })
            })

            console.error(i, ' HACKED by Коля')

        }
    }
    // ------------------------------END--------evenRow-------------------------------------------//

}

setTimeout(sayHi, 1000);
//setInterval(sayHi, 180000);


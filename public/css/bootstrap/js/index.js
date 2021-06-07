try{
        document.getElementById('salut').addEventListener('click', function(e){
        const confirm =  window.confirm("Vous vollez le supprimer?")
        if(!confirm){
            e.preventDefault();
        }
    })
}catch(e){
    console.log("il y a une erreur");
}

try{
    /**
     * show the input comment onclick to button comment 
     * @param {int} id 
     */
    function replyComment(id){
        let element = document.getElementById('comment'+ id);
        element.classList.toggle("d-none");
    }

    (function($){
        // toggle the like in the database
        $(".likes").on('submit', function(e){
            e.preventDefault()
            let url = $(this).attr("action")
            let input = this.children
            // call the url in the ajax with jquery 
            $.post(url, $(this).serializeArray())
                .done(function(data , text , jqxhr){
                    console.log(data)
                    let dataParsed = JSON.parse(data)
                    let {number, userLike} = dataParsed
                    let count = JSON.parse(jqxhr.responseText)
                    let textMessage = userLike ? "je n'aime plus" : "j'aime"
                    input[0].innerHTML = number + " " + textMessage
                    let message = number > 1 ? number + " personnes aime cette publication" : "une personne aime cette publication";
                    input[1].innerHTML = message
                })
                .fail(function(jqxhr){
                    alert(jqxhr)
                    console.log(jqxhr)
                })
        })

        $('.d-none').on('submit', function(e){
            e.preventDefault()
            let $form = $(this)
            let commentReferences = $('.showComment')
            let card = $('<div class="card mb-2 ml-5"></div>')
            let bodyCard = $('<div class="card-body comment"></div>')
            let flex = $('<div class="d-flex justify-content-between align-items-center"></div>')
            let small = $('<small></small>')
            let span = $('<span class="badge badge-primary"></span>')
            let infos = $('<div class="alert alert-success"></div>')
            $.post($form.attr('action'), $form.serializeArray())
                .done(function(data , text, jqxhr){
                    let success = JSON.parse(jqxhr.responseText)
                    console.log(success)
                    infos.html(success.success)
                    $form.before(infos)
                    small.html(`Posté le ${success.date}`)
                    span.html(success.username)
                    flex.append(small)
                    flex.append(span)
                    bodyCard.append(success.comment)
                    bodyCard.append(flex)
                    card.append(bodyCard)
                    $form.before(card)
                    let inputs = $('textarea')
                    for(let i=0; i < inputs.length; i++){
                        inputs[i].value = ""
                    }
                })
                .fail(function(jqxhr){
                    console.log(jqxhr.responseText)
                    let errors = JSON.parse(jqxhr.responseText)
                    let errorsKey = Object.keys(errors)
                    for(let i=0; i < errorsKey.length; i++){
                        let key = errorsKey[i]
                        let error = errors[key]
                        let input = $('[name=' +  key + ']')
                        let div = document.createElement('div')
                        div.className = 'invalid-feedback'
                        div.innerHTML = error 
                        input.addClass('is-invalid')
                        input.after(div)
                    }
                })
                .always(function(){

                })
        })
        
        // toggle the modal
    const openModal = function(e){
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'))
        target.style.display = null
        target.removeAttribute('aria-hidden')
        target.setAttribute('aria-model', 'true')
        modal = target
        modal.addEventListener('click', closeModal)
        modal.querySelector(".js-close-modal").addEventListener('click', closeModal)
        modal.querySelector(".js-modal-stop").addEventListener('click', stopPropagation)
    }
    const closeModal = function(e){
        if(modal === null) return
        e.preventDefault();
        modal.style.display = "none"
        modal.setAttribute('aria-hidden', 'true')
        modal.removeAttribute('aria-model')
        modal.removeEventListener('click', closeModal)
        modal.querySelector(".js-close-modal").removeEventListener('click', closeModal)
        modal.querySelector(".js-modal-stop").removeEventListener('click', stopPropagation)
        modal = null
    }

    const stopPropagation = function(e){
        e.stopPropagation()
    }
    document.querySelectorAll('.link-modal').forEach(a => {
        a.addEventListener('click', openModal)
    })
    })($)

}catch(e){
    console.log(e)
}




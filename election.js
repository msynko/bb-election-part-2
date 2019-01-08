document.addEventListener("DOMContentLoaded", function() {

 const AjaxRequestBtn = document.querySelector('#button');
 var list = document.querySelector('#list');
 var index = 0;

 AjaxRequestBtn.addEventListener('click', function() {
   const request = axios({
     url:'https://bb-election-api.herokuapp.com/',
     method: 'GET'
   })
   .then(function(responseData) {
      console.log(responseData);
      list.innerText = "";

    responseData.data.candidates.forEach( function (candidate) {
    let form = document.createElement('form')
    form.method = 'POST';
    form.action = 'https://bb-election-api.herokuapp.com/vote'
        var liTag = document.createElement('li');
        var h3Tag = document.createElement('h4');
        var h4Tag = document.createElement('p');
        h3Tag.innerText = "Name: " + candidate.name;
        h4Tag.innerText = "Votes: " + candidate.votes;
        liTag.append(h3Tag);
        liTag.append(h4Tag);
        list.append(liTag);
        index++;

        let hiddenId = document.createElement('input');
        let button = document.createElement('button');
        button.innerText= 'vote';
        hiddenId.type = 'hidden';
        hiddenId.name = 'name';
        hiddenId.value = candidate.name;
            form.append(hiddenId);
            form.append(button);
            liTag.append(form);

      });

    });

  });

document.addEventListener('submit', function(event){
  event.preventDefault()
  let candidateName = event.target.querySelector('input').value
  axios({
    url: 'https://bb-election-api.herokuapp.com/vote',
    method: 'POST',
    data:{'name': candidateName},
    resposeType: 'JSON'
  }).then(function(response){
    console.log(response)
    location.reload();
  }).fail(function (response){
    alert('request failed');
  })

});



  // Imagination!

});

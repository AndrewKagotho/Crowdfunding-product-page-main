const congratsModal = document.getElementById('congratsModal')
const button = document.getElementById('hideModal')

/*window.onload = function(){
    congratsModal.style.visibility = 'visible'
    congratsModal.style.opacity = '1'
}*/

button.onclick = () => {
    congratsModal.style.visibility = 'hidden'
    congratsModal.style.opacity = '0'
}

/*$(window).on('load',function(){
    if (!sessionStorage.getItem('shown-modal')){
      $('#congratsModal').modal('show');
      sessionStorage.setItem('shown-modal', 'true');
    }
  });*/
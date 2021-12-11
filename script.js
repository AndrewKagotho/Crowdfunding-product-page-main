// Variables
const body = document.querySelector('body')
const backProject = document.getElementById('backProject')
const bookmark = document.getElementsByClassName('bookmark')[0]
const inText = document.getElementById('inText')
const iconSVG = document.getElementById('iconSVG')
const pathSVG = document.getElementById('pathSVG')
const modal = document.getElementById('modal')
const closeBtn = document.getElementById('close')
const radio = document.getElementsByName('pledge')
const bamboo = document.getElementsByClassName('bamboo')[0]
const blackEdition = document.getElementsByClassName('blackEdition')[0]
const mahoganySpecial = document.getElementsByClassName('mahoganySpecial')[0]
const radioNoPledge = document.getElementById('radioNoPledge')
const radioBamboo = document.getElementById('radioBamboo')
const radioBlackEdition = document.getElementById('radioBlackEdition')
const radioMahoganySpecial = document.getElementById('radioMahoganySpecial')
const modalContent = document.getElementById('modalContent')
const modalNoPledge = document.getElementsByClassName('modalNoPledge')[0]
const modalBamboo = document.getElementsByClassName('modalBamboo')[0]
const modalBlackEdition = document.getElementsByClassName('modalBlackEdition')[0]
const modalMahoganySpecial = document.getElementsByClassName('modalMahoganySpecial')[0]
const pledgesLeft = document.getElementsByClassName('pledgesLeft')
const modalPledgesLeft = document.getElementsByClassName('modalPledgesLeft')
const noPledgeDetails = document.getElementById('noPledgeDetails')
const rewardBtn = document.getElementsByClassName('rewards')
const expanded = document.getElementsByClassName('expanded')
const label = document.getElementsByClassName('label')
const checkmark = document.getElementsByClassName('checkmark')
const labelText = document.getElementsByTagName('label')
const amount = document.getElementsByClassName('amount')
const continueBtn = document.getElementsByClassName('continue')
const totalAmount = document.getElementById('totalAmount')
const totalBackers = document.getElementById('totalBackers')
const progress = document.getElementsByTagName('progress')
const congratsModal = document.getElementById('congratsModal')
const expandMenu = document.getElementById('expandMenu')
const collapseMenu = document.getElementById('collapseMenu')
const menuBackground = document.getElementById('menuBackground')
const menuItems = document.getElementById('menuItems')
const pledgeCongrats = document.getElementById('pledgeCongrats')
const hideModal = document.getElementById('hideModal')

// Back project button functionality
backProject.onclick = () => {
    modal.style.visibility = 'visible'
    modal.style.opacity = '1'
    expandMenu.style.visibility = 'hidden'
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'})
    body.style.overflow = 'hidden'
}
// Bookmark button functionality
bookmark.onclick = () => {
    inText.textContent = 'Bookmarked'
    bookmarkBtn.style.color = 'hsl(176, 50%, 40%)'
    bookmarkBtn.style.backgroundColor = 'hsl(176, 20%, 97%)'
    iconSVG.style.fill = 'hsl(176, 50%, 40%)'
    pathSVG.style.fill = 'white'
}
// Clicking away from modal to hide it
window.onclick = function(event){
    if(event.target == modal){
        modal.style.opacity = '0'
        modal.style.visibility = 'hidden'
        body.style.overflow = 'visible'
        expandMenu.style.visibility = 'visible'
    }
}
// Close button on modal functionality
closeBtn.onclick = () => {
    modal.style.opacity = '0'
    modal.style.visibility = 'hidden'
    body.style.overflow = 'visible'
    expandMenu.style.visibility = 'visible'
}
// Opening mobile menu
expandMenu.onclick = () => {
    menuBackground.style.visibility = 'visible'
    menuBackground.style.opacity = '1'
    menuItems.style.visibility = 'visible'
    menuItems.style.opacity = '1'
    expandMenu.style.visibility = 'hidden'
    collapseMenu.style.visibility = 'visible'
}
// Closing mobile menu
collapseMenu.onclick = () => {
    menuBackground.style.visibility = 'hidden'
    menuBackground.style.opacity = '0'
    menuItems.style.visibility = 'hidden'
    menuItems.style.opacity = '0'
    expandMenu.style.visibility = 'visible'
    collapseMenu.style.visibility = 'hidden'
}

// Creating cookie
if (!document.cookie.split('; ').find(row => row.startsWith('showModal'))) {
    console.log('Created!')
    document.cookie = 'showModal=FALSE'
}

// Overwriting cookie value when pledge is confirmed
for(let a=0; a<continueBtn.length; a++){
    continueBtn[a].onclick = () => {
        document.cookie = 'showModal=TRUE'
    }
}

// Reading cookie value, determine whether to show congratulatory modal
window.onload = () => {
    let showModal = document.cookie
        .split('; ')
        .find(row => row.startsWith('showModal'))
        .split('=')[1]
    if(showModal === 'TRUE'){
        congratsModal.style.visibility = 'visible'
        congratsModal.style.opacity = '1'
    }
}

// Hiding congratulatory modal
hideModal.onclick = () => {
    document.cookie = 'showModal=FALSE' 
    congratsModal.style.visibility = 'hidden'
    congratsModal.style.opacity = '0'
}

// Retrieving data from API
fetch('https://cors.io/?https://github.com/AndrewKagotho/Crowdfunding-product-page-main/blob/master/CDFdata.json')
.then(response => response.json())
.catch(error => console.log('=> '+error))
.then(data => {
    fillValues(data)
    disablePledge(data)
})

// Populating page with data
function fillValues(data){
    totalAmount.textContent = data[0]['Total']
    let amountLength = totalAmount.textContent.length
    let text = ""
    let count = 0
    for(let y=amountLength-1; y>=0; y--){
        if(count%3==0 && count!=0)
            text = totalAmount.textContent[y] + ',' + text
        else
            text = totalAmount.textContent[y] + text
        count++
    }
    totalAmount.textContent = text
    totalBackers.textContent = data[0]['Backers']
    progress[0].value = data[0]['Total']
    pledgesLeft[0].textContent = data[0]['Bamboo Stands Left']
    pledgesLeft[1].textContent = data[0]['Black Edition Stands Left']
    pledgesLeft[2].textContent = data[0]['Mahogany Special Editions Left']
    modalPledgesLeft[0].textContent = data[0]['Bamboo Stands Left']
    modalPledgesLeft[1].textContent = data[0]['Black Edition Stands Left']
    modalPledgesLeft[2].textContent = data[0]['Mahogany Special Editions Left']
    pledgeCongrats.textContent = data[0]['Records'][totalBackers.textContent-1]['Amount']
}

// Opening modal when clicking pledge buttons on home page
for(let h=0; h<=2; h++){
    rewardBtn[h].onclick =() => {
        modal.style.visibility = 'visible'
        modal.style.opacity = '1'
        radio[h+1].checked = true
        expandDiv()
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'})
        body.style.overflow = 'hidden'
    }
}

// Adding event listeners to radio buttons
for(let i=0; i<radio.length; i++)
    radio[i].addEventListener('click', expandDiv)

// Expanding div to show details relevant to checked radio
const checkRadio1 = () => {
    radio[0].checked = 'true'
    expandDiv()
}
const checkRadio2 = () => {
    radio[1].checked = true
    expandDiv()
}
const checkRadio3 = () => {
    radio[2].checked = true
    expandDiv()
}
const checkRadio4 = () => {
    radio[3].checked = true
    expandDiv()
}

// Adding event listeners to pledge divs
modalNoPledge.addEventListener('click', checkRadio1)
modalBamboo.addEventListener('click', checkRadio2)
modalBlackEdition.addEventListener('click', checkRadio3)
modalMahoganySpecial.addEventListener('click', checkRadio4)

// Mobile test
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

// Setting pledge default style for mobile screens
if(isMobile()==true){
    modalNoPledge.style.height = '250px'
    noPledgeDetails.style.margin = '0px'
    checkmark[0].style.transform = 'translate(-175%, -40%)'
}

// Expanding div to show details relevant to checked radio
function expandDiv(){
    if(radio[0].checked){
        if(isMobile()==false){
            modalNoPledge.style.height = '250px'
            modalContent.style.height = '1030px'
        }else{
            modalNoPledge.style.height = '390px'
            modalContent.style.height = '1600px'
            expanded[0].style.top = '250px'
        }
        expanded[0].style.visibility = 'visible'
        expanded[0].style.opacity = '1'
        modalNoPledge.style.boxShadow = '0 0 3px hsl(176, 72%, 28%)'
        label[0].disabled = false
        amount[0].disabled = false
        label[1].disabled = true
        amount[1].disabled = true
        label[2].disabled = true
        amount[2].disabled = true
        label[3].disabled = true
        amount[3].disabled = true
    }else{
        if(isMobile()==false)
            modalNoPledge.style.height = '170px'
        else
            modalNoPledge.style.height = '250px'
        expanded[0].style.visibility = 'hidden'
        expanded[0].style.opacity = '0'
        modalNoPledge.style.boxShadow = '0 0 1px #ccc'
    }
    if(radio[1].checked){
        if(isMobile()==false){
            modalBamboo.style.height = '250px'
            modalContent.style.height = '1030px'
        }else{
            modalBamboo.style.height = '440px'
            modalContent.style.height = '1600px'
        }
        expanded[1].style.visibility = 'visible'
        expanded[1].style.opacity = '1'
        modalBamboo.style.boxShadow = '0 0 3px hsl(176, 72%, 28%)'
        label[1].disabled = false
        amount[1].disabled = false
        label[0].disabled = true
        amount[0].disabled = true
        label[2].disabled = true
        amount[2].disabled = true
        label[3].disabled = true
        amount[3].disabled = true
    }else{
        if(isMobile()==false)
            modalBamboo.style.height = '170px'
        else
            modalBamboo.style.height = '300px'
        expanded[1].style.visibility = 'hidden'
        expanded[1].style.opacity = '0'
        modalBamboo.style.boxShadow = '0 0 1px #ccc'
    }
    if(radio[2].checked){
        if(isMobile()==false){
            modalBlackEdition.style.height = '250px'
            modalContent.style.height = '1030px'
        }else{
            modalBlackEdition.style.height = '440px'
            modalContent.style.height = '1600px'
        }
        expanded[2].style.visibility = 'visible'
        expanded[2].style.opacity = '1'
        modalBlackEdition.style.boxShadow = '0 0 3px hsl(176, 72%, 28%)'
        label[2].disabled = false
        amount[2].disabled = false
        label[0].disabled = true
        amount[0].disabled = true
        label[1].disabled = true
        amount[1].disabled = true
        label[3].disabled = true
        amount[3].disabled = true
    }else{
        if(isMobile()==false)
            modalBlackEdition.style.height = '170px'
        else
            modalBlackEdition.style.height = '300px'
        expanded[2].style.visibility = 'hidden'
        expanded[2].style.opacity = '0'
        modalBlackEdition.style.boxShadow = '0 0 1px #ccc'
    }
    if(radio[3].checked){
        if(isMobile()==false){
            modalMahoganySpecial.style.height = '250px'
            modalContent.style.height = '1030px'
        }else{
            modalMahoganySpecial.style.height = '440px'
            modalContent.style.height = '1600px'
        }
        expanded[3].style.visibility = 'visible'
        expanded[3].style.opacity = '1'
        modalMahoganySpecial.style.boxShadow = '0 0 3px hsl(176, 72%, 28%)'
        label[3].disabled = false
        amount[3].disabled = false
        label[0].disabled = true
        amount[0].disabled = true
        label[1].disabled = true
        amount[1].disabled = true
        label[2].disabled = true
        amount[2].disabled = true
    }else{
        if(isMobile()==false)
            modalMahoganySpecial.style.height = '170px'
        else
            modalMahoganySpecial.style.height = '300px'
        expanded[3].style.visibility = 'hidden'
        expanded[3].style.opacity = '0'
        modalMahoganySpecial.style.boxShadow = '0 0 1px #ccc'
    }
}

// Disabling pledge if limit reached
function disablePledge(data){
    if(data[0]['Total']>=100000){
        modalNoPledge.style.filter = 'opacity(0.5)'
        radioNoPledge.disabled = true
        radioBamboo.disabled = true
        radioBlackEdition.disabled = true
        radioMahoganySpecial.disabled = true
    }
    if(data[0]['Bamboo Stands Left']==0){
        bamboo.style.filter = 'opacity(0.5)'
        modalBamboo.style.filter = 'opacity(0.5)'
        rewardBtn[0].textContent = 'Out of stock'
        rewardBtn[0].style.backgroundColor = 'grey'
        rewardBtn[0].disabled = true
        radioBamboo.disabled = true
    }
    if(data[0]['Black Edition Stands Left']==0){
        blackEdition.style.filter = 'opacity(0.5)'
        modalBlackEdition.style.filter = 'opacity(0.5)'
        rewardBtn[1].textContent = 'Out of stock'
        rewardBtn[1].style.backgroundColor = 'grey'
        rewardBtn[1].disabled = true
        radioBlackEdition.disabled = true
    }
    if(data[0]['Mahogany Special Editions Left']==0){
        mahoganySpecial.style.filter = 'opacity(0.5)'
        modalMahoganySpecial.style.filter = 'opacity(0.5)'
        rewardBtn[2].textContent = 'Out of stock'
        rewardBtn[2].style.backgroundColor = 'grey'
        rewardBtn[2].disabled = true
        radioMahoganySpecial.disabled = true
    }
}

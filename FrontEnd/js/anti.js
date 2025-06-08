var menuItem = document.querySelectorAll( '.menu-item')

function selectLink(){
    menuItem.forEach((item)=>
        item.classList.remove('active')
    )
    this.classList.add('active')
}

menuItem.forEach((item)=>
    item.addEventListener('click', selectLink)
)

var btnExp = document.querySelector('#btn-exp')
var menuSide = document.querySelector('.side-menu')

btnExp.addEventListener('click', function(){
    menuSide.classList.toggle('expand')
})

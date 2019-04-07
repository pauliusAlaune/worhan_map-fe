console.log('hello world');
$(document).ready(function() {
    
    const menuToggle = document.querySelector('.menuToggle');
    const headerNav = document.querySelector('.headerNav');
    
    const worhanFormCloseBtn = document.getElementById('worhanFormCloseBtn');
    const worhanForm = document.querySelector('.worhanForm');
    const regionInput = document.querySelector('.regionInput');
    
    const mapSectionMapHolder = document.querySelector('.mapSection__mapHolder svg');
    const pointerWrapper = document.querySelector('.pointerWrapper');    
    const aboutLink = document.querySelector('.aboutLink');    
    const aboutBackBtn = document.querySelector('.aboutBackBtn');
    const aboutContainer = document.querySelector('.aboutContainer');
    const aboutContainerInner = document.querySelector('.aboutContainer__inner');
    const transperantBg = document.querySelector('.transperantBg');
    let blurElement = document.querySelectorAll('.giveBlur');
    
    menuToggle.addEventListener('click', function(){
        menuToggle.classList.toggle('active');
        menuToggle.classList.add('stop');
        headerNav.classList.toggle('open');
        if(aboutContainer.classList.contains('open')){
            aboutContainer.classList.remove('open');
            transperantBg.classList.remove('open');
            for(let i = 0; i < blurElement.length; i++){
                blurElement[i].classList.remove('blur');
            }
        }
        setTimeout(function(){
            menuToggle.classList.remove('stop');
        }, 1000);
    });


    worhanFormCloseBtn.addEventListener('click', function(){
        worhanForm.classList.remove('open');
        transperantBg.classList.remove('open');
        regionInput.value = "";
    });
    

    
    const hidePointer = document.querySelectorAll('.hidePointer');
    for(let i = 0; i < hidePointer.length; i++){
        let hidePointerData =  hidePointer[i].getAttribute('data-pointer');
        let hidePointerSvg = document.getElementById(hidePointerData);
        hidePointerSvg.classList.add('notActive');
    }
    
    aboutLink.addEventListener('click', function(){
        aboutContainer.classList.add('open');
        transperantBg.classList.add('open');
        if(window.innerWidth < 768){
            setTimeout(function(){
                menuToggle.classList.remove('active');
                headerNav.classList.remove('open');
            }, 1000);
        }
        for(let i = 0; i < blurElement.length; i++){
            blurElement[i].classList.add('blur');
        }
    });
    
    
    if(window.innerWidth < 1025){
        $('.mapSection').animate({
            scrollLeft: ($('.mapSection__mapHolder').outerWidth(true) - $(window).width()) / 2
        }, 500);
    }
    
    aboutBackBtn.addEventListener('click', function(){
        aboutContainer.classList.remove('open');
        transperantBg.classList.remove('open');
        if(window.innerWidth < 768){
            setTimeout(function(){
                aboutContainerInner.scrollTo(0, 0);
            }, 500);
        }
        for(let i = 0; i < blurElement.length; i++){
            blurElement[i].classList.remove('blur');
        }
    });
    
    let pointerAll = document.querySelectorAll('.pointer');
    let pointerClickAll = document.querySelectorAll('.pointer--circle');
    let pointerPopup = document.querySelectorAll('.pointer__popup');
    for(let z = 0; z < pointerClickAll.length; z++) {
        let elem = pointerClickAll[z];         
        elem.onclick = function() {
            let winWid = window.innerWidth;
            if(winWid > 1024 && !elem.classList.contains('flagCircle')){
                if(!elem.classList.contains('flagCircle')){
                    let parentAttr = elem.closest('.pointer').getAttribute('data-pointer');
                    worhanForm.classList.add('open');
                    regionInput.value = parentAttr;
                    deleteClass(pointerPopup, 'open');
                    deleteClass(pointerPopup, 'show');
                    deleteClass(pointerPopup, 'active');
                    deleteClass(pointerAll, 'active');
                    transperantBg.classList.add('open');
                } else {

                }
                return false;
            } else {
                if(!elem.parentElement.classList.contains('active')){ 
                    deleteClass(pointerPopup, 'open');
                    deleteClass(pointerPopup, 'active');
                    deleteClass(pointerAll, 'active');
                    elem.parentElement.classList.add('active');
                    elem.parentElement.children[1].classList.add('show');
                    elem.parentElement.children[1].classList.add('active');
                    setTimeout(function(){
                        elem.parentElement.children[1].classList.add('open');
                        deleteClassIfNotActive(pointerPopup, 'active', 'show');
                    }, 200);
                    return false;
                } else {
                    deleteClass(pointerPopup, 'open');
                    deleteClass(pointerPopup, 'show');
                    deleteClass(pointerPopup, 'active');
                    deleteClass(pointerAll, 'active');
                }
            }
        };
    }
    
    let formCallerAll = document.querySelectorAll('.formCaller');
    for(let z = 0; z < formCallerAll.length; z++) {
        let elem = formCallerAll[z];   
        elem.onclick = function() {
            let parentAttr = elem.closest('.pointer').getAttribute('data-pointer');
            worhanForm.classList.add('open');
            transperantBg.classList.add('open');
            regionInput.value = parentAttr;
            setTimeout(function(){
                deleteClass(pointerPopup, 'open');
                deleteClass(pointerPopup, 'active');
                deleteClass(pointerAll, 'active');
                setTimeout(function(){
                    deleteClass(pointerPopup, 'show');
                }, 500);
            }, 500);
            return false;
        };
    }
    
    
    let region = document.querySelectorAll('.cls-3');
    for(let z = 0; z < region.length; z++) {
        let elem = region[z];   
        elem.onmouseenter = function() {
            
            let regionId = elem.getAttribute('id');
            if(!$('.pointer[data-pointer="' + regionId + '"]').hasClass('active') && !$(elem).hasClass('notActive')){
//                $('.pointer[data-pointer="' + regionId + '"] .pointer--circle').click();
                let thisPointer = $('.pointer[data-pointer="' + regionId + '"] .pointer--circle');
                let thisPointerParent = thisPointer.parent();
                let thisPointerPopup = thisPointerParent.children('.pointer__popup');
                console.log(thisPointer);
                console.log(thisPointerParent);
                console.log(thisPointerPopup);
                deleteClass(pointerPopup, 'open');
                deleteClass(pointerPopup, 'active');
                deleteClass(pointerAll, 'active');
                $(thisPointerParent).addClass('active');
                $(thisPointerPopup).addClass('show');
                $(thisPointerPopup).addClass('active');
                setTimeout(function(){
                    $(thisPointerPopup).addClass('open');
                    deleteClassIfNotActive(pointerPopup, 'active', 'show');
                }, 200);
                return false;                
            }            
            return false;
        };
    }  
    
    
    
    let height = window.innerHeight;
    setInterval(function() {
        document.body.style.height = height + "px";
    }, 500);
    $(window).on('resize', function() {
        document.body.style.height = height + "px";
    });
    
    
    function deleteClass(name, delClass){
        for(let i = 0; i < name.length; i++){
            name[i].classList.remove(delClass);
        }
    }
    function deleteClassIfNotActive(name, ifNotThis, delClass){
        for(let i = 0; i < name.length; i++){
            if(!name[i].classList.contains(ifNotThis)){
                name[i].classList.remove(delClass);
            }            
        }
    }
    
});
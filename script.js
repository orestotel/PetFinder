
function check() {
    var inp = document.querySelector(".findPet").value;
    console.log(inp + '1')
    var l = inp.length + 1;
    if (l > 3) {
        $.ajax("https://api.myjson.com/bins/wrtfd").done(function(data) {
            for (var i = 0; i < data.length; i++) {
                if (inp == data[Object.keys(data)[i]].name) {
                    if (document.querySelector(".regPet").innerHTML == 'Submit') {
                        $('.regPet').click(function() {
                            $('.success').css('top', '11%').css('padding-top', '30px').text('We found your pet:)\n redirecting...').fadeIn('slow');
                            setTimeout(function() {
                            $('.success').fadeOut();
                            }, 2000)
                            setTimeout(function () {
                            var url = "found.html"
                            $(location).attr('href', url)
                            }, 3000)
                        });
                    }
                }
            }
        })
        document.querySelector(".regPet").innerHTML = 'Submit';
        document.querySelector(".regPet").style.color = 'green';
    } else {
        document.querySelector('.findPet').style.borderRight = 'none';
        document.querySelector(".regPet").innerHTML = 'Reg Pet';
        document.querySelector(".regPet").style.backgroundColor = 'rgb(238, 249, 204)';
    }
}

function show() {

    if (document.querySelector(".regPet").innerHTML == 'Submit') {
    }
    if (document.querySelector('.regPet').innerHTML == "Reg Pet") {
        document.querySelector('.findPet').style.width = '0';
        document.querySelector('.findPet').style.transition = '1s';
        document.querySelector('.btn-6d').style.display = 'none';
        setTimeout(function() {
            $('.whatIsIt').css('top', '250%')
            $('.howDoesItWork').css('top', '350%')
            document.querySelector('.regPet').innerHTML = 'BACK';
            document.querySelector('.reg__form').style.display = 'block';
            document.querySelector('.regPet__span').style.display = 'block';
        }, 1000);
    }
    if (document.querySelector('.regPet').innerHTML == "BACK") {
        $('.whatIsIt').css('top', '200%')
        $('.howDoesItWork').css('top', '300%')
        document.querySelector('.reg__form').style.display = 'none';
        document.querySelector('.regPet__span').style.display = 'none';
        document.querySelector('.findPet').style.width = '400px';
        setTimeout(function() {
            document.querySelector('.btn-6d').style.display = 'block';
            document.querySelector('.regPet').innerHTML = 'Reg Pet';
        }, 500)

    }
}
try {
    var l = $('#getStrt').offset().top - 20;
    var lf = $('#whatItIs').offset().top - 50;
    var ls = $('#HiWorks').offset().top - 100;
    consoe.log(ls, ls - 100)
} catch (err){
    console.log(err, "no offset")
}
$(window).scroll(function() {
    var scrolled = $(this).scrollTop();
    $('.petFinder, .txt').css({
        'transform': 'translate3d(0, ' + -(scrolled * 0.9) + 'px, 0)',
        'opacity': 1 - scrolled / 350
    });
});
$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var divam = 1.2;
    $(window).css({
        "top": scrollTop / divam + "px",
        "height": 10000 - (Math.round(scrollTop / divam)) + "px"
    });

    if (scrollTop > l) {
        $('nav').addClass('changeColor')
        $('nav li:eq(3)').addClass('putBorder');
    } else {
        $('nav').removeClass('changeColor')
        $('nav li:eq(3)').removeClass('putBorder');
    }

    if (scrollTop > lf) {
        $('nav li:eq(3)').removeClass('putBorder');
        $('nav').addClass('changeColor1')
        $('nav li:eq(2)').addClass('putBorder');
    } else {
        $('nav').removeClass('changeColor1')
        $('nav li:eq(2)').removeClass('putBorder');
    }

    if (scrollTop > ls) {
        $('nav li:eq(2)').removeClass('putBorder');
        $('nav').addClass('changeColor2')
        $('nav li:eq(1)').addClass('putBorder');
    } else {
        $('nav').removeClass('changeColor2')
        $('nav li:eq(1)').removeClass('putBorder');
    }
});

$(document).ready(function() {
    $("nav").on("click", "a", function(event) {
        event.preventDefault();
        var id = $(this).attr('href')
          , top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 700);
    });
});

var pets = 0;
var page = "no";
var obj = {}
getPets();
function acceptForm() {
    $.ajax("https://api.myjson.com/bins/wrtfd").done(data=>{
        pets = data;

        //  var street =  document.querySelector('#street').value;
        obj['name'] = document.querySelector('#name').value;
        obj['nameOwner'] = document.querySelector('#desc').value;
        obj['color'] = document.querySelector('#petColor').value;
        obj['desc'] = document.querySelector('#nameOwner').value;
        obj['tel'] = document.querySelector('#tel').value;
        obj['img'] = document.getElementById("imaim").value;
        obj["lastseen"] = document.querySelector('#mapsearch').value;
        obj['page'] = $("input[type='radio'][name='page']:checked").val();
        obj['status'] = "notfound";
        var location = document.querySelector('#mapsearch').value;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyBO59mo6rMe4ChzmBqEQ8gz9QmWjg_X38c'
            }
        }).then(function(response) {
            // Log full response
            console.log(response);

            obj['location'] = response.data.results[0].geometry.location;
            pets.push(obj);
            updatePets(pets);
            // obj['street'] = street;
            console.log(obj)
        })

    }
    ).fail(function() {
        console.log("error")
    }).always(function() {
        console.log("complete")
    });

}
function getPets() {
    $.ajax("https://api.myjson.com/bins/wrtfd").done(data=>{
        pets = data;
        if (page == "lost") {
            sortPets();
            check();
        }
    }
    ).fail(function() {
        console.log("error")
    }).always(function() {
        console.log("complete")
    });

}

function sortPets() {
    var currentPet = 0,
        line = "";
    for (var i = 0; i < pets.length; i++) {
        currentPet = pets[i];
        if (currentPet["page"] == page) {
            line += '<div class="petsInfo"><img style="float:left"src=' + currentPet["img"] + '>';
            line += '<div class="desc"> <span class="name"><h3 class="mnName">' + currentPet["name"] + '</h3>';
            line += '<h5>Pet owner: ' + currentPet["nameOwner"] + '</h5>';
            line += '<h5>Pet color: ' + currentPet["color"] + '</h5>';
            line += '<h5>Status: ' + currentPet["status"] + '</h5>';
            line += '<h5>tel: ' + currentPet["tel"] + '</h5>';
            line += '<h5>Last seen: ' + currentPet["lastseen"] + '</h5>';
            line += '<br></span>';
            line += currentPet["desc"];
            line += '</div>';
            line += '</div>';
        }

        document.getElementById("out").innerHTML = line;

}

}

function updatePets(petsUpdated) {
    petsUpdated = JSON.stringify(petsUpdated);
    $.ajax({
        url: "https://api.myjson.com/bins/wrtfd",
        type: "PUT",
        data: petsUpdated,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
            console.log('success');
            $('.success').fadeIn('slow');
            setTimeout(function() {
                $('.success').fadeOut('slow');
            }, 800)
        }
    });
}

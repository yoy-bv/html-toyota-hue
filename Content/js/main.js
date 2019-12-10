$(document).ready(function () {

     
    // setSizeforVideoBanner();

    var pathname = window.location.pathname;
    $("li.headerText").each(function () {
        var t = '/' + $(this).data("path");
        if (t === pathname) {
            $(this).addClass("active");
        }
    });
    $('.parallax').parallax();
    $('ul.tabs').tabs();
    $('.scrollspy').scrollSpy({
        scrollOffset: 60
    });
    $('.collapsible').collapsible();
    $('select').material_select();

    //menu mobile
    $('.menu_mb .trigger').click(function (e) {
        $('.menu_mb').toggleClass('active');
        $('body').toggleClass('lockmb');
    });

    $('.menu_mb .list_menu_mb li.parent').click(function (e) {
        $(this).toggleClass('active');
    });

    // zoom middle-banner
    $(".increase-size").on("click", function () {
        if ($(this).attr("iszooming") == 'zoom') { // unzoom
            $(".parallax-container").css("min-height", "500px");
            $(this).attr("iszooming", "");
            $(this).attr("src", "/Content/images/increase-icon.png");
        } else {
            $(".parallax-container").css("min-height", "800px");
            $(this).attr("iszooming", "zoom");
            $(this).attr("src", "/Content/images/decrease-icon.png");
            $('html,body').animate({
                scrollTop: $(".parallax-container").offset().top - 100
            }, 'slow');
        }
    });

    //filter mobile
    $(".btn-cancel").click(function () {
        //console.log("cancel");
        //$('#open_menu_dt').attr("isfilter", "false");
        //filterMobileListProduct();
        $('.box1').removeClass('active-mobile');
        $('body').removeClass('lockb');
    });
    $('#open_menu_dt').click(function (e) {
        //console.log("open");
        //filterMobileListProduct();

        //$('.box1').toggleClass('active-mobile');
        //$('body').toggleClass('lockb');
        $('.box1').addClass('active-mobile');
        $('body').addClass('lockb');
    });
    $(".btn-filter, .btn-filter-tools, .btn-filter-tools-not-compare").on("click", function () {
        $('.box1').removeClass('active-mobile');
        $('body').removeClass('lockb');
    });
    $("#selectsort").on("change", function () {
        $('.box1').removeClass('active-mobile');
        $('body').removeClass('lockb');
    });


    $(".btn-filter-tools-not-compare").on("click", function () {
        ChangeListProductsTool();
        //checkCarTool();
        //$('.box1').removeClass('active-mobile');
        //$('body').removeClass('lockb');
        //$('#open_menu_dt').attr("isfilter", "true");
        //$('#open_menu_dt').attr("isfilter", "true");
        //filterMobileListProduct();
    });

    $(".ckDeclareNewTool").on("click", function () {
        var t = checkListInMobileChange();
        if (t == false) {
            if ($(".page_compare").length == 0)
            ChangeListProductsTool();
            //checkCarTool();
        }
    });

    $('.tool_icon_right .trigger').on("click",
    function (e) {
        $('.tool_icon_right').toggleClass('active-mobile');
        $('body').toggleClass('lock');
    });
    //Nummber phone enable on mobile
    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') < 0 && ua.indexOf('Android') < 0) {
        $('.telhref').contents().unwrap();
    }

    //lock body on hover menu xe moi
    $('.menu-pc li.parent').mouseover(function (e) {
        $('html').addClass('lock');
    });

    $('.menu-pc li.parent').mouseleave(function (e) {
        $('html').removeClass('lock');
    });
    //scroll home
    $('.overblur').on('mouseenter', function () {
        var el = document.getElementById('sec02_home');
        el.onpointermove = function (e) {
            // var tmp = e.pageX * (-1.5);
            //if (e.pageX < 500)
            //     tmp = 0;
            //setInterval(function () {
            $('#scroll_on_hover').animate({
                scrollLeft: e.pageX
            }, 0);
            // $('.slide-mouse').css("margin-left", tmp);
            // }, 200);


        };
    });

    //img hover
    $(".img_hover").mouseover(function () {
        if (!($(this).hasClass('active'))) {
            var fileName = $(this).find('img').attr('src');
            var ext = fileName.split('.').pop();
            var name = fileName.slice(0, -4) + "_on." + ext;
            $(this).find('img').attr('src', name);
        }
    });
    $(".img_hover").mouseout(function () {
        if (!($(this).hasClass('active'))) {
            var fileName = $(this).find('img').attr('src');
            var ext = fileName.split('.').pop();
            var name = fileName.slice(0, -7) + "." + ext;
            $(this).find('img').attr('src', name);
        }
    });

    //tool_icon_right
    if (window.location.pathname === '/') {
        //code for index page
        $('.tool_icon_right .item').addClass('over').closest('.tool_icon_right').addClass('open');
        setTimeout(function () {
            $('.tool_icon_right .item').closest('.tool_icon_right').removeClass('open');
            setTimeout(function () {
                $('.tool_icon_right .item').removeClass('over');
            }, 500);
        }, 5000);
    } else {
        $('.tool_icon_right .item').closest('.tool_icon_right').removeClass('open');

        //other tasks
    }
    //hover addclass tool_icon_right
    $('.tool_icon_right .item').on('mouseenter', function () {
        var s = $(this);
        // $(this).addClass('over');
        setTimeout(function () {
            s.addClass('over');
        }, 0);
    });

    $('.tool_icon_right .item').mouseleave(function () {
        var s = $(this);
        setTimeout(function () {
            s.removeClass('over');
        }, 250);
    });
    //end tool_icon_right
    var retrievedObject = localStorage.getItem('citoyota');
    if (retrievedObject == undefined || retrievedObject == null) {
        localStorage.setItem('citoyota', 1);
    } else {
        var int = parseInt(retrievedObject);
        localStorage.setItem('citoyota', int + 1);
    }
    $(window).scroll(function () {
        var h = 500;
        if ($(window).scrollTop() >= h) {
            $('.button_scroll2top').fadeIn();
        } else {
            $('.button_scroll2top').fadeOut();
        }
    });
    $("body").append('<div class="button_scroll2top" onclick="page_scroll2top()"></div>');

    $("#menu_lg .tabsmenu li").on("mouseenter", function () {
        $("#menu_lg .tabsmenu li").find("a").removeClass("active");
        var a = $(this).find("a");
        if (a.length > 0) {
            $(a).addClass("active");
            $(".menuHeaderContent").removeClass("active");
            $(".menuHeaderContent").css("display", "none");
            $($(a).attr("href")).addClass("active");
            $($(a).attr("href")).css("display", "block");
        }
    });
    $(".txtSearch").on("change", function (e) {
        if ($(this).val() !== "") {
            var t = $(this).val().toLowerCase();
            window.location.href = "/tim-kiem?cat=all&key=" + $(this).val();
        }
    });
    $(".txtSearch").focus(function () {
        var t = $(document).find(".inSearchTextBox")[0];
        if (t != undefined) {
            $(".menu_mb").removeClass("active");
            $("body").removeClass("lock");
            $("#txtSearch.inSearchTextBox").focus();
            $("#txtSearch.inSearchTextBox").select();
        }
    });
    $("img.lazy").lazyload({
        effect: "fadeIn",
        threshold: 200
    });
    $(".icon-search").on("click", function () {
        var key = $("#txtSearchmb").val() == "" ? $("#txtSearch").val() : $("#txtSearchmb").val();
        if (key != undefined && key != "") {
            window.location.href = link;
        } else
        window.location.href = "/tim-kiem";
    });

    if ($("#page_SearchTool").length > 0) {
        if ($("#txtSearch.inSearchTextBox").val() !== "") {
            $("#txtSearch").val($("#txtSearch.inSearchTextBox").val());
            $("label[for=txtSearch]").addClass("active");
            $("#txtSearch").addClass("active");
            processBeforeCall();
        }

        $("#ddlCate").change(function () {
            $("#contentResult").empty();
            $("#resultContent").hide();
            $("#contentResultFail").hide();
        });
    }

    // Check whether DOM is visible
    $.fn.onAvailable = function (fn) {
        var sel = this.selector;
        var timer;
        var self = this;
        if (this.is(":visible")) {
            fn.call(this);
        } else {
            timer = setInterval(function () {
                if ($(sel).is(":visible")) {
                    fn.call($(sel));
                    clearInterval(timer);
                }
            }, 50);
        }
    };

    $(".btnopenMessageFromHome").attr("href", "#lien-he");

    $(".btnSendEmail").on("click", function () {
        setTimeout(function () {
            var isMobile = checkListInMobileChange();
            // console.log(isMobile);
            if (!isMobile) {
                $(".txtEmailPopUpToSend").focus();
            }
        }, 400);
    });

    $(".txtPhoneMask").on("keypress", function (event) {
        var string = $(this).val();
        var myString = string.replace(/\D/g, '');
        $(this).val(myString);
    });

    $("div.item_sm_header").on("click", function () {
        $(this).parent().find("div.item_sm").each(function () {
            if ($(this).hasClass("notshow")) {
                $(this).removeClass("notshow");
                $(this).addClass("show");
            }
        });
        $(this).removeClass("show");
        $(this).addClass("notshow");
        var inner = $($($($(this).parent()[0]).parent()[0]).parent()[0]).parent()[0];
        if (inner != undefined) {
            var name = $(this).data("name");
            var price = $(this).data("price");
            var image = $(this).data("image");
            var desc = $(this).data("desc");
            var url = $(this).data("url");

            $(inner).find(".name_dt span").text(name);
            $(inner).find("span.innerPrice").text(price);
            $(inner).find("div.img_box img").attr("src", image);
            $(inner).find("p.txt_dt_2").html(desc);
            $(inner).find("a.btnc").attr("href", url);
        }
    });

    $(".toolAction").each(function () {
        if ($(this).attr("href") === pathname) {
            $(this).addClass("active");
        }
    });
    $(".deaName").html($("#hdDeAName").val());


    if ($("#hdType").length > 0) {
        var t = $("#hdType").val();
        if (t == "dich-vu") {
            $('ul.tabs').tabs('select_tab', 'tab_tv_02');
        }
    }

    $(".dealerBranch").on("click", function () {
        if (!$(this).hasClass("branchActive")) {
            var lat = $(this).data("lat");
            var long = $(this).data("long");
            var name = $(this).data("name");
            var branchId = $(this).data("branchid");
            changeMaps(lat, long, name);
            setSessionBranchId(branchId);
        }
        $(".dealerBranch").removeClass("branchActive");
        $(this).addClass("branchActive");
        setTimeout(function () {
            var count = 0;
            $(".collapsible-header").each(function () {
                count += $(this).hasClass("active") ? 1 : 0;
            });
            if (count == 0) {
                var master = $("#masterBranch");
                if (master != undefined) {
                    var lat2 = $(master).data("lat");
                    var long2 = $(master).data("long");
                    var name2 = $(master).data("name");
                    changeMaps(lat2, long2, name2);
                }
                $('.masterCollapse').click();
            }
        }, 1000);
    });


    // Mobile pop up
    $(".slide_detail_mobile").owlCarousel({
        margin: 20,
        loop: false,
        center: false,
        autoplay: false,
        items: 1,
        dots: true,
        video: true,
        smartSpeed: 1000
    });

    $('.link_pmb').on('click', function () {
        // alert(0);
        var link = '#' + $(this).attr('data-link');
        $('body').find(link).addClass('show');
    });

    $('.pmb_close ').on('click', function () {
        $(this).closest('.popup_mobile').removeClass('show');
    });

    $(".btnopenMessageFromHome").on("click", function () {
        var name = $(this).data("name");
        var isdealer = $(this).data("isdealer");
        var idbranch = $(this).data("idbranch");
        //$(".branchPart").removeAttr("checked");
        var branchId = idbranch == undefined ? getSessionBranchId() : idbranch;

        if (isdealer == true) {
            $("#checkDealerMain").prop('checked', true);
            $("#hdIsDealerSendMessage").val("true");
            setSessionBranchId(0);
        }
        else {
            if (branchId != null && branchId != undefined && branchId > 0) {
                $("#checkBranch" + branchId).prop('checked', true);
                $("#hdIsDealerSendMessage").val(branchId);
            } else {
                $("#checkDealerMain").prop('checked', true);
                $("#hdIsDealerSendMessage").val("true");
            }
        }

        //console.log(CheckIfIsMobile());

        setTimeout(function () {
            var isMobile = CheckIfIsMobile();
            if (isMobile === false) {
                //console('focus desktop');
                $(".popupHomeContact").focus();
            }
        }, 500);
    });

    text_logo_Scale();

    $(".branchPart, .branchProDetail").on("change", function () {
        var id = $(this).data("idbranch") == "0" ? "true" : $(this).data("idbranch");
        $("#hdIsDealerSendMessage").val(id);
        setSessionBranchId(id);
    });

    //add class tool-page vào trang công cụ, để ẩn đi footer
    var toolPage = $('.page_compare,.page_dutoan, .page_testdrive, .page_dangkydichvu, .page_hotrotaichinh');
    toolPage.closest('#wrapper').addClass('tool-page');
    $("a.changelink").each(function () {
        $(this).attr("href", $(this).attr("data-href"));
    });
    $("a.removeLink").each(function () {
        $(this).removeAttr("href");
    });



// =============== 


  $("#tabMain01").on("click", function () {
    $(".tab").find("a").removeClass("active");
    $("#tabMain01").find("a").addClass("active");
    $(".content-tab").css("display", "none");
    $("#tab_cp_01").css("display", "block");
  });
  $(".btn_next_pc, #tabMain02").on("click", function () {
    $(".tab").find("a").removeClass("active");
    $("#tabMain02").find("a").addClass("active");
    $(".content-tab").css("display", "none");
    $("#tab_cp_02").css("display", "block");
  });
});

function text_logo_Scale() {
    var text1 = $(".logo_mb .logo-text").text().replace(/TOYOTA/g, "").trim();

    if (text1.length > 16) {
        $('.logo_mb .logo-text').addClass('small');
    }
}

function setSessionBranchId(branchId) {
    sessionStorage.setItem("branchId", branchId);
}

function getSessionBranchId() {
    return sessionStorage.getItem("branchId");
}

function toyotaDealerLog() {
    return $("#hd__ToyotaDealerProject").val();
}

function openToast() {
    $('.ci-toast').toggleClass('active');
    setTimeout(function () {
        $('.ci-toast').removeClass('active');
    }, 5000);
}
//page to top
function page_scroll2top() {
    $('html,body').animate({
        scrollTop: 0
    }, '1000');
}
//=====================================//
function getCountryCode() {
    $.getJSON("/Content/ajax/phonecode.json", function (data) {
        var str = "";
        $.each(data, function (key, val) {
            str += "<option data-name='" + val.name + "' value='" + val.dial_code + "' data-code='" + val.code + "'>" + val.name + "</option>";
        });
        $("select.countryCode").each(function () {
            $(this).html(str);
        });
    });

    $("select.countryCode").material_select('destroy');
    $("select.countryCode").select2();
}

function pimenu() {
    var width = $(document).width();
    if (width > 1000 && !($('body').hasClass('fixed')) && $(window).scrollTop() >= 50) {
        $('.pin-main-menu').addClass('pinned');
    } else {
        $('.pin-main-menu').removeClass('pinned');
    }
}


$(window).scroll(function () {
    try {
        if ($(window).scrollTop() >= $('.menu-detail').offset().top - 40) {
            $(".menu-detail .target1").addClass("animated fadeInUpDT").delay(500).addClass('pinned');
        } else {
            $(".menu-detail .target1").removeClass("animated fadeInUpDT").removeClass('pinned');
        }

        if ($('.target').hasClass('pinned')) {
            $('#header').slideUp(500);
            $('.menu-detail ul li a img').addClass('smallimg');
        } else {
            $('#header').slideDown(300);
            $('.menu-detail ul li a img').removeClass('smallimg');
        }
    } catch (e) {

    }

});

function closeModal() {
    $('.form-modal .close').on('click', function () {
        $('.modal-fade').removeClass('active');
    });
}

function openModal($linkButton, $frmModal) {
    $linkButton.on('click', function () {
        $frmModal.addClass('active');
        if (CheckIfIsMobile() === false)
        $($frmModal).find("input:text").first().focus();
        var validator = $($frmModal).validate();
        validator.resetForm();
    });
}

//scroll menu detail
function opendrop(open_id, drop_box) {
    open_id.on('click', function () {
        if (drop_box.hasClass('open')) {
            drop_box.fadeOut(0);
            drop_box.removeClass('open');
            $('body').removeClass('fixed');
            $(this).removeClass('active');
        } else {
            $('.box-drop').removeClass('open').fadeOut(0);
            drop_box.fadeIn(0);
            drop_box.addClass('open');
            $('body').addClass('fixed');
            $(this).addClass('active');
        }
        pimenu();
    });
}

/*Search javascript and call angularjs function */
function processBeforeCall() {
    angular.element($("#txtSearch")).scope().processToSearch();
}

function changeUrlWithOutRefreshPage(url, title) {
    window.history.pushState({
        url: url
    }, title, url);
    document.title = title;
}

function getYourPing(pathname) {
    var url = $("#hdApiUrl").val() + '/api/Detail/SetRecord?_SeoUrl=' + pathname + '&idDlr=' + $("#hdIdlr").val();
    var awesomeToyota = toyotaDealerLog();
    $.ajax({
        type: "Get",
        url: url,
        headers: {
            'Authorization': 'X-XSRF-Token ' + awesomeToyota,
            'X-XSRF-Token': awesomeToyota,
            'Content-Type': 'application/json'
        }
    });
}

function setYourPing(date, pathname) {
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 0);
    getYourPing(pathname);
    var object = {
        'timeout': date,
        'list': [pathname]
    };
    localStorage.setItem('ci_dealer_client_array', JSON.stringify(object));
}

function doSomethingWithStorage() {
    var date = new Date();
    var pathname = window.location.pathname.replace("/", "");

    if (!localStorage.getItem('ci_dealer_client_array')) {
        setYourPing(date, pathname);
    } else {
        var data = localStorage.getItem('ci_dealer_client_array');
        var obj = JSON.parse(data);
        var expire = new Date(obj.timeout);
        if (expire <= date) {
            getYourPing(pathname);
            setYourPing(date, pathname);
        } else {
            var result = obj.list.indexOf(pathname);
            if (result < 0) {
                getYourPing(pathname);
                obj.list.push(pathname);
                localStorage.setItem('ci_dealer_client_array', JSON.stringify(obj));
            }
        }
    }
}

// Get ajax value
function GetDataNew(classname) {
    var lstData = "";
    $("." + classname + ":checked").each(function () {
        lstData += $(this).val().toLowerCase() + ",";
    });
    lstData = lstData.replace(/,$/, "");
    return lstData;
};

function GetDataNewRadio(classname) {
    var lstData = "";
    $("." + classname + ":checked").each(function () {
        lstData += $(this).data("price") + ",";
    });
    lstData = lstData.replace(/,$/, "");
    return lstData;
}

function ChangeListProductsTool() {
    var sortNum = $("#selectsort").find(':selected').data("id");
    sortNum = sortNum == undefined ? "" : sortNum;
    var seoUrl = $("#hdSeoUrlTool").val();
    var dealerId = $("#hdIdlr").val();
    var api = $("#hdApiUrl").val();

    var lstCat = GetDataNew("ckCat");
    var lstPrice = GetDataNew("ckPrice");
    var lstSeat = GetDataNew("ckSeat");
    var lstStyle = GetDataNew("ckStyle");
    var lstFuel = GetDataNew("ckFuel");
    var lstMadeIn = GetDataNew("ckMadeIn");
    var awesomeToyota = toyotaDealerLog();
    var link = "?sPage=0&_SeoUrl=" + seoUrl + "&idDlr=" +
    dealerId + "&sPrice=" + lstPrice + "&sCat=" + lstCat + "&sStyle=" + lstStyle + "&sFuel=" + lstFuel + "&iSort=" + sortNum + "&sSeat=" + lstSeat + "&sOrigin=" + lstMadeIn;
    var selectCar = getSelectCar();
    var money = $("#hdMoneyUnit").val();
    $.ajax({
        type: "Get",
        url: api + "/api/Detail/GetListNewsCar" + link,
        headers: {
            'Authorization': 'X-XSRF-Token ' + awesomeToyota,
            'X-XSRF-Token': awesomeToyota,
            'Content-Type': 'application/json'
        },
        success: function (data) {
            var str = "";
            var countList = data.lModels.length;
            $("#ulSlideMobile").fadeOut(200, function () {
                $("#ulSlideMobile").empty();
            });
            if (countList > 0) {
                for (var j = 0; j < countList; j++) {
                    var mon = formatMoney(data.lModels[j].newS_PRICE1 + ".000");
                    var url = data.lModels[j].newS_URL === "" ? data.lModels[j].newS_SEO_URL : data.lModels[j].newS_URL;
                    var check = false;
                    var priceZeroText = "Sẽ cập nhật sau";
                    var priceStr = '';
                    if (data.lModels[j].newS_PRICE1 == 0)
                        priceStr = '<span class="name">' + priceZeroText + '</span>';
                    else
                        priceStr = '<span class="name">' + mon + '</span> <sup>' + money + '</sup>';

                    for (var ce = 0; ce < selectCar.length; ce++) {
                        if (selectCar[ce].idcar == data.lModels[j].id) {
                            check = true;
                            selectCar.splice(ce, 1);
                            break;
                        }
                    }

                    str += '<li class="item">' +
                    '<div class="inner">' +
                    '<div class="sm_checkbox">' +
                    '<input ' + (check ? 'checked' : '') +
                    ' type="checkbox" data-url="' + url +
                    '" data-image="/data/news/' + data.lModels[j].id + '/' + data.lModels[j].newS_IMAGE2 +
                    '" data-catid="' + data.lModels[j].caT_ID +
                    '" data-caturl="' + data.lModels[j].caT_SEO_URL +
                    '" data-name="' + data.lModels[j].newS_TITLE +
                    '" data-price="' + mon +
                    '" data-idCar="' + (data.lModels[j].id) +
                    '" class="checkCarTool" id="checkbox-0' + (data.lModels[j].id) +
                    '">' +
                    '<label for="checkbox-0' + (data.lModels[j].id) + '">' +
                    '<span class="img">' +
                    "<img src='/data/news/" + data.lModels[j].id + "/" + data.lModels[j].newS_IMAGE3 + "'/>" +
                    '</span>' +
                    '<span class="txt">' +
                    '<span class="txt1"><span class="check"></span></span>' +
                    '<span class="txt2">' +
                    '<span class="name">' +
                    data.lModels[j].newS_TITLE +
                    '</span>' +
                    '<span class="price">' +
                    'Giá từ: ' + priceStr +
                    '</span>' +
                    '</span>' +
                    '</span>' +
                    '</label>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
                }

                for (var c = 0; c < selectCar.length; c++) {
                    var priceZeroText = "Sẽ cập nhật sau";
                    var priceStr = '';
                    if (selectCar[c].price == 0)
                        priceStr = '<span class="name">' + priceZeroText + '</span>';
                    else
                        priceStr = '<span class="name">' + selectCar[c].price + '</span> <sup>' + money + '</sup>';

                    str += '<li class="item" style="display: none">' +
                    '<div class="inner">' +
                    '<div class="sm_checkbox">' +
                    '<input checked' +
                    ' type="checkbox" data-url="' + selectCar[c].url +
                    '" data-image="' + selectCar[c].image +
                    '" data-catid="' + selectCar[c].catid +
                    '" data-caturl="' + selectCar[c].caturl +
                    '" data-name="' + selectCar[c].name +
                    '" data-price="' + selectCar[c].price +
                    '" data-idCar="' + (selectCar[c].idcar) +
                    '" class="checkCarTool" id="checkbox-0' + (selectCar[c].idcar) +
                    '">' +
                    '<label for="checkbox-0' + (selectCar[c].idcar) + '">' +
                    '<span class="img">' +
                    "<img src='" + selectCar[c].image + "'/>" +
                    '</span>' +
                    '<span class="txt">' +
                    '<span class="txt1"><span class="check"></span></span>' +
                    '<span class="txt2">' +
                    '<span class="name">' +
                    selectCar[c].name +
                    '</span>' +
                    '<span class="price">' + priceStr +
                    '</span>' +
                    '</span>' +
                    '</span>' +
                    '</label>' +
                    '</div>' +
                    '</div>' +
                    '</li>';


                }
            } else {
                for (var ci = 0; ci < selectCar.length; ci++) {
                    var priceZeroText = "Sẽ cập nhật sau";
                    var priceStr = '';
                    if (selectCar[ci].price == 0)
                        priceStr = '<span class="name">' + priceZeroText + '</span>';
                    else
                        priceStr = '<span class="name">' + selectCar[ci].price + '</span> <sup>' + money + '</sup>';

                    str += '<li class="item" style="display: none">' +
                    '<div class="inner">' +
                    '<div class="sm_checkbox">' +
                    '<input checked' +
                    ' type="checkbox" data-url="' + selectCar[ci].url +
                    '" data-image="' + selectCar[ci].image +
                    '" data-catid="' + selectCar[ci].catid +
                    '" data-caturl="' + selectCar[ci].caturl +
                    '" data-name="' + selectCar[ci].name +
                    '" data-price="' + selectCar[ci].price +
                    '" data-idCar="' + (selectCar[ci].idcar) +
                    '" class="checkCarTool" id="checkbox-0' + (selectCar[ci].idcar) +
                    '">' +
                    '<label for="checkbox-0' + (selectCar[ci].idcar) + '">' +
                    '<span class="img">' +
                    "<img src='" + selectCar[ci].image + "'/>" +
                    '</span>' +
                    '<span class="txt">' +
                    '<span class="txt1"><span class="check"></span></span>' +
                    '<span class="txt2">' +
                    '<span class="name">' +
                    selectCar[ci].name +
                    '</span>' +
                    '<span class="price">' + priceStr +
                    '</span>' +
                    '</span>' +
                    '</span>' +
                    '</label>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
                }
            }

            $("#ulSlideMobile").fadeIn(200, function () {
                $(str).appendTo("#ulSlideMobile");
                if ($(".page_dutoan").length > 0) {
                    checkCarToolEstimate();
                }
                if ($(".page_hotrotaichinh").length > 0) {
                    checkCarToolSupportFinance();
                }
            });
        }
    });
}

function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) {
        num = "0";
    }

    var sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    num = Math.floor(num / 100).toString();

    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    }

    return (((sign) ? '' : '-') + num);
}

function subStringSmarter(str, length, substr) {
    if (str.length > length) {
        str = str.substr(0, length);
        var t = str.replace(/^\s+|\s+$/g, '').lastIndexOf(substr);
        if (t < str.length) {
            str = str.substr(0, t) + "...";
        }
    }
    return str;
}

function getSelectCar() {
    var cars = $(".checkCarTool:checked");
    var lstCar = [];
    for (var t = 0; t < cars.length; t++) {
        var input = cars[t];
        var model = {
            idcar: $(input).data("idcar"),
            url: $(input).data("url"),
            image: $(input).data("image"),
            catid: $(input).data("catid"),
            caturl: $(input).data("caturl"),
            name: $(input).data("name"),
            price: $(input).data("price")
        }
        lstCar.push(model);
    }
    return lstCar;
}
$("#slideHomeContent").owlCarousel({
    margin: 0,
    loop: true,
    center: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    items: 1,
    dots: true,
    lazyLoad: true,
    animateOut: 'fadeOut',
    responsive: {
        0: {
            autoplay: true
        },
        768: {
            autoplay: true
        }
    }
});
hoverAndFunnySlideToyotaCar()

// Owl
//slide nhan vien
//var owl2 = $('.slide-nv');
var owlPro = $('.slide-nv-product');
var owlSer = $('.slide-nv-service');
//owl2.data('owlCarousel').destroy();
owlPro.owlCarousel({
    loop: owlPro.children().length > 1,
    items: 1,
    margin: 15,
    nav: false,
    dots: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    freeDrag: false,
    autoplay: owlPro.children().length > 3,
    // autoplay: false, 
    smartSpeed: 3000,
    animateOut: 'fadeOut'
});

owlSer.owlCarousel({
    loop: owlSer.children().length > 1,
    items: 1,
    margin: 20,
    nav: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    freeDrag: false,
    dots: false,
    autoplay: owlSer.children().length > 3,
    smartSpeed: 3000,
    //animateIn: 'fadeIn',
    // autoplayHoverPause: true,
    animateOut: 'fadeOut' 
});

function hoverAndFunnySlideToyotaCar() {
    var isMobile = 0;
    if (checkListInMobileChange())
    isMobile = 1;
    if (isMobile == 0) {
        var owl = $('.slide-vehicle');
        owl.owlCarousel({
            loop: false, // ,
            items: 4,
            autoplay: false,
            margin: 23,
            nav: true,
            dots: false,
            smartSpeed: 600,
            center: false,
            autoplayHoverPause: true,
            animateOut: 'fadeOut',
            responsive: {
                0: {
                    items: 2,
                    margin: 10,
                    nav: false,
                    smartSpeed: 200,
                },
                568: {
                    items: 3,
                    margin: 20,
                    nav: false,
                    smartSpeed: 200
                },

                768: {
                    items: 2,
                    nav: true,
                    smartSpeed: 500,
                    margin: 20,
                },
                1024: {
                    items: 3,
                    margin: 20,
                    smartSpeed: 500
                },
                1026: {
                    items: 4
                }
            }
        });
    }
    else{
        $(".slide-vehicle").removeClass('owl-carousel').wrapInner('<div class="scroll"></div>');
    }
}

function loadParallaxHome() {
    var dealerId = $("#hdIdlr").val();
    var api = $("#hdApiUrl").val();
    var link = api + "/api/Default/GetListAds?idDlr=" + dealerId + "&pos=1&iPartof=2";
    var awesomeToyota = toyotaDealerLog();
    $.ajax({
        type: "Get",
        url: link,
        headers: {
            'Authorization': 'X-XSRF-Token ' + awesomeToyota,
            'X-XSRF-Token': awesomeToyota,
            'Content-Type': 'application/json'
        },
        success: function (data) {
            if (data.length > 0) {
                var para = data[0];
                if (para != undefined) {
                    switch (para.aD_ITEM_TYPE) {
                        case 0:
                        $("#parallaxContentBanner").attr("src", "/data/aditems/" + para.id + "/" + para.aD_ITEM_FILENAME);
                        $("#parallaxContentBanner").css("display", "block");
                        $("#parallaxContentBanner_Video").html("");
                        $(".parallax-container").css("display", "none");
                        break;
                        case 1:
                        $("#bgvid > source").attr("src", "/data/aditems/" + para.id + "/" + para.aD_ITEM_FILENAME);
                        $("#parallaxContentBanner_Video").css("display", "block");
                        $(".parallax-container").css("display", "block");
                        $("#parallaxContentBanner").html("");
                        $("#parallaxContentBanner").css("display", "none");
                        var video = document.getElementById('bgvid');
                        video.load();
                        video.play();
                        break;
                    }
                }
            }
        }
    });
}

function getButtonBanner(val, index) {
    var serviceRegisterLink = $("#hdServiceRegister").val();
    var testDriveLink = $("#hdTestDriveLink").val();
    var compareLink = $("#hdCompareLink").val();
    var estimateLink = $("#hdEstimateLink").val();
    var priceLink = '/Content/download/bang-gia.pdf';
    var bg = index == 1 ? "bg-white" : "";
    switch (val) {
        case "1":
        return '<div class="btn_wrap">' +
        '<a class="btnc btn-primary ' + bg + '" data-text="So sánh" href="' + compareLink + '"> <span class="btn_overlay"> </span><span class="btn_text">So sánh</span></a>' +
        '</div>';
        case "2":
        return '<div class="btn_wrap">' +
        '<a class="btnc btn-primary ' + bg + '" data-text="Dự toán chi phí" href="' + estimateLink + '"> <span class="btn_overlay"> </span><span class="btn_text">Dự toán chi phí</span></a>' +
        '</div>';
        case "3":
        return '<div class="btn_wrap">' +
        '<a class="btnc btn-primary ' + bg + '" data-text="Đăng ký lái thử" href="' + testDriveLink + '"> <span class="btn_overlay"> </span><span class="btn_text">Đăng ký lái thử</span></a>' +
        '</div>';
        case "4":
        return '<div class="btn_wrap">' +
        '<a class="btnc btn-primary ' + bg + '" data-text="Đặt lịch hẹn dịch vụ" href="' + serviceRegisterLink + '"> <span class="btn_overlay"> </span><span class="btn_text">Đặt lịch hẹn dịch vụ</span></a>' +
        '</div>';
        case "5":
        return '<div class="btn_wrap">' +
        '<a class="btnc btn-primary ' + bg + '" data-text="Tải bảng giá xe" href="' + priceLink + '"> <span class="btn_overlay"> </span><span class="btn_text">Tải bảng giá xe</span></a>' +
        '</div>';
        default:
        break;
    }
    return "";
}

function PrintElem(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkCanGetAPost(code) { // code is storage code
    var retrievedObject = localStorage.getItem(code);
    var myDate = new Date();
    var today = (myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myDate.getFullYear();
    var myDateTime = new Date(today).getTime();
    if (retrievedObject == undefined) {
        var newValue = [{
            'id': myDateTime,
            'value': 1
        }];
        localStorage.setItem(code, JSON.stringify(newValue));
        return true;
    } else {
        var array = JSON.parse(retrievedObject);
        var length = array.length;
        var left = 0;
        var right = length - 1;
        var obj = null;
        var index = -1;
        var result = false;
        while (left <= right) {
            var mid = Math.round((left + right) / 2);
            if (myDateTime == parseInt(array[mid].id)) {
                obj = array[mid];
                index = mid;
                break;
            } else {
                right = myDateTime < array[mid].id ? mid - 1 : right;
                left = myDateTime > array[mid].id ? mid + 1 : left;
            }
        }
        if (obj != null && index > -1) {
            if (obj.value < 3) {
                result = true;
            } else {
                result = false;
            }
            array[index].value += 1;
        } else {
            array.push({
                'id': myDateTime,
                'value': 1
            });
        }
        // reset array in local
        localStorage.setItem(code, JSON.stringify(array));
        return result;
    }
}

function checkListInMobileChange() {
    return CheckIfIsMobile();
}

function msIeChecker() {
    var message = "Chúng tôi chưa hỗ trợ thiết bị của bạn, vui lòng trải nghiệm bằng các trình duyệt tương thích như: Chrome, Firefox,... Xin cảm ơn!";
    if (navigator.userAgent.match(/Windows Phone/i)) {
        alert(message);
    }

    if (navigator.userAgent.match(/iemobile/i)) {
        alert(message);
    }

    // and probably less common, but still useful:
    if (navigator.userAgent.match(/WPDesktop/i)) {
        alert(message);
    }

}

function filterMobileListProduct() {
    var isopen = $('#open_menu_dt').attr("isopen");
    //console.log("isopen: " + isopen);
    if (isopen == 'true') { // must close
        var filter = $('#open_menu_dt').attr("isfilter");
        if (filter == "false") {
            $(".ckDeclareNewTool").removeAttr("isCheckBefore");
            $(".ckDeclareNewTool:checked").each(function () {
                var id = $(this).attr("id");
                $("label[for*='" + id + "']").attr("isCheckBefore", "true");
            });
        }
        $('#open_menu_dt').attr("isopen", "false");
        $('.box1').removeClass('active-mobile');
        $('body').addClass('lockb');
    } else { // not yet, and open it!
        // check in tools
        $(".ckDeclareNewTool").each(function () {
            var id = $(this).attr("id");
            var t = $("label[for*='" + id + "']").attr("isCheckBefore");
            if (t == "true")
            $(this).prop("checked", "true");
        });

        $('#open_menu_dt').attr("isopen", "true");
        $('.box1').addClass('active-mobile');
        $('body').addClass('lockb');
    }
}

function FormatNumber(obj) {
    if (obj == "undefined" || obj == null)
        return 0;
    num = obj.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    num = Math.floor(num / 100).toString();
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num);
}


// =================== Include header - footer
window.onload = function() {
    var elements = document.getElementsByTagName('*'),
        i;
    for (i in elements) {
        if (elements[i].hasAttribute && elements[i].hasAttribute('data-include')) {
            fragment(elements[i], elements[i].getAttribute('data-include'));
        }
    }
    function fragment(el, url) {
        var localTest = /^(?:file):/,
            xmlhttp = new XMLHttpRequest(),
            status = 0;

        xmlhttp.onreadystatechange = function() {
            /* if we are on a local protocol, and we have response text, we'll assume
 *                  things were sucessful */
            if (xmlhttp.readyState == 4) {
                status = xmlhttp.status;
            }
            if (localTest.test(location.href) && xmlhttp.responseText) {
                status = 200;
            }
            if (xmlhttp.readyState == 4 && status == 200) {
                el.outerHTML = xmlhttp.responseText;
            }
        }

        try { 
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        } catch(err) {
            /* todo catch error */
        }
    }
}